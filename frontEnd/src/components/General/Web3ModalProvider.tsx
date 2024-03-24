import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { WagmiProvider } from 'wagmi'
import { arbitrum, mainnet, sepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MuiThemeProvider from './MuiThemeProvider'

// 0. Setup queryClient
const queryClient = new QueryClient()

export const etherlink = {
  id: 128123,
  name: 'Etherlink',
  network: 'etherlink',
  nativeCurrency: {
    decimals: 18,
    name: 'Tezos',
    symbol: 'XTZ',
  },
  rpcUrls: {
    public: { http: ['https://etherlink-ghostnet-6lcp5r.zeeve.net/rpc'] },
    default: { http: ['https://etherlink-ghostnet-6lcp5r.zeeve.net/rpc'] },
  },
  blockExplorers: {
    etherscan: { name: 'Blockscout', url: 'https://testnet-explorer.etherlink.com/' },
    default: { name: 'Blockscout', url: 'https://testnet-explorer.etherlink.com/' },
  },
  testnet: true,
  // contracts: {
  //   multicall3: {
  //     address: '0xca11bde05977b3631167028862be2a173976ca11',
  //     blockCreated: 11_907_934,
  //   },
  // },
}

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = import.meta.env.VITE_WEB3_MODAL_PROJECT_ID as string

// 2. Create wagmiConfig
const metadata = {
  name: 'Etherlink',
  description: 'Etherlink is a tezos EVM rollup.',
  url: 'https://etherlink.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

const chains = [mainnet, arbitrum, etherlink, sepolia] as const
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: false, // Optional - defaults to your Cloud configuration
  enableOnramp: false, // Optional - false as default
})

export function Web3ModalProvider ({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
