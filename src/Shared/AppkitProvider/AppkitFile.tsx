import { createAppKit } from '@reown/appkit/react';
import { WagmiProvider } from 'wagmi';
import { holesky, mainnet } from '@reown/appkit/networks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import React from 'react';


const queryClient = new QueryClient();


const projectId = '8dee16f61a63afc2345a8cabc6ebc2ed';

const metadata = {
  name: 'travel-booking',
  description: 'AppKit Example',
  url: 'http://localhost:5173/',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

const networks: any = [holesky, mainnet];

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