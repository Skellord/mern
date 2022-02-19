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
import styles from '../../styles/styles.module.css';

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

// export const getServerSideProps: GetServerSideProps = async context => {
//     const { params } = context;
//     const { id } = params as { id: string };
//     const data = await client.getUnit({
//         id,
//     });
//     return {
//         props: {
//             data,
//         },
//     };
// };

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
            <Box w='400px' p='4' border='1px' borderColor='gray.400' borderRadius='2xl'>
                <Heading fontSize='2xl' marginBottom='4'>
                    Unit
                </Heading>
                <Flex marginBottom='4'>
                    <Box borderRadius='4' overflow='hidden'>
                        <Image loader={() => imgSrc} src={imgSrc} width={60} height={130} />
                    </Box>

                    <Text fontSize='xl' fontWeight='bold' marginLeft='4'>
                        {unitStats.caste}
                    </Text>
                </Flex>
                <Wrap p='2' border='inherit' borderColor='inherit' borderRadius='3' marginBottom='4' minH='120px'>
                    <WrapItem>pros</WrapItem>
                </Wrap>
                <Wrap
                    p='2'
                    border='inherit'
                    borderColor='inherit'
                    borderRadius='3'
                    marginBottom='4'
                    justify='space-evenly'
                >
                    <WrapItem>{unitStats.num_men}</WrapItem>
                    <WrapItem>{unitStats.multiplayer_cost}</WrapItem>
                </Wrap>
                <Wrap p='2' border='inherit' borderColor='inherit' borderRadius='3' marginBottom='4'>
                    <WrapItem w='100%' justifyContent='center'>
                        <Box h='24px' w='80%' position='relative'>
                            <Progress colorScheme='whatsapp' h='100%' value={100} className={styles.shadow} />
                            <Text
                                position='absolute'
                                top='50%'
                                left='50%'
                                transform='translate(-50%, -50%)'
                                fontWeight='bold'
                                textShadow='dark-lg'
                            >
                                {unitStats.stats.bonus_hit_points}
                            </Text>
                        </Box>
                    </WrapItem>
                    <WrapItem justifyContent='space-between' w='100%'>
                        <Text>Armour</Text>
                        <Flex as='span' alignItems='center'>
                            <Text marginRight='2'>{unitStats.stats.armour.split('_').at(-1)}</Text>
                            <Progress colorScheme='blackAlpha' w='50px' h='12px' value={50} />
                        </Flex>
                    </WrapItem>
                    <WrapItem justifyContent='space-between' w='100%'>
                        <Text>Leadership</Text>
                        <Flex as='span' alignItems='center'>
                            <Text marginRight='2'>{unitStats.stats.morale}</Text>
                            <Progress colorScheme='blackAlpha' w='50px' h='12px' value={50} />
                        </Flex>
                    </WrapItem>
                    <WrapItem justifyContent='space-between' w='100%'>
                        <Text>Speed</Text>
                        <Flex as='span' alignItems='center'>
                            <Text marginRight='2'>-</Text>
                            <Progress colorScheme='blackAlpha' w='50px' h='12px' value={50} />
                        </Flex>
                    </WrapItem>
                    <WrapItem justifyContent='space-between' w='100%'>
                        <Text>Melee attack</Text>
                        <Flex as='span' alignItems='center'>
                            <Text marginRight='2'>{unitStats.stats.melee_attack}</Text>
                            <Progress colorScheme='blackAlpha' w='50px' h='12px' value={50} />
                        </Flex>
                    </WrapItem>
                    <WrapItem justifyContent='space-between' w='100%'>
                        <Text>Melee defence</Text>
                        <Flex as='span' alignItems='center'>
                            <Text marginRight='2'>{unitStats.stats.melee_defence}</Text>
                            <Progress colorScheme='blackAlpha' w='50px' h='12px' value={50} />
                        </Flex>
                    </WrapItem>
                    <WrapItem justifyContent='space-between' w='100%'>
                        <Text>Melee defence</Text>
                        <Flex as='span' alignItems='center'>
                            <Text marginRight='2'>{unitStats.stats.melee_defence}</Text>
                            <Progress colorScheme='blackAlpha' w='50px' h='12px' value={50} />
                        </Flex>
                    </WrapItem>
                    <WrapItem justifyContent='space-between' w='100%'>
                        <Text>Charge bonus</Text>
                        <Flex as='span' alignItems='center'>
                            <Text marginRight='2'>{unitStats.stats.charge_bonus}</Text>
                            <Progress colorScheme='blackAlpha' w='50px' h='12px' value={50} />
                        </Flex>
                    </WrapItem>
                </Wrap>
            </Box>
        </Layout>
    );
};

export default UnitPage;
