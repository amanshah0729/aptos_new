import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useTransactionToast } from '@/components/ui/ui-layout'

// Make sure this matches your deployed program ID
const PROGRAM_ID = "8isGkdCJN84MgyqDSJP3q5zKWu8J66y24v29wkDBrSPT"

export function useStakingSol() {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const transactionToast = useTransactionToast()

  return useMutation({
    mutationFn: async () => {
      if (!publicKey) throw new Error("Wallet not connected")

      try {
        const programId = new PublicKey(PROGRAM_ID)
        
        // Get the vault PDA (Program Derived Address)
        const [vaultPda] = PublicKey.findProgramAddressSync(
          [Buffer.from("vault")],
          programId
        )

        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: vaultPda,
            lamports: 0.1 * LAMPORTS_PER_SOL,
          })
        )

        const latestBlockhash = await connection.getLatestBlockhash('confirmed')
        transaction.recentBlockhash = latestBlockhash.blockhash
        transaction.feePayer = publicKey

        const signature = await sendTransaction(transaction, connection)
        
        console.log("Transaction sent:", signature)
        
        // Wait for confirmation
        const confirmation = await connection.confirmTransaction({
          signature,
          ...latestBlockhash
        }, 'confirmed')

        if (confirmation.value.err) {
          throw new Error(`Transaction failed: ${confirmation.value.err.toString()}`)
        }

        return signature
      } catch (error: any) {
        console.error("Detailed error:", error)
        throw new Error(error.message || 'Failed to stake SOL')
      }
    },
    onSuccess: (signature) => {
      transactionToast(signature)
      toast.success('Successfully staked 0.1 SOL')
    },
    onError: (error: Error) => {
      console.error("Staking error:", error)
      toast.error(`Failed to stake: ${error.message}`)
    }
  })
} 