import { SimpleGrid, Text, Box } from '@chakra-ui/react';
import { NextPage } from 'next';
import Layout from '../../components/Layout';

const Units: NextPage = () => {
    return (
        <Layout heading='Factions'>
            <SimpleGrid>
                <Box>
                    <Text>Skaven</Text>
                </Box>
            </SimpleGrid>
        </Layout>
    );
};

export default Units;
