import { createAppKit } from '@reown/appkit/react'

import { WagmiProvider } from 'wagmi'
import { AppKitNetwork, arbitrum, mainnet, sepolia } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.reown.com
const projectId = 'b56e18d47c72ab683b10814fe9495694'

// 2. Create a metadata object - optional
const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'http://localhost:5173', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// 3. Set the networks
export const networks = [mainnet, arbitrum, sepolia] as [AppKitNetwork, ...AppKitNetwork[]]

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
})

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

export function AppKitProvider({ children }: any) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}