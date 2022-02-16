import { Box, Heading, HStack } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { BASE_URL, client } from '../../api/api';
import Layout from '../../components/Layout';
import { UnitCardMini } from '../../components/UnitCardMini';
import { useFetchWithCache } from '../../hooks/useFetchWithCache';
import { FactionsUnitsResponse } from '../../types/api.types';
import { Unit } from '../../types/units.types';
import { apiRoutes } from '../../utils/api.util';

type UnitsGroup = Pick<Unit, 'unit' | '_id'>;

interface Props {
    units: UnitsGroup[];
    title: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
    const factions = await client.getFactions();

    const paths = factions.map((item: string) => ({
        params: { faction: item },
    }));
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async context => {
    const { params } = context;
    const { faction } = params as { faction: string };
    const data = await client.getFaсtionUnits({
        faction,
    });
    return {
        props: {
            data,
        },
    };
};

const UnitsGroup: FC<Props> = ({ units, title }) => {
    return (
        <Box as='section' marginBottom='6'>
            <Heading marginBottom='4'>{title}</Heading>
            <HStack>
                {units?.map(item => {
                    const newName = item.unit.split('_');
                    const name =
                        newName[newName.length - 1] === '0'
                            ? newName.slice(4, newName.length - 1).join(' ')
                            : newName.slice(4, newName.length).join(' ');
                    const imgSrc = `${BASE_URL}/units/${item.unit}.png`;
                    return <UnitCardMini key={item.unit} name={name} imgSrc={imgSrc} href={item._id} />;
                })}
            </HStack>
        </Box>
    );
};

const FactionPage: NextPage<{ data: FactionsUnitsResponse }> = props => {
    const { data: initialData } = props;
    const {
        query: { faction },
    } = useRouter();

    const { data, isFirstLoading } = useFetchWithCache<FactionsUnitsResponse>(
        [apiRoutes.getFactionUnits, faction],
        (_: any, faction: any) => client.getFaсtionUnits({ faction }),
        {
            fallbackData: initialData,
        }
    );

    const groups = data?.map(item => item.caste);
    const newGrops = ['lord', 'hero'].concat(
        [...new Set(groups)].sort((a, b) => a.localeCompare(b)).filter(item => item !== 'hero' && item !== 'lord')
    );

    return (
        <Layout heading={faction}>
            {data &&
                newGrops?.map(item => {
                    const newUnits: UnitsGroup[] = data
                        .filter(unit => unit.caste === item)
                        .map(unit => {
                            return { unit: unit.unit, _id: unit._id };
                        });
                    return <UnitsGroup key={item} title={item} units={newUnits} />;
                })}
        </Layout>
    );
};

export default FactionPage;
