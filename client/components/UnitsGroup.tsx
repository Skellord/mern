import { Box, Heading, HStack } from '@chakra-ui/react';
import { FC } from 'react';
import { FactionUnit } from '../../types/faction.types';
import { BASE_URL } from '../api/api';
import { UnitCardMini } from './UnitCardMini';

export type UnitsGroup = Omit<FactionUnit, 'land_unit' | 'caste'>;

interface Props {
    units: UnitsGroup[];
    title: string;
}

export const UnitsGroup: FC<Props> = ({ units, title }) => {
    return (
        <Box as='section' marginBottom='6'>
            <Heading marginBottom='4'>{title}</Heading>
            <HStack wrap='wrap'>
                {units?.map(item => {
                    // const newName = item.unit.split('_');
                    // const name =
                    //     newName[newName.length - 1] === '0'
                    //         ? newName.slice(4, newName.length - 1).join(' ')
                    //         : newName.slice(4, newName.length).join(' ');
                    const imgSrc = item.lord_portrait
                        ? `${BASE_URL}/units/${item.lord_portrait?.split('/')?.slice(-2)?.join('/')}`
                        : item.unit_portrait
                        ? `${BASE_URL}/units/${item.unit_portrait}.png`
                        : `${BASE_URL}/units/${item.unit}.png`;
                    const iconSrc = `${BASE_URL}/unit_category_icons/${item.icon}.png`;
                    return (
                        <UnitCardMini key={item.unit} name={item.unit} imgSrc={imgSrc} href={item._id} icon={iconSrc} />
                    );
                })}
            </HStack>
        </Box>
    );
};
