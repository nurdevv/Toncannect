import {Wallet} from "@tonconnect/sdk";
import {useEffect, useState} from "react";
import {connector} from "../connector.ts";

export function useWallet():Wallet | null {
    const [wallet, setWalllet] = useState<Wallet | null>(null);
    useEffect(() => connector.onStatusChange(setWalllet), [])

    return wallet;
}