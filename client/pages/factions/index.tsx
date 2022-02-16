import { SimpleGrid, Box } from '@chakra-ui/react';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { client } from '../../api/api';
import Layout from '../../components/Layout';
import { useFetchWithCache } from '../../hooks/useFetchWithCache';
import { FactionsResponse } from '../../types/api.types';
import { apiRoutes } from '../../utils/api.util';

export const getStaticProps: GetStaticProps = async () => {
    const data = await client.getFactions();
    return {
        props: {
            data,
        },
    };
};

const Units: NextPage<{ data: FactionsResponse }> = props => {
    const { data: initialData } = props;

    const { data, isFirstLoading } = useFetchWithCache<FactionsResponse>(
        [apiRoutes.getFactions],
        () => client.getFactions(),
        { fallbackData: initialData }
    );
    return (
        <Layout heading='Factions'>
            <SimpleGrid>
                {isFirstLoading
                    ? '...loading'
                    : data?.map((item: string) => (
                          <Box key={item}>
                              <Link href={`factions/${item}`}>
                                  <a>{item}</a>
                              </Link>
                          </Box>
                      ))}
            </SimpleGrid>
        </Layout>
    );
};

export default Units;
