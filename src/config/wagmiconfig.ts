import {publicProvider} from 'wagmi/providers/public';
import {getDefaultWallets} from '@rainbow-me/rainbowkit';
import {configureChains, createConfig} from 'wagmi';
import {baseSepolia} from 'wagmi/chains';

export const {chains, publicClient, webSocketPublicClient} = configureChains(
    [baseSepolia],
    [
        publicProvider()
    ]
);

const {connectors} = getDefaultWallets({
    appName: 'BaseSwap',
    projectId: 'e798cef35d6a24a5ddf135ca3b9d57d7',
    chains
});

export const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});