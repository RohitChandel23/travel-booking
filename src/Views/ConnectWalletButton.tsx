import { useAppKit } from "@reown/appkit/react";

export default function ConnectWalletButton() {
  const { open } = useAppKit();

  return (
    <>
      <button onClick={() => open()}>
        Connect Wallet
      </button>
      <button onClick={() => open({ view: "Networks" })}>
        Choose Network
      </button>
    </>
  );
}

// // import React, { useState } from "react";
// // import { ethers } from "ethers";
// // import { useAppKit } from "@reown/appkit/react";

// // export default function ConnectWalletSepolia() {
// //   const { open, getAccount, getNetwork } = useAppKit();
// //   const [account, setAccount] = useState(null);
// //   const [network, setNetwork] = useState(null);
// //   const [balance, setBalance] = useState(null);

// //   // ⚙️ Add Sepolia to MetaMask
// //   const switchToSepolia = async () => {
// //     try {
// //       if (window.ethereum) {
// //         await window.ethereum.request({
// //           method: "wallet_addEthereumChain",
// //           params: [
// //             {
// //               chainId: "0x5", // Sepolia
// //               chainName: "Sepolia",
// //               rpcUrls: ["https://rpc2.sepolia.org"], // Public Sepolia RPC
// //               nativeCurrency: {
// //                 name: "Sepolia ETH",
// //                 symbol: "ETH",
// //                 decimals: 18,
// //               },
// //               blockExplorerUrls: ["https://sepolia.etherscan.io"],
// //             },
// //           ],
// //         });
// //         alert("✅ Switched to Sepolia!");
// //       }
// //     } catch (error) {
// //       console.error("Failed to switch to Sepolia:", error);
// //       alert("❌ Could not switch network. Check MetaMask.");
// //     }
// //   };

// //   // 🔌 Connect wallet & fetch info
// //   const handleConnect = async () => {
// //     try {
// //       const acc = await getAccount();
// //       const net = await getNetwork();
// //       setAccount(acc);
// //       setNetwork(net);

// //       // Read balance from MetaMask-connected provider
// //       const provider = new ethers.providers.Web3Provider(window.ethereum);
// //       const balanceWei = await provider.getBalance(acc);
// //       const balanceEth = ethers.utils.formatEther(balanceWei);
// //       setBalance(balanceEth);
// //     } catch (err) {
// //       console.error("Error:", err);
// //     }
// //   };

// //   return (
// //     <div style={{ padding: "1rem", fontFamily: "Arial" }}>
// //       <h2>💼 Web3 Wallet + Sepolia Demo</h2>

// //       <button onClick={() => open()}>🔌 Connect Wallet</button>
// //       <button onClick={() => open({ view: "Networks" })}>🌐 Choose Network</button>
// //       <button onClick={switchToSepolia}>🔁 Switch to Sepolia</button>
// //       <button onClick={handleConnect}>🔍 Show Wallet Info</button>

// //       <div style={{ marginTop: "1rem" }}>
// //         {account && (
// //           <p>
// //             <strong>Wallet:</strong>{" "}
// //             {account.slice(0, 6)}...{account.slice(-4)}
// //           </p>
// //         )}
// //         {network && (
// //           <p>
// //             <strong>Network:</strong> {network.name} (Chain ID: {network.id})
// //           </p>
// //         )}
// //         {balance !== null && (
// //           <p>
// //             <strong>Balance:</strong> {balance} ETH
// //           </p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
