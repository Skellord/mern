import Head from 'next/head';
import { FC } from 'react';
import { Container, Box, Heading, Divider } from '@chakra-ui/react';
import Nav from './Nav';
import Header from './Header';

interface Layout {
    title?: string;
    heading?: string;
}

const Layout: FC<Layout> = ({ title = 'TWW Datebase', heading = 'Page', children }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Box h='calc(100vh - 56px)'>
                <Header />
                <Box
                    as='main'
                    h='100%'
                    bgImage="url('./img/tww3-background.jpg')"
                    bgRepeat='no-repeat'
                    bgPosition='center'
                    bgSize='cover'
                >
                    <Nav />
                    <Container maxW='container.xl' bgColor='gray.900' py='4'>
                        <Heading as='h1' size='2xl' marginBottom='6'>
                            {heading}
                        </Heading>
                        <Divider marginBottom='4' />
                        {children}
                    </Container>
                </Box>
            </Box>
        </>
    );
};

export default Layout;
