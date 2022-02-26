import {
    Box,
    Flex,
    Heading,
    Text,
    Wrap,
    WrapItem,
    Progress,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Center,
    Divider,
    VStack,
} from '@chakra-ui/react';
import { FC } from 'react';
import { UnitWithStats } from '../types/units.types';
import Image from 'next/image';
import { BASE_URL } from '../api/api';

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

interface UnitCardProps {
    unitStats: UnitWithStats;
}

interface StatsItemProps {
    title: string;
    text?: string;
    progress?: number;
}

const StasItem: FC<StatsItemProps> = ({ title, text, progress }) => {
    return (
        <WrapItem justifyContent='space-between' w='100%'>
            <Text>{title}</Text>
            <Flex as='span' alignItems='center'>
                <Text marginRight='2'>{text}</Text>
                {progress && <Progress colorScheme='blackAlpha' w='50px' h='12px' value={progress} />}
            </Flex>
        </WrapItem>
    );
};

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
                        <WrapItem color={item.state === 'positive' ? 'green.400' : 'red.400'} alignItems='flex-end'>
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

            <Wrap p='4' border='inherit' borderColor='inherit' borderRadius='3' marginBottom='4'>
                <WrapItem w='100%' justifyContent='center'>
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

                <Accordion as='li' w='100%' allowToggle>
                    <AccordionItem border='none'>
                        <AccordionButton justifyContent='space-between' w='100%' p='0' _focus={{ boxShadow: 'none' }}>
                            <Text>Armour</Text>
                            <Flex as='span' alignItems='center'>
                                <Text marginRight='2'>{unitStats.stats.armour.split('_').at(-1)}</Text>
                                <Progress colorScheme='blackAlpha' w='50px' h='12px' value={50} />
                            </Flex>
                        </AccordionButton>
                        <AccordionPanel as='ul' paddingRight='0'>
                            <StasItem title='Parry chance' text={shieldVal} />
                            <StasItem title='Ward save' text={unitStats.stats.damage_mod_all} />
                            <StasItem title={'Physical resistance'} text={unitStats.stats.damage_mod_physical} />
                            <StasItem title={'Missile resistance'} text={unitStats.stats.damage_mod_missile} />
                            <StasItem title={'Magic resistance'} text={unitStats.stats.damage_mod_magic} />
                            <StasItem title={'Fire resistance'} text={unitStats.stats.damage_mod_physical} />
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>

                <StasItem title='Leadership' text={unitStats.stats.morale} progress={50} />
                <StasItem title='Speed' text={unitStats.entity.run_speed.split('.').join('')} progress={50} />

                <Accordion as='li' w='100%' allowToggle>
                    <AccordionItem border='none'>
                        <AccordionButton justifyContent='space-between' w='100%' p='0' _focus={{ boxShadow: 'none' }}>
                            <Text>Melee attack</Text>
                            <Flex as='span' alignItems='center'>
                                <Text marginRight='2'>{unitStats.stats.melee_attack}</Text>
                                <Progress colorScheme='blackAlpha' w='50px' h='12px' value={50} />
                            </Flex>
                        </AccordionButton>
                        <AccordionPanel as='ul' paddingRight='0'>
                            <StasItem title={'Attack interval'} text={unitStats.melee_damage.melee_attack_interval} />
                            <StasItem title={'Is high threat'} text={unitStats.is_high_threat} />
                            <StasItem
                                title={'Splash target size'}
                                text={unitStats.melee_damage.splash_attack_target_size}
                            />
                            <StasItem
                                title={'Splash max attacks'}
                                text={unitStats.melee_damage.splash_attack_max_attacks}
                            />
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>

                <StasItem title='Melee defence' text={unitStats.stats.melee_defence} progress={50} />
                <StasItem title='Charge bonus' text={unitStats.stats.charge_bonus} progress={50} />

                <Accordion as='li' w='100%' allowToggle>
                    <AccordionItem border='none'>
                        <AccordionButton justifyContent='space-between' w='100%' p='0' _focus={{ boxShadow: 'none' }}>
                            <Text>Weapon strength</Text>
                            <Flex as='span' alignItems='center'>
                                <Text marginRight='2'>{weaponStrengthVal}</Text>
                                <Progress colorScheme='blackAlpha' w='50px' h='12px' value={50} />
                            </Flex>
                        </AccordionButton>
                        <AccordionPanel as='ul' paddingRight='0'>
                            <StasItem title={'Base damage'} text={unitStats.melee_damage.damage} />
                            <StasItem title={'AP damage'} text={unitStats.melee_damage.ap_damage} />
                            <StasItem title={'Bonus vs. infantry'} text={unitStats.melee_damage.bonus_v_infantry} />
                            <StasItem title={'Bonus vs. cavalry'} text={unitStats.melee_damage.bonus_v_cavalry} />
                            <StasItem title={'Bonus vs. large'} text={unitStats.melee_damage.bonus_v_large} />
                            <StasItem title={'Building damage'} text={unitStats.melee_damage.building_damage} />
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>

                {unitStats.missile_damage && (
                    <Accordion as='li' w='100%' allowToggle>
                        <AccordionItem border='none'>
                            <AccordionButton
                                justifyContent='space-between'
                                w='100%'
                                p='0'
                                _focus={{ boxShadow: 'none' }}
                            >
                                <Text>Missile damage</Text>
                                <Flex as='span' alignItems='center'>
                                    <Text marginRight='2'>{missileDamageVal}</Text>
                                    <Progress colorScheme='blackAlpha' w='50px' h='12px' value={50} />
                                </Flex>
                            </AccordionButton>
                            <AccordionPanel as='ul' paddingRight='0'>
                                <StasItem title={'Base missile damage'} text={unitStats.missile_damage.damage} />
                                <StasItem title={'AP missile damage'} text={unitStats.missile_damage.ap_damage} />
                                <StasItem
                                    title={'Bonus vs. infantry'}
                                    text={unitStats.missile_damage.bonus_v_infantry}
                                />
                                <StasItem title={'Bonus vs. cavalry'} text={unitStats.missile_damage.bonus_v_cavalry} />
                                <StasItem title={'Bonus vs. large'} text={unitStats.missile_damage.bonus_v_large} />
                                <StasItem
                                    title={'Can damage buildings'}
                                    text={unitStats.missile_damage.can_damage_buildings}
                                />
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                )}

                <StasItem title={'Mass'} text={massVal} />
            </Wrap>

            <Wrap p='2' border='inherit' borderColor='inherit' borderRadius='3' marginBottom='4'>
                {unitStats.stats.attribute_group
                    .split('_')
                    ?.slice(1)
                    ?.map(item => {
                        return <WrapItem w='100%'>{item}</WrapItem>;
                    })}
            </Wrap>
        </Box>
    );
};
