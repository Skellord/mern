import { FC } from 'react';
import { Box, Text, Link, Tooltip, Center } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import semiCircleUrl from '../assets/img/unit_card_semicircle.png';
import semiCircleRorUrl from '../assets/img/unit_card_semicircle_renown.png';
import borderImage from '../assets/img/panel_back_frame.png';
import { isRorUnit } from '../utils/rorUnits.util';

interface Props {
    name: string;
    imgSrc: string;
    href: string;
    icon: string;
    localName: string;
}

export const UnitCardMini: FC<Props> = ({ name, imgSrc, href, icon, localName }) => {
    const link = `/unit/${href}`;
    const isUnitRor = isRorUnit(name);
    return (
        <NextLink href={link} as={link}>
            <Link marginInlineStart='0 !important'>
                <Tooltip hasArrow label={localName} fontSize='xl'>
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
                                placeholder='blur'
                                blurDataURL={'/img/placeholder.png'}
                                alt='type'
                                unoptimized
                            />
                        </Box>

                        <Box
                            position='absolute'
                            bottom='4px'
                            h='40px'
                            w='100%'
                            bgImage={`url(${isUnitRor ? semiCircleRorUrl.src : semiCircleUrl.src})`}
                            bgSize='cover'
                            bgPosition='50%, 0%'
                            bgRepeat='no-repeat'
                        >
                            <Box w='22px' h='22px' pos='absolute' bottom='0' left='50%' transform='translateX(-50%)'>
                                <Image
                                    loader={() => icon}
                                    src={icon}
                                    width={22}
                                    height={22}
                                    placeholder='empty'
                                    unoptimized
                                    alt='circle'
                                />
                            </Box>
                        </Box>
                    </Center>
                </Tooltip>
            </Link>
        </NextLink>
    );
};
