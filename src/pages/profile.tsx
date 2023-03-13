import {
  ConnectWallet,
  MediaRenderer,
  useActiveListings,
  useAddress,
  useContract,
  useContractWrite,
  useCreateDirectListing,
  Web3Button,
} from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { Network, Alchemy, BigNumber } from "alchemy-sdk";
import { Key, useEffect, useState } from "react";

const contractAddress = "0xf00B258929f1070D7F7405A35c38b01cE3C368C8";

export default function Profile() {
  const address = useAddress();
  console.log("address", address);
  const { contract } = useContract(contractAddress, "marketplace");
  const { data: listing, isLoading } = useActiveListings(contract, {
    seller: address,
  });

  const { mutateAsync: cancelDirectListing, isLoading: isCancelLoading } =
    useContractWrite(contract, "cancelDirectListing");

  const [NFTS, setNfts] = useState<any>([]);
  const [nftprice, setPrice] = useState<string>("0");

  const {
    mutateAsync: createDirectListing,
    isLoading: isCreateLoading,
    error,
  } = useCreateDirectListing(contract);

  useEffect(() => {
    const loadNftsForOwner = async (address: string) => {
      try {
        const settings = {
          apiKey: "CIvIOZTTLp1-bXiU27BwfD9jEOJPfeCm",
          network: Network.MATIC_MUMBAI,
        };
        const alchemy = new Alchemy(settings);
        const nfts = await alchemy.nft.getNftsForOwner(address);
        console.log("nfts", nfts);
        setNfts(nfts.ownedNfts as any);
      } catch (error) {
        console.log(error);
      }
    };
    if (address) {
      loadNftsForOwner(address);
    }
  }, [address]);

  return (
    <div>
      <main>
        <h1>NFTs explore (mumbai) </h1>
        <ConnectWallet />
        <div>
          {!address && <div>No wallet connected</div>}
          {address && <div>My wallet address is {address}</div>}
        </div>
        <div>
          <h1>NFTSs owner</h1>
          <div>
            {NFTS.length == 0 && <p>Loading ...</p>}
            {NFTS &&
              NFTS.map(
                (
                  nft: {
                    rawMetadata: { image: string | null | undefined };
                    contract: { address: any };
                    tokenId: any;
                  },
                  index: Key | null | undefined
                ) => {
                  return (
                    <div key={index}>
                      <MediaRenderer
                        src={nft.rawMetadata.image}
                        width="200px"
                        height="200px"
                      />
                      <div>
                        <input
                          id="price"
                          placeholder="Price"
                          min="0"
                          step="0.0001"
                          type="number"
                          onChange={(e) => {
                            console.log("e", e.target.value);
                            setPrice(e.target.value);
                          }}
                        />
                      </div>
                      <Web3Button
                        contractAddress={contractAddress}
                        action={async (e) => {
                          try {
                            await createDirectListing({
                              assetContractAddress: nft.contract.address,
                              tokenId: nft.tokenId,
                              buyoutPricePerToken: nftprice,
                              quantity: "1",
                              currencyContractAddress: NATIVE_TOKEN_ADDRESS,
                              startTimestamp: new Date(),
                              listingDurationInSeconds: 2000,
                            });
                          } catch (error) {
                            console.log(error);
                          }
                        }}
                      >
                        Create Listing
                      </Web3Button>

                      <button
                        onClick={async () => {
                          console.log("price", nftprice);
                        }}
                      >
                        {isCreateLoading ? "loading .. " : "Create Listing"}
                      </button>
                    </div>
                  );
                }
              )}
          </div>
        </div>
        <div>
          <h1>NFTs Listing owner </h1>
          <div>
            {isLoading && <p>Loading ...</p>}
            {listing &&
              listing.map((nft, index) => {
                function cancelListing(arg0: { id: string; type: any }): any {
                  throw new Error("Function not implemented.");
                }

                return (
                  <div key={index}>
                    <MediaRenderer
                      src={nft.asset.image}
                      width="200px"
                      height="200px"
                    />
                    <p>{nft.asset.name}</p>
                    <p>{nft.asset.description}</p>
                    <p>
                      Price: {nft.buyoutCurrencyValuePerToken.displayValue}{" "}
                      MATIC
                    </p>
                    <button
                      onClick={async () => {
                        try {
                          await cancelDirectListing([`${nft.id}`]);
                        } catch (error) {
                          console.log(error);
                          alert(error);
                        }
                      }}
                    >
                      {isCancelLoading ? "loading .. " : "Cancel Listing"}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    </div>
  );
}
