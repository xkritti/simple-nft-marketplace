import { ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";

export function Navbar() {
  return (
    <div className="flex flex-row justify-between px-14 items-center p-2">
      <Link href="/" className="hover:text-blue-500">
        RugU MARKET
      </Link>
      <div className=" gap-5 flex flex-row items-center ">
        <Link href="/profile" className="hover:text-blue-500">
          {" "}
          My NFTs{" "}
        </Link>
        <ConnectWallet
          accentColor="#fff"
          colorMode="dark"
          btnTitle="Connect Wallet"
        />
      </div>
    </div>
  );
}
