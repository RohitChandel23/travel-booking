// import { createAppKit } from '@reown/appkit'

// import { WagmiProvider } from 'wagmi'
// import { AppKitNetwork, arbitrum, mainnet, sepolia } from '@reown/appkit/networks'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// // 0. Setup queryClient
// const queryClient = new QueryClient()

// // 1. Get projectId from https://cloud.reown.com
// const projectId = 'b56e18d47c72ab683b10814fe9495694'

// // 2. Create a metadata object - optional
// const metadata = {
//   name: 'AppKit',
//   description: 'AppKit Example',
//   url: 'http://localhost:5173', // origin must match your domain & subdomain
//   icons: ['https://avatars.githubusercontent.com/u/179229932']
// }

// // 3. Set the networks
// export const networks = [mainnet, arbitrum, sepolia] as [AppKitNetwork, ...AppKitNetwork[]]

// // 4. Create Wagmi Adapter
// const wagmiAdapter = new WagmiAdapter({
//   networks,
//   projectId,
// })

// // 5. Create modal
// createAppKit({
//   adapters: [wagmiAdapter],
//   networks,
//   projectId,
//   metadata,
//   features: {
//     analytics: true // Optional - defaults to your Cloud configuration
//   }
// })

// export function AppKitProvider({ children }: any) {
//   return (
//     <WagmiProvider config={wagmiAdapter.wagmiConfig}>
//       <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//     </WagmiProvider>
//   )
// }


import React from 'react';
import { createAppKit } from '@reown/appkit/react';
import { WagmiProvider } from 'wagmi';
import { mainnet, arbitrum } from 'wagmi/chains'; // Use wagmi/chains
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

const queryClient = new QueryClient();

const projectId = 'ab379f7c30b36d8228738304fb6348c1';

const metadata = {
  name: 'travel-booking',
  description: 'AppKit Example',
  url: 'http://localhost:5173/',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

const networks = [mainnet, arbitrum];

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true,
  },
});

export function AppKitProvider({ children }: React.PropsWithChildren) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}