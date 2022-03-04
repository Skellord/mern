import { Box, Flex, Heading, Text, Wrap, WrapItem, Center, Divider, VStack, SimpleGrid } from '@chakra-ui/react';
import { FC } from 'react';
import { UnitWithStats } from '../../types/units.types';
import Image from 'next/image';
import { BASE_URL } from '../api/api';
import { maxVariables } from '../utils/unitStats.util';
import { StatsAccordion } from './StatsAccordion';
import { StatsItem } from './StatsItem';

import casteCircleUrl from '../assets/img/unit_cat_holder_round.png';
import casteCircleRorUrl from '../assets/img/unit_cat_holder_round_renown.png';
import borderImage from '../assets/img/panel_back_frame.png';
import arrowIncrease from '../assets/img/arrow_increase_1.png';
import arrowDecrease from '../assets/img/arrow_decrease_1.png';
import men from '../assets/img/icon_entity_small.png';
import spCost from '../assets/img/icon_income-1-24x24.png';
import mpCost from '../assets/img/icon_treasury.png';
import spUpkeep from '../assets/img/icon_upkeep-1-24x24.png';
import healthIcon from '../assets/img/icon_stat_health_noframe_16px.png';
import armourIcon from '../assets/img/icon_stat_armour.png';
import shieldIcon from '../assets/img/modifier_icon_shield.png';
import attackIcon from '../assets/img/icon_stat_attack.png';
import damageIcon from '../assets/img/icon_stat_damage.png';
import defenceIcon from '../assets/img/icon_stat_defence.png';
import chargeIcon from '../assets/img/icon_stat_charge_bonus.png';
import ammoIcon from '../assets/img/icon_stat_ammo.png';
import missileDamageIcon from '../assets/img/icon_stat_ranged_damage.png';
import moraleIcon from '../assets/img/icon_stat_morale.png';
import speedIcon from '../assets/img/icon_stat_speed.png';
import wardSaveIcon from '../assets/img/resistance_ward_save.png';
import physResistanceIcon from '../assets/img/resistance_physical.png';
import missileResistanceIcon from '../assets/img/resistance_missile.png';
import magResistanceIcon from '../assets/img/resistance_magic.png';
import fireResistanceIcon from '../assets/img/resistance_fire.png';
import baseDamageIcon from '../assets/img/icon_stat_damage_base_character.png';
import apDamageIcon from '../assets/img/armour_piercing_character.png';
import largeBonusIcon from '../assets/img/bonus_vs_large_character.png';
import infantryBonusIcon from '../assets/img/bonus_vs_small_character.png';
import cavalryBonusIcon from '../assets/img/cavalry.png';
import { AttributeItem } from './attributeItem';
import { Attributesgroup } from '../types/attributes.types';

interface UnitCardProps {
    unitStats: UnitWithStats;
}

export const UnitCard: FC<UnitCardProps> = ({ unitStats }) => {
    const imgSrc = unitStats.lord_portrait
        ? `${BASE_URL}/units/${unitStats.lord_portrait?.split('/')?.slice(-2)?.join('/')}`
        : `${BASE_URL}/units/${unitStats.unit_portrait}.png`;

    const hp = (parseInt(unitStats.stats.bonus_hit_points, 10) * parseInt(unitStats.num_men, 10)).toString();
    const shieldVal = unitStats.stats.shield === 'none' ? '0' : unitStats.stats.shield.split('_').at(-2);
    const weaponStrengthVal = (
        parseInt(unitStats.melee_damage.damage, 10) + parseInt(unitStats.melee_damage.ap_damage, 10)
    ).toString();
    const missileDamageVal =
        unitStats.missile_damage &&
        (parseInt(unitStats.missile_damage.damage) + parseInt(unitStats.missile_damage.ap_damage, 10)).toString();
    const massVal = unitStats.mountEntity ? unitStats.mountEntity.mass : unitStats.entity.mass;
    const isUnitRor = unitStats.unit.split('_').includes('ror');
    const iconSrc = `${BASE_URL}/unit_category_icons/${unitStats.icon}.png`;
    console.log(unitStats);
    return (
        <Box as='section' w='400px' p='4'>
            <Heading fontSize='2xl' marginBottom='4'>
                Unit
            </Heading>
            <Flex marginBottom='4'>
                <Center
                    display='flex'
                    w='75px'
                    h='140px'
                    flexWrap='wrap'
                    position='relative'
                    borderRadius='4px'
                    overflow='hidden'
                    style={{ borderImage: `url(${borderImage.src}) 30 / 65px 135px` }}
                >
                    <Box w='60px' h='130px'>
                        <Image
                            loader={() => imgSrc}
                            src={imgSrc}
                            width={60}
                            height={130}
                            placeholder='empty'
                            unoptimized
                        />
                    </Box>
                </Center>

                <Center
                    bgImage={`url(${isUnitRor ? casteCircleRorUrl.src : casteCircleUrl.src})`}
                    w={isUnitRor ? '46px' : '34px'}
                    h={isUnitRor ? '43px' : '34px'}
                    paddingTop={isUnitRor ? '5px' : '0'}
                    marginLeft='4'
                >
                    <Image loader={() => iconSrc} src={iconSrc} width={22} height={22} unoptimized />
                </Center>
                <Text fontSize='xl' fontWeight='bold' marginLeft='3'>
                    {unitStats.caste}
                </Text>
            </Flex>

            <Divider p='1' borderColor='crimson.400' />

            <VStack
                as='ul'
                alignItems='flex-start'
                p='2'
                border='inherit'
                borderColor='inherit'
                borderRadius='3'
                marginBottom='4'
                minH='120px'
            >
                {unitStats.specs
                    ?.sort((a, b) => {
                        if (a.state > b.state) {
                            return -1;
                        }
                        if (a.state < b.state) {
                            return 1;
                        }
                        return 0;
                    })
                    .map(item => (
                        <WrapItem
                            key={item.key}
                            color={item.state === 'positive' ? 'green.400' : 'red.400'}
                            alignItems='flex-end'
                        >
                            <Image
                                src={item.state === 'positive' ? arrowIncrease : arrowDecrease}
                                width={16}
                                height={18}
                            />
                            <Text marginLeft='1'>{item.key}</Text>
                        </WrapItem>
                    ))}
            </VStack>

            <Divider p='1' borderColor='crimson.400' marginBottom='1' />

            <Wrap p='1' border='inherit' borderColor='inherit' borderRadius='3' justify='space-between'>
                <WrapItem>
                    <Image src={men} />
                    {unitStats.num_men}
                </WrapItem>
            </Wrap>

            <Divider p='1' borderColor='crimson.400' marginBottom='1' />

            <Wrap p='1' border='inherit' borderColor='inherit' borderRadius='3' justify='space-evenly'>
                <WrapItem>
                    <Image src={spCost} width={24} height={24} />
                    <Text marginLeft='1'>{unitStats.recruitment_cost}</Text>
                </WrapItem>
                <WrapItem>
                    <Image src={spUpkeep} width={24} height={24} />
                    <Text marginLeft='1'>{unitStats.upkeep_cost}</Text>
                </WrapItem>
                <WrapItem>
                    <Image src={mpCost} width={24} height={24} />
                    <Text marginLeft='1'>{unitStats.multiplayer_cost}</Text>
                </WrapItem>
            </Wrap>

            <Divider p='1' borderColor='crimson.400' />

            <Wrap p='4' border='inherit' borderColor='inherit' borderRadius='3'>
                <WrapItem w='100%' justifyContent='center' marginBottom='14px !important'>
                    <Box h='24px' w='80%' position='relative'>
                        <Box h='100%' bg='gradient.health' />
                        <Flex position='absolute' top='50%' left='50%' transform='translate(-50%, -50%)' align='center'>
                            <Box w='16px' h='16px'>
                                <Image src={healthIcon} width={16} height={16} objectFit={'fill'} />
                            </Box>
                            <Text fontWeight='bold' textShadow='text'>
                                {hp}
                            </Text>
                        </Flex>
                    </Box>
                </WrapItem>

                <StatsAccordion
                    icon={armourIcon}
                    additionalIcon={unitStats.stats.shield === 'none' ? undefined : shieldIcon}
                    text={'Armour'}
                    value={unitStats.stats.armour.split('_')?.at(-1) || '0'}
                    maxStats={maxVariables.armour}
                >
                    <SimpleGrid as='ul' gridRowGap='1'>
                        <StatsItem icon={shieldIcon} text='Parry chance' value={shieldVal || '0'} />
                        <StatsItem icon={wardSaveIcon} text='Ward save' value={unitStats.stats.damage_mod_all} />
                        <StatsItem
                            icon={physResistanceIcon}
                            text={'Physical resistance'}
                            value={unitStats.stats.damage_mod_physical}
                        />
                        <StatsItem
                            icon={missileResistanceIcon}
                            text={'Missile resistance'}
                            value={unitStats.stats.damage_mod_missile}
                        />
                        <StatsItem
                            icon={magResistanceIcon}
                            text={'Magic resistance'}
                            value={unitStats.stats.damage_mod_magic}
                        />
                        <StatsItem
                            icon={fireResistanceIcon}
                            text={'Fire resistance'}
                            value={unitStats.stats.damage_mod_physical}
                        />
                    </SimpleGrid>
                </StatsAccordion>

                <StatsItem
                    icon={moraleIcon}
                    text='Leadership'
                    value={unitStats.stats.morale}
                    maxStats={maxVariables.morale}
                />
                <StatsItem
                    icon={speedIcon}
                    text='Speed'
                    value={unitStats.entity.run_speed.split('.').join('')}
                    maxStats={maxVariables.speed}
                />

                <StatsAccordion
                    icon={attackIcon}
                    text={'Melee attack'}
                    value={unitStats.stats.melee_attack}
                    maxStats={maxVariables.meleeAttack}
                >
                    <SimpleGrid as='ul' gridRowGap='1'>
                        <StatsItem text={'Attack interval'} value={unitStats.melee_damage.melee_attack_interval} />
                        <StatsItem text={'Is high threat'} value={unitStats.is_high_threat} />
                        <StatsItem
                            text={'Splash target size'}
                            value={unitStats.melee_damage.splash_attack_target_size}
                        />
                        <StatsItem
                            text={'Splash max attacks'}
                            value={unitStats.melee_damage.splash_attack_max_attacks}
                        />
                    </SimpleGrid>
                </StatsAccordion>

                <StatsItem
                    icon={defenceIcon}
                    text='Melee defence'
                    value={unitStats.stats.melee_defence}
                    maxStats={maxVariables.defence}
                />
                <StatsItem
                    icon={chargeIcon}
                    text='Charge bonus'
                    value={unitStats.stats.charge_bonus}
                    maxStats={maxVariables.chargeBonus}
                />

                <StatsAccordion
                    icon={damageIcon}
                    text={'Weapon strength'}
                    value={weaponStrengthVal}
                    maxStats={maxVariables.damage}
                >
                    <SimpleGrid as='ul' gridRowGap='1'>
                        <StatsItem icon={baseDamageIcon} text={'Base damage'} value={unitStats.melee_damage.damage} />
                        <StatsItem icon={apDamageIcon} text={'AP damage'} value={unitStats.melee_damage.ap_damage} />
                        <StatsItem
                            icon={infantryBonusIcon}
                            text={'Bonus vs. infantry'}
                            value={unitStats.melee_damage.bonus_v_infantry}
                        />
                        <StatsItem
                            icon={largeBonusIcon}
                            text={'Bonus vs. large'}
                            value={unitStats.melee_damage.bonus_v_large}
                        />
                        <StatsItem
                            text={'Building damage multiplier'}
                            value={unitStats.melee_damage.building_damage_multiplier}
                        />
                    </SimpleGrid>
                </StatsAccordion>

                {unitStats.missile_damage && missileDamageVal && (
                    <StatsAccordion
                        icon={missileDamageIcon}
                        text={'Missile damage'}
                        value={missileDamageVal}
                        maxStats={maxVariables.missileDamage}
                    >
                        <SimpleGrid as='ul' gridRowGap='1'>
                            <StatsItem text={'Base missile damage'} value={unitStats.missile_damage.damage} />
                            <StatsItem text={'AP missile damage'} value={unitStats.missile_damage.ap_damage} />
                            <StatsItem text={'Bonus vs. infantry'} value={unitStats.missile_damage.bonus_v_infantry} />
                            <StatsItem text={'Bonus vs. large'} value={unitStats.missile_damage.bonus_v_large} />
                            <StatsItem
                                text={'Can damage buildings'}
                                value={unitStats.missile_damage.can_damage_buildings}
                            />
                            {unitStats.missile_damage.can_damage_buildings === 'true' && (
                                <StatsItem
                                    text={'Building damage multiplier'}
                                    value={unitStats.missile_damage.building_damage_multiplier}
                                />
                            )}
                        </SimpleGrid>
                    </StatsAccordion>
                )}

                <StatsItem text={'Mass'} value={massVal} />
            </Wrap>

            <Divider p='1' borderColor='crimson.400' />

            <Wrap p='2' border='inherit' borderColor='inherit' borderRadius='3' marginBottom='4'>
                {unitStats.attributes
                    ?.sort((a, b) => a.localeCompare(b))
                    .map(item => (
                        <AttributeItem key={item} item={item as Attributesgroup} />
                    ))}
            </Wrap>
        </Box>
    );
};
