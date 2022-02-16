import { Box } from '@chakra-ui/react';
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { client } from '../../api/api';
import Layout from '../../components/Layout';
import { useFetchWithCache } from '../../hooks/useFetchWithCache';
import { UnitResponse } from '../../types/api.types';
import { apiRoutes } from '../../utils/api.util';

// export const getStaticPaths: GetStaticPaths = async () => {
//     const units = await client.getUnits();

//     const paths = units.map(unit => ({
//         params: {
//             id: unit._id,
//         },
//     }));

//     return { paths, fallback: false };
// };

// export const getStaticProps: GetStaticProps = async context => {
//     const { params } = context;
//     const { id } = params as {id: string};
//     const data = await client.getUnit({
//         id,
//     });
//     return {
//         props: {
//             data,
//         },
//     };
// };

export const getServerSideProps: GetServerSideProps = async context => {
    const { params } = context;
    const { id } = params as { id: string };
    const data = await client.getUnit({
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
    console.log(id, 'foo');
    const { data, isFirstLoading } = useFetchWithCache<UnitResponse>(
        [apiRoutes.getUnit, id],
        (_: any, _id: any) => client.getUnit({ id: _id }),
        {
            fallbackData: initialData,
        }
    );

    return (
        <Layout heading={data?.unit}>
            <Box>sd</Box>
        </Layout>
    );
};

export default UnitPage;
