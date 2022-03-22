import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { FactionUnit } from '../../../types/faction.types';
import { client } from '../../api/api';
import Layout from '../../components/Layout';
import { UnitsGroup } from '../../components/UnitsGroup';
import { useFetchWithCache } from '../../hooks/useFetchWithCache';
import { FactionsUnitsResponse } from '../../types/api.types';
import { apiRoutes } from '../../utils/api.util';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { isString } from 'lodash';

export const getStaticPaths: GetStaticPaths = async () => {
    const factions = await client.getFactions();

    const paths = factions.map(item => ({
        params: { faction: item.faction },
        locale: 'en',
    }));
    const ruPaths = factions.map(item => ({
        params: { faction: item.faction },
        locale: 'ru',
    }));
    return { paths: [...paths, ...ruPaths], fallback: false };
};

export const getStaticProps: GetStaticProps = async context => {
    const { params, locale } = context;
    const loc = locale === 'ru' ? 'ru' : 'en';

    const { faction } = params as { faction: string };
    const data = await client.getFaсtionUnits({
        faction,
    });
    return {
        props: {
            data,
            ...(await serverSideTranslations(loc, ['caste', 'faction', 'nav', 'common'])),
        },
    };
};

const FactionPage: NextPage<{ data: FactionsUnitsResponse }> = props => {
    const { data: initialData } = props;
    const {
        query: { faction },
    } = useRouter();

    const { t } = useTranslation(['caste', 'faction', 'nav', 'common']);

    const { data } = useFetchWithCache<FactionsUnitsResponse>(
        [apiRoutes.getFactionUnits, faction],
        (_: any, faction: any) => client.getFaсtionUnits({ faction }),
        {
            fallbackData: initialData,
        }
    );

    const factionName = data?.faction ? (isString(data?.faction) ? data?.faction : '') : '';
    const campaignUnits: FactionUnit[] | undefined =
        data && data.units.filter(unit => unit.campaign_exclusive === 'true');

    const nonCampaignUnits =
        data && data.units.filter(unit => unit.campaign_exclusive === 'false' || unit.campaign_exclusive === undefined);

    const lords = nonCampaignUnits?.filter(item => item.caste === 'lord');
    const heroes = nonCampaignUnits?.filter(item => item.caste === 'hero');
    const meleeInfantry = nonCampaignUnits?.filter(item => item.caste === 'melee_infantry');
    const missileInfantry = nonCampaignUnits?.filter(item => item.caste === 'missile_infantry');
    const monstrousInfantry = nonCampaignUnits?.filter(item => item.caste === 'monstrous_infantry');
    const meleeCavalry = nonCampaignUnits?.filter(item => item.caste === 'melee_cavalry');
    const missileCavalry = nonCampaignUnits?.filter(item => item.caste === 'missile_cavalry');
    const monstrousCavalry = nonCampaignUnits?.filter(item => item.caste === 'monstrous_cavalry');
    const chariot = nonCampaignUnits?.filter(item => item.caste === 'chariot');
    const monster = nonCampaignUnits?.filter(item => item.caste === 'monster');
    const warBeast = nonCampaignUnits?.filter(item => item.caste === 'war_beast');
    const warMachine = nonCampaignUnits?.filter(item => item.caste === 'warmachine');

    return (
        <Layout heading={t(`faction:${factionName}`)}>
            <UnitsGroup title={t('lord')} units={lords} />
            <UnitsGroup title={t('hero')} units={heroes} />
            {meleeInfantry && meleeInfantry.length > 0 && (
                <UnitsGroup title={t('melee_infantry')} units={meleeInfantry} />
            )}
            {missileInfantry && missileInfantry.length > 0 && (
                <UnitsGroup title={t('missile_infantry')} units={missileInfantry} />
            )}
            {monstrousInfantry && monstrousInfantry.length > 0 && (
                <UnitsGroup title={t('monstrous_infantry')} units={monstrousInfantry} />
            )}
            {meleeCavalry && meleeCavalry.length > 0 && <UnitsGroup title={t('melee_cavalry')} units={meleeCavalry} />}

            {missileCavalry && missileCavalry.length > 0 && (
                <UnitsGroup title={t('missile_cavalry')} units={missileCavalry} />
            )}
            {monstrousCavalry && monstrousCavalry.length > 0 && (
                <UnitsGroup title={t('monstrous_cavalry')} units={monstrousCavalry} />
            )}
            {chariot && chariot.length > 0 && <UnitsGroup title={t('chariot')} units={chariot} />}
            {monster && monster.length > 0 && <UnitsGroup title={t('monster')} units={monster} />}
            {warBeast && warBeast.length > 0 && <UnitsGroup title={t('war_beast')} units={warBeast} />}
            {warMachine && warMachine.length > 0 && <UnitsGroup title={t('war_machine')} units={warMachine} />}

            {campaignUnits && campaignUnits.length > 0 && (
                <UnitsGroup title={t('campaign_exclusive')} units={campaignUnits} />
            )}
        </Layout>
    );
};

export default FactionPage;
