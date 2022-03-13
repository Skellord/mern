import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import NextNProgress from 'nextjs-progressbar';
import '../styles/styles.css';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <Head>
                <meta name='viewport' content='width=device-width,initial-scale=1' />
            </Head>
            <NextNProgress options={{ showSpinner: false }} />
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default appWithTranslation(MyApp);
