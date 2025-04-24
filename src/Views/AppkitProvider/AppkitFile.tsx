// import { createAppKit } from '@reown/appkit/react'

// import { WagmiProvider } from 'wagmi'
// import { arbitrum, mainnet, holesky } from '@reown/appkit/networks'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// // 0. Setup queryClient
// const queryClient = new QueryClient()

// // 1. Get projectId from https://cloud.reown.com
// const projectId = '8dee16f61a63afc2345a8cabc6ebc2ed'

// // 2. Create a metadata object - optional
// const metadata = {
//   name: 'travel-booking',
//   description: 'AppKit Example',
//   url: 'http://localhost:5173/', // origin must match your domain & subdomain
//   icons: ['https://avatars.githubusercontent.com/u/179229932']
// }

// // 3. Set the networks
// const networks = [mainnet, arbitrum, holesky]

// // 4. Create Wagmi Adapter
// const wagmiAdapter = new WagmiAdapter({
//   networks,
//   projectId,
//   ssr: true
// })

// // 5. Create modal
// createAppKit({
//   adapters: [wagmiAdapter],
//   networks, 
//   projectId,
//   metadata,
//   features: {
//     analytics: true 
//   }
// })

// export function AppKitProvider({ children }) {  
//   return (
//     <WagmiProvider config={wagmiAdapter.wagmiConfig}>
//       <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//     </WagmiProvider>
//   )
// }





import { createAppKit } from '@reown/appkit/react';
import { WagmiProvider } from 'wagmi';
import { arbitrum, mainnet, holesky } from '@reown/appkit/networks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import React from 'react';

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId
const projectId = '8dee16f61a63afc2345a8cabc6ebc2ed';

// 2. Create metadata
const metadata = {
  name: 'travel-booking',
  description: 'AppKit Example',
  url: 'http://localhost:5173/',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

// 3. Set the networks with any type
const networks: any = [mainnet, arbitrum, holesky];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true,
  },
});

// 6. AppKitProvider component
interface AppKitProviderProps {
  children: React.ReactNode;
}

export function AppKitProvider({ children }: AppKitProviderProps) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}