import { Box, Flex, Heading, Progress, Spinner, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BASE_URL, client } from '../../api/api';
import { ErrorAlert } from '../../components/ErrorAlert';
import Layout from '../../components/Layout';
import { useFetchWithCache } from '../../hooks/useFetchWithCache';
import { UnitResponse } from '../../types/api.types';
import { apiRoutes } from '../../utils/api.util';
import { UnitCard } from '../../components/UnitCard';

export const getStaticPaths: GetStaticPaths = async () => {
    const units = await client.getUnits();

    const paths = units.map(unit => ({
        params: {
            id: unit._id,
        },
    }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async context => {
    const { params } = context;
    const { id } = params as { id: string };
    const data = await client.getUnitStats({
        id,
    });
    return {
        props: {
            data,
        },
    };
};

const UnitPage: NextPage<{ data: UnitResponse }> = props => {
    const { data: initialData } = props;
    const {
        query: { id },
    } = useRouter();

    const { data, isFirstLoading } = useFetchWithCache<UnitResponse>(
        [apiRoutes.getUnit, id, '/stats'],
        (_: any, _id: any) => client.getUnitStats({ id: _id }),
        {
            fallbackData: initialData,
        }
    );

    if (!data) return <ErrorAlert />;
    if (isFirstLoading) return <Spinner />;

    const unitStats = data[0];

    const imgSrc = `${BASE_URL}/units/${unitStats.unit}.png`;
    console.log(data);

    return (
        <Layout>
            <Heading as='h1' marginBottom='6'>
                {unitStats.unit}
            </Heading>
            <UnitCard unitStats={unitStats} />
        </Layout>
    );
};

export default UnitPage;
