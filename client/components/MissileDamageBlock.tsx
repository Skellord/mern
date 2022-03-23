import { SimpleGrid } from '@chakra-ui/react';
import { FC } from 'react';
import { MissileDamage } from '../types/units.types';
import { maxVariables } from '../utils/unitStats.util';
import { StatsAccordion } from './StatsAccordion';
import { StatsItem } from './StatsItem';
import { compact, round } from 'lodash';
import { contactPhaseResolver, magicalDmgSrc } from '../utils/stats.util';
import { useTranslation } from 'next-i18next';

import ammoIcon from '../assets/img/icon_stat_ammo.png';
import missileDamageIcon from '../assets/img/icon_stat_ranged_damage.png';
import rangeIcon from '../assets/img/icon_stat_range.png';
import missileDamageBaseIcon from '../assets/img/icon_stat_ranged_damage_base_character.png';
import missileDamageAPIcon from '../assets/img/icon_stat_explosive_armour_piercing_damage_character.png';
import reloadIcon from '../assets/img/icon_stat_reload_time_character.png';
import infantryBonusIcon from '../assets/img/bonus_vs_small_character.png';
import largeBonusIcon from '../assets/img/bonus_vs_large_character.png';

interface MissileDamageBlock {
    missileDamage: MissileDamage;
    ammo: string;
}

export const MissileDamageBlock: FC<MissileDamageBlock> = ({ missileDamage, ammo }) => {
    const { t } = useTranslation('unit');
    const dmg = parseInt(missileDamage.damage);
    const apDmg = parseInt(missileDamage.ap_damage);
    const shots = parseInt(missileDamage.shots_per_volley);
    const reload = round(parseInt(missileDamage.base_reload_time) * 0.9, 1);
    const projNumber = parseInt(missileDamage.projectile_number);
    const ammoVal = Math.ceil(parseInt(ammo) / shots / projNumber);
    const magicalMissileSrc = missileDamage.is_magical === 'true' ? magicalDmgSrc : undefined;
    const contactPhaseSrc =
        missileDamage.contact_stat_effect && contactPhaseResolver(missileDamage.contact_stat_effect);
    const attackAdditionalIconSrc = compact([magicalMissileSrc, contactPhaseSrc]);

    const missileDamageVal = missileDamage.explosion
        ? Math.floor(
              ((dmg +
                  apDmg +
                  parseInt(missileDamage.explosion?.detonation_damage) +
                  parseInt(missileDamage.explosion?.detonation_damage_ap)) *
                  projNumber *
                  shots *
                  10) /
                  reload
          )
        : Math.floor(((dmg + apDmg) * projNumber * shots * 10) / reload);
    return (
        <>
            <StatsAccordion
                icon={missileDamageIcon}
                text={t('damageMiss')}
                value={missileDamageVal.toString()}
                maxStats={maxVariables.missileDamage}
                additionalIcons={attackAdditionalIconSrc}
            >
                <SimpleGrid as='ul' gridRowGap='1'>
                    <StatsItem icon={missileDamageBaseIcon} text={t('damageBaseMiss')} value={missileDamage.damage} />
                    <StatsItem icon={missileDamageAPIcon} text={t('damageAPMiss')} value={missileDamage.ap_damage} />
                    <StatsItem icon={infantryBonusIcon} text={t('bonusInf')} value={missileDamage.bonus_v_infantry} />
                    <StatsItem icon={largeBonusIcon} text={t('bonusLarge')} value={missileDamage.bonus_v_large} />
                    <StatsItem icon={reloadIcon} text={t('reload')} value={reload.toString()} />
                    <StatsItem text={t('shots')} value={missileDamage.shots_per_volley} />
                    <StatsItem text={t('projectile')} value={missileDamage.projectile_number} />
                    {missileDamage.contact_stat_effect && (
                        <StatsItem
                            text={t('contact')}
                            value={missileDamage.contact_stat_effect.split('_').slice(4)?.join(' ')}
                        />
                    )}
                    <StatsItem text={t('buildingsDamage')} value={missileDamage.can_damage_buildings} />
                    {missileDamage.can_damage_buildings === 'true' && (
                        <StatsItem text={t('building')} value={missileDamage.building_damage_multiplier} />
                    )}
                </SimpleGrid>
            </StatsAccordion>
            <StatsItem
                icon={rangeIcon}
                text={t('range')}
                value={missileDamage.effective_range}
                maxStats={maxVariables.range}
            />
            <StatsItem icon={ammoIcon} text={t('ammo')} value={ammoVal.toString()} maxStats={maxVariables.ammo} />
        </>
    );
};
