import { Text, Box, Heading, Spinner, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { ErrorAlert } from '../../components/ErrorAlert';
import Layout from '../../components/Layout';
import { useRequest } from '../../hooks/useRequest';
import { Unit, UnitCaste } from '../../types/units.types';
import { apiRoutes } from '../../utils/api.util';

interface Props {
    faction: string;
    type: UnitCaste;
    title: string;
}

const UnitsGroup: FC<Props> = ({ faction, type, title }) => {
    const unitType = faction + '/' + type;
    const { data, error }: { data: Unit[]; error: any } = useRequest(apiRoutes.factions, unitType);

    if (error) return <ErrorAlert />;
    if (!error && !data) return <Spinner />;
    return !data.length ? (
        <></>
    ) : (
        <>
            <Box as='section'>
                <Heading>{title}</Heading>
                <VStack>
                    {data.map((item: Unit) => {
                        const newName = item.unit.split('_');
                        const name =
                            newName[newName.length - 1] === '0'
                                ? newName.slice(4, newName.length - 1).join(' ')
                                : newName.slice(4, newName.length).join(' ');
                        return (
                            <Box key={item.id}>
                                <Text>{name}</Text>
                            </Box>
                        );
                    })}
                </VStack>
            </Box>
        </>
    );
};

export default function FactionPage() {
    const router = useRouter();
    const { faction } = router.query;
    return (
        <Layout heading={faction}>
            <UnitsGroup faction={faction as string} title={'Lords'} type={'lord'} />
            <UnitsGroup faction={faction as string} title={'Heroes'} type={'hero'} />
            <UnitsGroup faction={faction as string} title={'Melee infantry'} type={'melee_infantry'} />
            <UnitsGroup faction={faction as string} title={'Missile infantry'} type={'missile_infantry'} />
            <UnitsGroup faction={faction as string} title={'Melee cavalry'} type={'melee_cavalry'} />
            <UnitsGroup faction={faction as string} title={'Monster'} type={'monster'} />
            <UnitsGroup faction={faction as string} title={'War beast'} type={'war_beast'} />
            <UnitsGroup faction={faction as string} title={'Monstrous infantry'} type={'monstrous_infantry'} />
            <UnitsGroup faction={faction as string} title={'Warmachine'} type={'warmachine'} />
        </Layout>
    );
}
