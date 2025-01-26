'use client'

import { WalletButton } from '@/components/solana/solana-provider'
import { RiPokerSpadesFill } from 'react-icons/ri'
import Link from 'next/link'

export default function NavHeader() {
  return (
    <div className="max-w-[2000px] w-full mx-auto">
      <div className="flex justify-between items-center p-4">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <RiPokerSpadesFill className="text-3xl" />
          <h1 className="text-2xl font-bold">Fuck The House!</h1>
        </Link>
        <WalletButton />
      </div>
    </div>
  )
} 