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
import { useTranslation } from 'next-i18next';

interface MeleeDamageBlock {
    melee_damage: MeleeDamage;
}

export const MeleeDamageBlock: FC<MeleeDamageBlock> = ({ melee_damage }) => {
    const { t } = useTranslation('unit');
    const weaponStrengthVal = (parseInt(melee_damage.damage, 10) + parseInt(melee_damage.ap_damage, 10)).toString();
    return (
        <StatsAccordion icon={damageIcon} text={t('strength')} value={weaponStrengthVal} maxStats={maxVariables.damage}>
            <SimpleGrid as='ul' gridRowGap='1'>
                <StatsItem icon={baseDamageIcon} text={t('damage')} value={melee_damage.damage} />
                <StatsItem icon={apDamageIcon} text={t('damageAP')} value={melee_damage.ap_damage} />
                <StatsItem icon={infantryBonusIcon} text={t('bonusInf')} value={melee_damage.bonus_v_infantry} />
                <StatsItem icon={largeBonusIcon} text={t('bonusLarge')} value={melee_damage.bonus_v_large} />
                <StatsItem text={t('building')} value={melee_damage.building_damage_multiplier} />
            </SimpleGrid>
        </StatsAccordion>
    );
};
