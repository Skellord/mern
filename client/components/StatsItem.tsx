import { WrapItem, Flex, Progress, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React, { FC } from 'react';
import { valueResolver } from '../utils/unitStats.util';

interface StatsItemProps {
    icon?: StaticImageData;
    text: string;
    value: string;
    maxStats?: number;
}

export const StasItem: FC<StatsItemProps> = ({ text, value, maxStats, icon }) => {
    return (
        <WrapItem display='flex' w='100%' bg='gradient.stats'>
            {icon && <Image src={icon} width={24} height={24} />}
            <Text marginLeft='2' marginRight='auto'>
                {text}
            </Text>
            <Flex as='span' alignItems='center'>
                <Text marginRight='2'>{value}</Text>
                {maxStats && (
                    <Progress
                        colorScheme='yellow'
                        w='50px'
                        h='12px'
                        value={valueResolver(parseInt(value, 10), maxStats)}
                        border='2px solid #433d3d'
                        bgColor='black'
                    />
                )}
            </Flex>
        </WrapItem>
    );
};
