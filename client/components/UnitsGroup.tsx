import { Box, Heading, HStack } from '@chakra-ui/react';
import { FC } from 'react';
import { FactionUnit } from '../types/faction.types';
import { BASE_URL } from '../api/api';
import { UnitCardMini } from './UnitCardMini';

interface Props {
    units: FactionUnit[] | undefined;
    title: string;
}

export const UnitsGroup: FC<Props> = ({ units, title }) => {
    return units ? (
        <Box as='section' marginBottom='6'>
            <Heading marginBottom='4'>{title}</Heading>
            <HStack wrap='wrap'>
                {units?.map(item => {
                    const imgSrc = item.lord_portrait
                        ? `${BASE_URL}/units/${item.lord_portrait?.split('/')?.slice(-2)?.join('/')}`
                        : item.unit_portrait
                        ? `${BASE_URL}/units/${item.unit_portrait}.png`
                        : `${BASE_URL}/units/${item.unit}.png`;
                    const iconSrc = `${BASE_URL}/unit_category_icons/${item.icon}.png`;
                    return (
                        <UnitCardMini
                            key={item.unit}
                            localName={item.local_name}
                            name={item.unit}
                            imgSrc={imgSrc}
                            href={item.unit}
                            icon={iconSrc}
                        />
                    );
                })}
            </HStack>
        </Box>
    ) : (
        <></>
    );
};
