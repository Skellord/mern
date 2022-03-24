import { WrapItem, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React, { FC } from 'react';
import { BASE_URL } from '../api/api';

interface AttributeItem {
    type?: 'spells' | 'attribute';
    item: string;
    name?: string;
}

export const AttributeItem: FC<AttributeItem> = ({ item, type = 'attribute', name }) => {
    let imgSrc = '';

    if (type === 'attribute') {
        switch (item) {
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
            case 'wh3_main_lord_passive_soul_siphon':
                imgSrc = `${BASE_URL}/ability_icons/wh3_main_lord_passive_soul_snare.png`;
                break;
            case 'wh2_main_character_passive_grand_arcane_conduit':
                imgSrc = `${BASE_URL}/ability_icons/wh_main_character_abilities_arcane_conduit.png`;
                break;
            case 'wh_dlc05_lore_passive_life_bloom':
                imgSrc = `${BASE_URL}/ability_icons/wh_dlc05_spell_life_life_bloom.png`;
                break;
            case 'wh3_main_unit_passive_unbinding_ancestral_warriors':
                imgSrc = `${BASE_URL}/ability_icons/unbinding.png`;
                break;
            case 'wh3_main_mount_bound_celestial_comet':
                imgSrc = `${BASE_URL}/ability_icons/wh_main_spell_heavens_comet_of_casandora.png`;
                break;
            case 'wh3_main_mount_bound_celestial_lightning':
                imgSrc = `${BASE_URL}/ability_icons/wh_main_spell_heavens_urannons_thunderbolt.png`;
                break;
            default:
                imgSrc = `${BASE_URL}/ability_icons/${item}.png`;
                break;
        }
        if (item.includes('daemonic_instability')) {
            imgSrc = `${BASE_URL}/ability_icons/wh3_main_unit_passive_daemonic_instability.png`;
            if (item.includes('_ii')) {
                imgSrc = `${BASE_URL}/ability_icons/wh3_main_unit_passive_daemonic_instability_ii.png`;
            }
        }
        if (item.includes('apocalyptic_charge')) {
            imgSrc = `${BASE_URL}/ability_icons/wh_dlc08_nor_apocalyptic_charge.png`;
        }
    }

    const text =
        name === '{{tr:guerrilla_deployment}}' ? 'Guerrilla deployment' : name?.replace(/\[.*?\]\[.*?\]]/gm, '');

    return (
        <WrapItem w='100%' h='24px' alignItems='center'>
            <Image src={imgSrc} loader={() => imgSrc} width={24} height={24} unoptimized alt='attribute' />
            <Text ml='2'>{text}</Text>
        </WrapItem>
    );
};
