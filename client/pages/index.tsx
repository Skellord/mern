import { Heading, VStack, Text, Flex, Box, SimpleGrid, Grid, Center, Button } from '@chakra-ui/react';
import type { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import katarinaSrc from '../public/img/totalwarwarhammer3.jpg';
import { useRouter } from 'next/router';

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
    const { t } = useTranslation('common');
    const { locale } = useRouter();
    return (
        <Layout heading={t('mainPage')}>
            <Grid gridTemplateColumns={'1fr 300px'}>
                <Box>
                    <Heading size='xl' marginBottom='4'>
                        {t('news')}
                    </Heading>

                    <Box w='800px'>
                        <Image src={katarinaSrc} layout={'intrinsic'} />
                    </Box>
                    <Heading size='lg' mb='4'>
                        {locale === 'ru' ? 'Выход альфа версии' : 'Release alpha version'}
                    </Heading>
                    <Link href={'/releases'}>
                        <Button colorScheme={'blue'} bgColor='blue.700' rightIcon={<ArrowForwardIcon />}>
                            {t('toReleases')}
                        </Button>
                    </Link>
                </Box>
                <Box></Box>
            </Grid>
        </Layout>
    );
};

export default Home;
