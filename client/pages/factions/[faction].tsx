import { Box, Heading, Spinner, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { ErrorAlert } from '../../components/ErrorAlert';
import Layout from '../../components/Layout';
import { UnitCardMini } from '../../components/UnitCardMini';
import { useRequest } from '../../hooks/useRequest';
import { Unit, UnitCaste } from '../../types/units.types';
import { apiRoutes, baseUrl } from '../../utils/api.util';

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
        <Box as='section' marginBottom='6'>
            <Heading marginBottom='4'>{title}</Heading>
            <HStack>
                {data.map((item: Unit) => {
                    const newName = item.unit.split('_');
                    const name =
                        newName[newName.length - 1] === '0'
                            ? newName.slice(4, newName.length - 1).join(' ')
                            : newName.slice(4, newName.length).join(' ');
                    const imgSrc = `${baseUrl}/units/${item.unit}.png`;
                    return <UnitCardMini key={item.unit} name={name} imgSrc={imgSrc} href={item._id} />;
                })}
            </HStack>
        </Box>
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
            <UnitsGroup faction={faction as string} title={'Missile cavalry'} type={'missile_cavalry'} />
            <UnitsGroup faction={faction as string} title={'Monster'} type={'monster'} />
            <UnitsGroup faction={faction as string} title={'War beast'} type={'war_beast'} />
            <UnitsGroup faction={faction as string} title={'Monstrous infantry'} type={'monstrous_infantry'} />
            <UnitsGroup faction={faction as string} title={'Monstrous Cavalry'} type={'monstrous_cavalry'} />
            <UnitsGroup faction={faction as string} title={'Warmachine'} type={'warmachine'} />
        </Layout>
    );
}
