import { SimpleGrid, Text, Box, Alert, Spinner } from '@chakra-ui/react';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useRequest } from '../../hooks/useRequest';

const factionRoute = '/units/factions';

const Units: NextPage = () => {
    const { data, error } = useRequest(factionRoute);
    if (error) return <Alert>Load error</Alert>;
    if (!error && !data) return <Spinner />;
    return (
        <Layout heading='Factions'>
            <SimpleGrid>
                {data.map((item: string) => (
                    <Box key={item}>
                        <Link href={`${factionRoute}/${item}`}>
                            <a>{item}</a>
                        </Link>
                    </Box>
                ))}
            </SimpleGrid>
        </Layout>
    );
};

// export const getStaticProps: GetStaticProps = async () => {
//     const { data } = useRequest(fa)

// }

export default Units;
