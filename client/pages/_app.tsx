import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <NextNProgress options={{ showSpinner: false }} />
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
