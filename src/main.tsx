import { createAppKit } from '@reown/appkit'
import { SolanaAdapter } from '@reown/appkit-adapter-solana'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'

import { solana, solanaTestnet, solanaDevnet } from '@reown/appkit/networks';
import { mainnet, arbitrum, sepolia } from "@reown/appkit/networks";

import {
  SolflareWalletAdapter,
  PhantomWalletAdapter,
} from "@solana/wallet-adapter-wallets";

const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet, arbitrum, sepolia, solana, solanaTestnet, solanaDevnet]

// 0. Create the Ethers adapter
export const ethersAdapter = new EthersAdapter()

// 1. Create Solana adapter
const solanaWeb3JsAdapter = new SolanaAdapter({
wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()]
})

// 2. Get projectId from https://cloud.reown.com
const projectId = '354b80f814d44c5ef4989ff6aea5661a'

// 3. Set up the metadata - Optional
const metadata = {
name: 'AppKit',
description: 'AppKit Example',
url: 'https://example.com', // origin must match your domain & subdomain
icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// 4. Create the AppKit instance
const modal = createAppKit({
adapters: [ethersAdapter, solanaWeb3JsAdapter],
networks,
metadata,
projectId,
features: {
analytics: true,
}
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);







// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';


// import { createAppKit } from "@reown/appkit/react";
// import { EthersAdapter } from "@reown/appkit-adapter-ethers";
// import { arbitrum, mainnet } from "@reown/appkit/networks";
// const projectId = '354b80f814d44c5ef4989ff6aea5661a';
// const networks:any = [arbitrum, mainnet];
// const metadata = {
//   name: "travel-booking",
//   description: "My Decentralized Application",
//   url: 'https://localhost.com/appkit',
//   icons: ['https://assets.reown.com/reown-profile-pic.png']

// };

// createAppKit({
//   adapters: [new EthersAdapter()],
//   networks, 
//   metadata,
//   projectId,
//   features: {
//     analytics: true,
//   },
// });

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );




// import { createAppKit } from "@reown/appkit/react";
// import { EthersAdapter } from "@reown/appkit-adapter-ethers";
// import { arbitrum, mainnet } from "@reown/appkit/networks";

// const projectId = '1220b287cca753358313ff71c07b4d95';
// const networks:any = [arbitrum, mainnet];
// const metadata = {
//   name: "My Wallet",
//   description: "My Decentralized Application",
//   url: 'https://reown.com/appkit',
//   icons: ['https://assets.reown.com/reown-profile-pic.png']

// };

// createAppKit({
//   adapters: [new EthersAdapter()],
//   networks,
//   metadata,
//   projectId,
//   features: {
//     analytics: true,
//   },
// });


 
 
 
 
 
