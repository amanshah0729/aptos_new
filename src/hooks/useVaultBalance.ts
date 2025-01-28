import { useConnection } from '@solana/wallet-adapter-react'
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'

const PROGRAM_ID = "8isGkdCJN84MgyqDSJP3q5zKWu8J66y24v29wkDBrSPT"

export function useVaultBalance() {
  const { connection } = useConnection()

  return useQuery({
    queryKey: ['vault-balance'],
    queryFn: async () => {
      const programId = new PublicKey(PROGRAM_ID)
      const [vaultPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("vault")],
        programId
      )
      
      const balance = await connection.getBalance(vaultPda)
      return balance / LAMPORTS_PER_SOL
    },
    refetchInterval: 5000 // Refresh every 5 seconds
  })
} 