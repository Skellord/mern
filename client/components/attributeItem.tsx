import { WrapItem, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React, { FC } from 'react';
import { BASE_URL } from '../api/api';
import { Attributesgroup } from '../types/attributes.types';

interface AttributeItem {
    type?: 'spells' | 'attribute';
    item: string;
    name?: string;
}

export const AttributeItem: FC<AttributeItem> = ({ item, type = 'attribute', name }) => {
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
        switch (item) {
            case 'wh3_main_unit_passive_daemonic_instability_slaanesh_ii':
                imgSrc = `${BASE_URL}/ability_icons/wh3_main_unit_passive_daemonic_instability_ii.png`;
                break;
            case 'wh3_main_unit_passive_daemonic_instability_slaanesh':
                imgSrc = `${BASE_URL}/ability_icons/wh3_main_unit_passive_daemonic_instability.png`;
                break;
            case 'wh3_main_lord_passive_soul_siphon':
                imgSrc = `${BASE_URL}/ability_icons/wh3_main_lord_passive_soul_snare.png`;
                break;
            default:
                imgSrc = `${BASE_URL}/ability_icons/${item}.png`;
                break;
        }
    }

    console.log(name?.split('['));

    return (
        <WrapItem w='100%' h='24px' alignItems='center'>
            <Image src={imgSrc} loader={() => imgSrc} width={24} height={24} unoptimized />
            <Text ml='2'>{name}</Text>
        </WrapItem>
    );
};
