export enum NetworkName {
  Arbitrum = 'Arbitrum',
  ArbitrumTestnet = 'ArbitrumTestnet',
  SmartChain = 'Binance Smart Chain',
  SmartChainTestnet = 'Binance Smart Chain Testnet',
}

export const networkHexChainIds: Record<NetworkName, string> = {
  [NetworkName.Arbitrum]: '0xa4b1',
  [NetworkName.ArbitrumTestnet]: '0x66eeb', // 421611,
  [NetworkName.SmartChain]: '0x38', // 56,
  [NetworkName.SmartChainTestnet]: '0x61', // 97,
};

export const networkDecimalChainIds: Record<NetworkName, string> = {
  [NetworkName.Arbitrum]: '42161',
  [NetworkName.ArbitrumTestnet]: '421611',
  [NetworkName.SmartChain]: '56',
  [NetworkName.SmartChainTestnet]: '97',
};

type Chain = {
  chainId: string,
  chainIdDecimal: string,
  chainName: string,
  nativeCurrency: {
    name: string,
    symbol: string,
    decimals: number,
  },
  rpcUrls: string[],
  blockExplorerUrls: string[],
};

type Chains = Record<NetworkName, Chain>;

const arbitrumNativeCurrency = {
  name: 'AETH',
  symbol: 'AETH',
  decimals: 18,
};

const smartChainNativeCurrency = {
  name: 'BNB',
  symbol: 'BNB',
  decimals: 18,
};

export const chains: Chains = {
  [NetworkName.Arbitrum]: {
    chainId: networkHexChainIds[NetworkName.Arbitrum],
    chainIdDecimal: networkDecimalChainIds[NetworkName.Arbitrum],
    chainName: NetworkName.Arbitrum,
    nativeCurrency: arbitrumNativeCurrency,
    rpcUrls: ['https://rpc.ankr.com/arbitrum'],
    blockExplorerUrls: ['https://arbiscan.io'],
  },
  [NetworkName.ArbitrumTestnet]: {
    chainId: networkHexChainIds[NetworkName.ArbitrumTestnet],
    chainIdDecimal: networkDecimalChainIds[NetworkName.ArbitrumTestnet],
    chainName: NetworkName.ArbitrumTestnet,
    nativeCurrency: arbitrumNativeCurrency,
    rpcUrls: ['https://rinkeby.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://rinkeby-explorer.arbitrum.io/#/'],
  },
  [NetworkName.SmartChain]: {
    chainId: networkHexChainIds[NetworkName.SmartChain],
    chainIdDecimal: networkDecimalChainIds[NetworkName.SmartChain],
    chainName: NetworkName.SmartChain,
    nativeCurrency: smartChainNativeCurrency,
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com'],
  },
  [NetworkName.SmartChainTestnet]: {
    chainId: networkHexChainIds[NetworkName.SmartChainTestnet],
    chainIdDecimal: networkDecimalChainIds[NetworkName.SmartChainTestnet],
    chainName: NetworkName.SmartChainTestnet,
    nativeCurrency: smartChainNativeCurrency,
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    blockExplorerUrls: ['https://testnet.bscscan.com'],
  },
};
