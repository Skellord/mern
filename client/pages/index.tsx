import { Heading, VStack, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Layout from '../components/Layout';

const Home: NextPage = () => {
    return (
        <Layout heading='Main page'>
            <Heading size='md' marginBottom='4'>
                Release notes
            </Heading>
            <VStack align='flex-start'>
                <Text> - Add base layout</Text>
            </VStack>
        </Layout>
    );
};

export default Home;
