import Head from 'next/head';
import { FC } from 'react';

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
            <main>{children}</main>
        </>
    );
};

export default Layout;
