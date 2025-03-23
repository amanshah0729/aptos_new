import { useWallet } from "@aptos-labs/wallet-adapter-react";

export function WalletDetails() {
  const { wallet } = useWallet();
  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-lg font-medium">Wallet Details</h4>
      <div className="grid grid-cols-2 gap-4">
        <div>Icon</div>
        <div>
          {wallet?.icon ? (
            <img src={wallet.icon} alt={wallet.name} width={24} height={24} />
          ) : (
            "Not Present"
          )}
        </div>
        
        <div>Name</div>
        <div>{wallet?.name ?? "Not Present"}</div>
        
        <div>URL</div>
        <div>
          {wallet?.url ? (
            <a href={wallet.url} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-300">
              {wallet.url}
            </a>
          ) : (
            "Not Present"
          )}
        </div>
      </div>
    </div>
  );
} 