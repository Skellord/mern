import { Box } from '@chakra-ui/react';
import type { GetStaticProps, NextPage } from 'next';
import Layout from '../components/Layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { News } from '../components/News';

export const getStaticProps: GetStaticProps = async context => {
    const { locale } = context;
    const loc = locale === 'ru' ? 'ru' : 'en';

    return {
        props: {
            ...(await serverSideTranslations(loc, ['nav', 'common'])),
        },
    };
};

const Home: NextPage = () => {
    return (
        <Layout>
            <News />
            <Box></Box>
        </Layout>
    );
};

export default Home;
