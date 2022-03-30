import { Heading, Wrap, WrapItem, Text, List, ListItem, UnorderedList, Flex } from '@chakra-ui/react';
import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export const getStaticProps: GetStaticProps = async context => {
    const { locale } = context;
    const loc = locale === 'ru' ? 'ru' : 'en';

    return {
        props: {
            ...(await serverSideTranslations(loc, ['nav', 'common'])),
        },
    };
};

const ReleasesPage: NextPage = () => {
    const { t } = useTranslation('common');
    const { locale } = useRouter();
    const text =
        locale === 'ru' ? 'Состоялся выход альфа версии сайта' : 'The alpha version of the site has been released';
    return (
        <Layout>
            <List>
                <ListItem>
                    <Flex justify='space-between' w='100%' align='center'>
                        <Heading mb='4'>0.0.1</Heading>
                        <Text>31.03.2022</Text>
                    </Flex>
                    <UnorderedList>
                        <ListItem>{text}</ListItem>
                    </UnorderedList>
                </ListItem>
            </List>
        </Layout>
    );
};

export default ReleasesPage;
