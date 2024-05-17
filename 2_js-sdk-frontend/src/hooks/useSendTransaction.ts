import {useState} from "react";
import {SendTransactionRequest, UserRejectsError} from "@tonconnect/sdk";
import {connector} from "../connector";
import {createStandaloneToast} from "@chakra-ui/react";

export function useSendTransaction() {
    const [confirmationOnProgress, setConfirmationOnProgress] = useState(false);

    async function sendTransaction() {
        setConfirmationOnProgress(true);
        const tx: SendTransactionRequest = {
            validUntil: Math.round(Date.now() / 1000) + 600,
            messages: [
                {
                    address: '0:e47a9c2da05fbc011a8642a2caf5a7f4370acd884c877bd01f38887ed030f5ad',
                    amount: '1000000'
                }
            ]
        };

        const { toast } = createStandaloneToast();

        try {
            await connector.sendTransaction(tx);

            toast({
                status: 'success',
                title: 'Transaction sent successfully'
            });
        } catch (e) {
            if (e instanceof UserRejectsError) {
                return toast({
                    status: 'error',
                    title: 'You rejected the transaction'
                });
            }

            toast({
                status: 'error',
                title: 'Unknown error'
            });

            console.error(e);
        } finally {
            setConfirmationOnProgress(false);
        }
    }

    return [sendTransaction, confirmationOnProgress] as const;
}