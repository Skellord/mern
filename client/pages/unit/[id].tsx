import { Flex, Divider, Heading, Spinner, Box, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { client } from '../../api/api';
import { ErrorAlert } from '../../components/ErrorAlert';
import Layout from '../../components/Layout';
import { useFetchWithCache } from '../../hooks/useFetchWithCache';
import { apiRoutes } from '../../utils/api.util';
import { UnitCard } from '../../components/UnitCard';
import { Localization } from '../../types/localization.types';
import { UnitWithStats } from '../../types/units.types';
import { AttributeItem } from '../../components/AttributeItem';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export const getStaticPaths: GetStaticPaths = async () => {
    const units = await client.getUnits();

    const paths = units.map(unit => ({
        params: {
            id: unit.unit,
        },
        locale: 'en',
    }));

    const ruPaths = units.map(unit => ({
        params: {
            id: unit.unit,
        },
        locale: 'ru',
    }));

    return { paths: [...paths, ...ruPaths], fallback: false };
};

export const getStaticProps: GetStaticProps = async context => {
    const { params, locale } = context;
    const loc = locale === 'ru' ? 'ru' : 'en';
    const { id } = params as { id: string };
    const data = await client.getUnitStats({
        name: id,
    });
    const histDesc = await client.getHistoricalDesc({
        key: `unit_description_historical_texts_text_${data.stats.historical_description_text}`,
    });
    return {
        props: {
            data,
            histDesc,
            ...(await serverSideTranslations(loc, ['caste', 'nav', 'common', 'unit'])),
        },
    };
};

interface UnitPage {
    data: UnitWithStats;
    histDesc: Localization;
}

interface Attribute {
    name: string;
    local_name: string;
}

const UnitPage: NextPage<UnitPage> = props => {
    const { data: initialData, histDesc } = props;
    const {
        query: { id },
    } = useRouter();
    console.log(id);

    const { data, isFirstLoading } = useFetchWithCache<UnitWithStats>(
        [apiRoutes.getUnits, id, '/stats'],
        (_: any, id: any) => client.getUnitStats({ name: id }),
        {
            fallbackData: initialData,
        }
    );

    const descKey = `unit_description_historical_texts_text_${data?.stats.historical_description_text}`;

    const { data: histDescData } = useFetchWithCache<Localization>(
        [apiRoutes.getHistoricalDesc, descKey],
        (_: any, descKey: any) => client.getHistoricalDesc({ key: descKey }),
        {
            fallbackData: histDesc,
        }
    );
    const { t } = useTranslation('unit');

    if (!data) return <ErrorAlert />;
    if (isFirstLoading) return <Spinner />;

    const attributes: Attribute[] = data.attributes.map(item => ({
        name: item.attribute,
        local_name: item.local_name,
    }));

    const specialAbilities: Attribute[] | undefined = data.special_abilities
        ?.filter(item => {
            return !item.ability.split('_').includes('passive');
        })
        .map(item => ({ name: item.ability, local_name: item.local_name }));

    const passiveAbilities: Attribute[] | undefined = data.special_abilities
        ?.filter(item => {
            return item.ability.split('_').includes('passive');
        })
        .map(item => ({ name: item.ability, local_name: item.local_name }))
        .concat(attributes);

    return (
        <Layout>
            <Heading as='h1' marginBottom='6'>
                {data.local_name}
            </Heading>
            <Flex w='100%' h='100%'>
                <Box flexShrink='0' mr='2'>
                    <UnitCard unitStats={data} />
                </Box>

                <Divider orientation='vertical' borderColor='crimson.400' h='calc(100% - 100px)' />

                <Box as='section' p='4'>
                    <Heading fontSize='2xl' mb='4'>
                        {t('desc')}
                    </Heading>
                    <Text fontStyle='italic' p='1' mb='12'>
                        {histDescData?.text}
                    </Text>

                    {specialAbilities && specialAbilities.length > 0 && (
                        <>
                            <Heading fontSize='2xl' mb='4'>
                                {t('abilities')}
                            </Heading>
                            <Wrap mb='12'>
                                {specialAbilities.map(item => (
                                    <AttributeItem
                                        key={item.name}
                                        item={item.name}
                                        name={item.local_name}
                                        type='spells'
                                    />
                                ))}
                            </Wrap>
                        </>
                    )}

                    {data.lore_spells && (
                        <>
                            <Heading fontSize='2xl' mb='4'>
                                {t('spells')}
                            </Heading>
                            <Wrap mb='12'>
                                {data?.lore_spells.map(item => (
                                    <AttributeItem
                                        key={item.unit_special_abilities}
                                        item={item.unit_special_abilities}
                                        name={item.local_name}
                                        type='spells'
                                    />
                                ))}
                            </Wrap>
                        </>
                    )}

                    {passiveAbilities && passiveAbilities.length > 0 && (
                        <>
                            <Heading fontSize='2xl' mb='4'>
                                {t('passive')}
                            </Heading>
                            <Wrap mb='12'>
                                {passiveAbilities.map(item => (
                                    <AttributeItem
                                        key={item.name}
                                        item={item.name}
                                        name={item.local_name}
                                        type='spells'
                                    />
                                ))}
                            </Wrap>
                        </>
                    )}
                </Box>
            </Flex>
        </Layout>
    );
};

export default UnitPage;
