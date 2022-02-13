import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import { SWRConfig } from 'swr';

//@ts-ignore
const fetcher = (...args) => fetch(...args).then(res => res.json());

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SWRConfig
            value={{
                fetcher,
            }}
        >
            <ChakraProvider theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </SWRConfig>
    );
}

export default MyApp;
