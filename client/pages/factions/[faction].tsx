import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { client } from '../../api/api';
import Layout from '../../components/Layout';
import { UnitsGroup } from '../../components/UnitsGroup';
import { useFetchWithCache } from '../../hooks/useFetchWithCache';
import { FactionsUnitsResponse } from '../../types/api.types';
import { apiRoutes } from '../../utils/api.util';

export const getStaticPaths: GetStaticPaths = async () => {
    const factions = await client.getFactions();

    const paths = factions.map(item => ({
        params: { faction: item.faction },
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

const FactionPage: NextPage<{ data: FactionsUnitsResponse }> = props => {
    const { data: initialData } = props;
    const {
        query: { faction },
    } = useRouter();

    const { data } = useFetchWithCache<FactionsUnitsResponse>(
        [apiRoutes.getFactionUnits, faction],
        (_: any, faction: any) => client.getFaсtionUnits({ faction }),
        {
            fallbackData: initialData,
        }
    );

    const groups = data?.units?.map(item => item.caste);
    const newGroups = ['lord', 'hero'].concat(
        [...new Set(groups)].sort((a, b) => a.localeCompare(b)).filter(item => item !== 'hero' && item !== 'lord')
    );
    const campaignUnits: UnitsGroup[] | undefined =
        data &&
        data.units
            .filter(unit => unit.campaign_exclusive === 'true')
            .map(unit => {
                return {
                    unit: unit.unit,
                    _id: unit._id,
                    lord_portrait: unit.lord_portrait,
                    unit_portrait: unit.unit_portrait,
                    icon: unit.icon,
                };
            });
    // console.log(newGroups);

    return (
        <Layout heading={faction}>
            {data &&
                newGroups?.map(item => {
                    const newUnits: UnitsGroup[] = data.units
                        .filter(unit => unit?.campaign_exclusive === 'false' || undefined)
                        .filter(unit => unit.caste === item)
                        .map(unit => {
                            return {
                                unit: unit.unit,
                                _id: unit._id,
                                lord_portrait: unit.lord_portrait,
                                unit_portrait: unit.unit_portrait,
                                icon: unit.icon,
                            };
                        });
                    console.log(newUnits);

                    return newUnits.length > 0 && <UnitsGroup key={item} title={item} units={newUnits} />;
                })}
            {campaignUnits && campaignUnits!.length > 0 && (
                <UnitsGroup title={'campaign_exclusive'} units={campaignUnits} />
            )}
        </Layout>
    );
};

export default FactionPage;
