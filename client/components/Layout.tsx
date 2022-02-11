import Head from 'next/head';
import Image from 'next/image';
import { FC } from 'react';
import { Container, Box } from '@chakra-ui/react';
import Nav from './Nav';
import Header from './Header';

interface Layout {
    title?: string;
}

const Layout: FC<Layout> = ({ title = 'TWW Datebase', children }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name='description' content='TWW Datebase' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main>
                <Header />
                <Box
                    h={'100%'}
                    bgImage="url('./img/tww3-background.jpg')"
                    bgRepeat={'no-repeat'}
                    bgPosition={'center'}
                    bgSize={'cover'}
                >
                    {/* <Image src='../public/img/tww3-background.jpg'/> */}
                    <Container maxW={'1328px'} h={'100%'} bgColor={'blue.900'}>
                        <Nav />
                        {children}
                    </Container>
                </Box>
            </main>
        </>
    );
};

export default Layout;
