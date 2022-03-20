import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { FC } from 'react';
import { MeleeDamage } from '../../types/units.types';
import { maxVariables } from '../utils/unitStats.util';
import { StatsAccordion } from './StatsAccordion';
import { StatsItem } from './StatsItem';

import baseDamageIcon from '../assets/img/icon_stat_damage_base_character.png';
import apDamageIcon from '../assets/img/armour_piercing_character.png';
import largeBonusIcon from '../assets/img/bonus_vs_large_character.png';
import infantryBonusIcon from '../assets/img/bonus_vs_small_character.png';
import damageIcon from '../assets/img/icon_stat_damage.png';

interface MeleeDamageBlock {
    melee_damage: MeleeDamage;
}

export const MeleeDamageBlock: FC<MeleeDamageBlock> = ({ melee_damage }) => {
    const weaponStrengthVal = (parseInt(melee_damage.damage, 10) + parseInt(melee_damage.ap_damage, 10)).toString();
    return (
        <StatsAccordion
            icon={damageIcon}
            text={'Weapon strength'}
            value={weaponStrengthVal}
            maxStats={maxVariables.damage}
        >
            <SimpleGrid as='ul' gridRowGap='1'>
                <StatsItem icon={baseDamageIcon} text={'Base damage'} value={melee_damage.damage} />
                <StatsItem icon={apDamageIcon} text={'AP damage'} value={melee_damage.ap_damage} />
                <StatsItem icon={infantryBonusIcon} text={'Bonus vs. infantry'} value={melee_damage.bonus_v_infantry} />
                <StatsItem icon={largeBonusIcon} text={'Bonus vs. large'} value={melee_damage.bonus_v_large} />
                <StatsItem text={'Building damage multiplier'} value={melee_damage.building_damage_multiplier} />
            </SimpleGrid>
        </StatsAccordion>
    );
};
