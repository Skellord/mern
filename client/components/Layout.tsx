import Head from 'next/head';
import { FC } from 'react';
import { Container, Box, Heading, Divider } from '@chakra-ui/react';
import Nav from './Nav';
import Header from './Header';

interface Layout {
    title?: string;
    heading?: string | string[];
}

const Layout: FC<Layout> = ({ title = 'TWW Datebase', heading, children }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Header />
            <Box as='main'>
                <Nav />
                <Container maxW='container.xl' bgColor='gray.900' py='4'>
                    {heading && (
                        <>
                            <Heading as='h1' size='2xl' marginBottom='6'>
                                {heading}
                            </Heading>
                            <Divider marginBottom='4' />
                        </>
                    )}

                    {children}
                </Container>
            </Box>
        </>
    );
};

export default Layout;
