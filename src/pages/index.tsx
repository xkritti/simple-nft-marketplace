import {
  ConnectWallet,
  MediaRenderer,
  useActiveListings,
  useContract,
} from "@thirdweb-dev/react";
import { BigNumber } from "ethers";

export default function Home() {
  const { contract } = useContract(
    "0xf00B258929f1070D7F7405A35c38b01cE3C368C8",
    "marketplace"
  );

  const { data: nfts, isLoading } = useActiveListings(contract);

  return (
    <div>
      <main>
        <h1>NFTs Marketplace (mumbai) </h1>
        <ConnectWallet />
        {!isLoading ? (
          <div>
            {nfts &&
              nfts.map((nft, index) => {
                console.log("nft", nft);
                return (
                  <div key={index}>
                    <MediaRenderer
                      src={nft.asset.image}
                      width={"200px"}
                      height={"200px"}
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
                          await contract?.buyoutListing(
                            BigNumber.from(nft.id),
                            1
                          );
                        } catch (error) {
                          console.log(error);
                          alert(error);
                        }
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                );
              })}
          </div>
        ) : (
          <div>Loading ... </div>
        )}
      </main>
    </div>
  );
}
