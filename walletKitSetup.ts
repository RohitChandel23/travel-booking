
import { Core } from '@walletconnect/core'
import { WalletKit } from '@reown/walletkit'

const core = new Core({
  projectId: '354b80f814d44c5ef4989ff6aea5661a'
})

const metadata = {
  name: 'travel-booking',
  description: 'AppKit Example',
  url:'http://localhost:5173',
//   url: 'https://reown.com/appkit', // origin must match your domain & subdomain
  icons: ['https://assets.reown.com/reown-profile-pic.png']
}

const walletKit = await WalletKit.init({
  core, // <- pass the shared 'core' instance
  metadata
})