import { Flex, Divider, Heading, Spinner, Box, Text } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { BASE_URL, client } from '../../api/api';
import { ErrorAlert } from '../../components/ErrorAlert';
import Layout from '../../components/Layout';
import { useFetchWithCache } from '../../hooks/useFetchWithCache';
import { UnitResponse } from '../../types/api.types';
import { apiRoutes } from '../../utils/api.util';
import { UnitCard } from '../../components/UnitCard';
import { HistoricalDescription } from '../../../types/unitDesc.types';
import { UnitWithStats } from '../../../types/units.types';

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
    const histDesc = await client.getHistoricalDesc({
        key: `unit_description_historical_texts_text_${data.stats.historical_description_text}`,
    });
    return {
        props: {
            data,
            histDesc,
        },
    };
};

interface UnitPage {
    data: UnitWithStats;
    histDesc: HistoricalDescription;
}

const UnitPage: NextPage<UnitPage> = props => {
    const { data: initialData, histDesc } = props;
    const {
        query: { id },
    } = useRouter();

    const { data, isFirstLoading } = useFetchWithCache<UnitWithStats>(
        [apiRoutes.getUnit, id, '/stats'],
        (_: any, _id: any) => client.getUnitStats({ id: _id }),
        {
            fallbackData: initialData,
        }
    );

    const descKey = `unit_description_historical_texts_text_${data?.stats.historical_description_text}`;

    const { data: histDescData } = useFetchWithCache<HistoricalDescription>(
        [apiRoutes.getHistoricalDesc, descKey],
        (_: any, descKey: any) => client.getHistoricalDesc({ key: descKey }),
        {
            fallbackData: histDesc,
        }
    );

    if (!data) return <ErrorAlert />;
    if (isFirstLoading) return <Spinner />;

    return (
        <Layout>
            <Heading as='h1' marginBottom='6'>
                {data.unit}
            </Heading>
            <Flex w='100%' h='100%'>
                <Box flexShrink='0' mr='2'>
                    <UnitCard unitStats={data} />
                </Box>

                <Divider orientation='vertical' borderColor='crimson.400' h='calc(100% - 100px)' />

                <Box as='section' p='4'>
                    <Heading fontSize='2xl' mb='4'>
                        Description
                    </Heading>
                    <Text fontStyle='italic' p='1'>
                        {histDescData?.text}
                    </Text>
                </Box>
            </Flex>
        </Layout>
    );
};

export default UnitPage;
