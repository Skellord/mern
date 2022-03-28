import { Heading, VStack, Text, Flex, Box, SimpleGrid, Grid, Center, Button } from '@chakra-ui/react';
import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import katarinaSrc from '../public/img/totalwarwarhammer3.jpg';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

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
        <Layout>
            <Box>
                <Box
                    mx='-4'
                    mt='-4'
                    pos='relative'
                    boxShadow='inset -2px 0px 19px 2px #000000'
                    _before={{
                        content: '""',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        right: '0',
                        bottom: '0',
                        zIndex: '1',
                        boxShadow: 'inset -2px 0px 40px 10px #000000',
                    }}
                >
                    <Image src={katarinaSrc} layout={'intrinsic'} alt='katarina' />
                    <Box pos='absolute' top='50%' left='20' transform='translateY(-50%)' zIndex='docked'>
                        <Heading size='lg' mb='4' textTransform='uppercase'>
                            {locale === 'ru' ? 'Выход альфа версии' : 'Release alpha version'}
                        </Heading>
                        <Link href={'/releases'} passHref>
                            <Button
                                p='5'
                                variant='outline'
                                rightIcon={<ArrowForwardIcon />}
                                borderRadius='none'
                                borderWidth='2px'
                                textTransform='uppercase'
                                _hover={{
                                    color: 'blue.800',
                                    background: 'gray.300',
                                    borderColor: 'blue.800',
                                }}
                            >
                                {t('toReleases')}
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Box>
            <Box></Box>
        </Layout>
    );
};

export default Home;
