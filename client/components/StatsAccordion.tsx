import React, { FC } from 'react';
import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Flex, Progress, Text } from '@chakra-ui/react';
import { valueResolver } from '../utils/unitStats.util';
import Image, { StaticImageData } from 'next/image';

import plusIcon from '../assets/img/parchment_header_max.png';
import minusIcon from '../assets/img/parchment_header_min.png';

interface StatsAccordion {
    icon: StaticImageData;
    text: string;
    value: string;
    maxStats: number;
    additionalIcon?: StaticImageData;
    additionalIcons?: string[];
}

export const StatsAccordion: FC<StatsAccordion> = ({
    icon,
    text,
    value,
    maxStats,
    additionalIcon,
    additionalIcons,
    children,
}) => {
    return (
        <Accordion as='li' w='100%' allowToggle>
            <AccordionItem border='none'>
                {({ isExpanded }) => (
                    <>
                        <AccordionButton
                            justifyContent='space-between'
                            pos='relative'
                            w='100%'
                            p='0'
                            bg='gradient.stats'
                            _hover={{ background: 'auto' }}
                            _focus={{ boxShadow: 'none' }}
                        >
                            <Box position='absolute' top='2px' left='-30px'>
                                {isExpanded ? (
                                    <Image src={plusIcon} width={25} height={25} alt='plus' />
                                ) : (
                                    <Image src={minusIcon} width={25} height={25} alt='minus' />
                                )}
                            </Box>

                            <Flex>
                                <Image src={icon} width={22} height={22} alt='atck_type' />
                                <Text marginLeft='2'>{text}</Text>
                            </Flex>

                            <Flex as='span' alignItems='center'>
                                {additionalIcon && (
                                    <Image src={additionalIcon} width={16} height={16} alt='atck_type' />
                                )}
                                {additionalIcons &&
                                    additionalIcons.map(src => (
                                        <Image
                                            key={src}
                                            src={src}
                                            loader={() => src}
                                            width={24}
                                            height={24}
                                            alt='atck_type'
                                            unoptimized
                                        />
                                    ))}
                                <Text marginRight='2'>{value}</Text>
                                <Progress
                                    colorScheme='yellow'
                                    w='50px'
                                    h='12px'
                                    value={valueResolver(parseInt(value, 10), maxStats)}
                                    border='2px solid #433d3d'
                                    bgColor='black'
                                />
                            </Flex>
                        </AccordionButton>
                        <AccordionPanel paddingRight='0'>{children}</AccordionPanel>
                    </>
                )}
            </AccordionItem>
        </Accordion>
    );
};
