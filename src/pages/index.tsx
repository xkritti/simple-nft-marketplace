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
      <main className="h-screen bg-white flex flex-col items-center">
        <p className=" text-black text-xl my-10">NFTs Marketplace (mumbai) </p>
        {!isLoading ? (
          <div className="flex justify-center items-center ">
            {nfts &&
              nfts.map((nft, index) => {
                console.log("nft", nft);
                return (
                  <div
                    className=" flex rounded-md shadow-lg bg-slate-200 items-center justify-center flex-col text-black w-52 h-fit p-4 m-4"
                    key={index}
                  >
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
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
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
