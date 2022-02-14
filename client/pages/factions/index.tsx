import { SimpleGrid, Text, Box, Alert, Spinner } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FC } from 'react';
import useSWR, { SWRConfig } from 'swr';
import { ErrorAlert } from '../../components/ErrorAlert';
import Layout from '../../components/Layout';
import { apiRoutes, baseUrl, fetcher } from '../../utils/api.util';

const url = baseUrl + apiRoutes.factions;

export const getServerSideProps: GetServerSideProps = async () => {
    const data = await fetcher(url);
    return {
        props: {
            fallback: {
                [url]: data,
            },
        },
    };
};

const Units: FC = () => {
    const { data, error } = useSWR(url);
    if (error) return <ErrorAlert />;
    if (!error && !data) return <Spinner />;
    return (
        <>
            {data.map((item: string) => (
                <Box key={item}>
                    <Link href={`factions/${item}`}>
                        <a>{item}</a>
                    </Link>
                </Box>
            ))}
        </>
    );
};

export default function UnitsPage({ fallback }: any) {
    return (
        <SWRConfig value={{ fallback }}>
            <Layout heading='Factions'>
                <SimpleGrid>
                    <Units />
                </SimpleGrid>
            </Layout>
        </SWRConfig>
    );
}
