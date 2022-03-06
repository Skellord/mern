import { WrapItem, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React, { FC } from 'react';
import { BASE_URL } from '../api/api';
import { Attributesgroup } from '../types/attributes.types';

interface AttributeItem {
    type?: 'spells' | 'attribute';
    item: string;
}

export const AttributeItem: FC<AttributeItem> = ({ item, type = 'attribute' }) => {
    let imgSrc = '';

    if (type === 'attribute') {
        switch (item as Attributesgroup) {
            case 'hide_forest':
                imgSrc = `${BASE_URL}/effect_bundles/${item}.png`;
                break;
            default:
                imgSrc = `${BASE_URL}/effect_bundles/attribute_${item}.png`;
                break;
        }
    }

    if (type === 'spells') {
        imgSrc = `${BASE_URL}/ability_icons/${item}.png`;
    }

    return (
        <WrapItem w='100%' h='24px' alignItems='center'>
            <Image src={imgSrc} loader={() => imgSrc} width={24} height={24} unoptimized />
            <Text ml='2'>{item}</Text>
        </WrapItem>
    );
};
