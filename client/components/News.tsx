import { Box, Heading, Button, Text, Flex, Grid } from '@chakra-ui/react';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Slider, { Settings } from 'react-slick';

import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';
import 'slick-carousel/slick/slick.css';

const katarinaSrc = 'img/totalwarwarhammer3.jpg';
const khornSrc = 'img/menu_image_1.jpg';
const kislevSrc = 'img/menu_image_2.jpg';
const battleSrc = 'img/menu_image_3.jpg';

interface Slide {
    image: string;
    title: string;
    titleRu: string;
    text?: string;
    textRu?: string;
    href?: string;
    hrefText?: string;
}

const slides: Slide[] = [
    {
        image: katarinaSrc,
        title: 'Release site alpha version',
        titleRu: 'Выход альфа версии сайта',
        text: 'The alpha version of the site has been released',
        textRu: 'Состоялся выход альфа версии сайта',
        href: '/releases',
        hrefText: 'toReleases',
    },
    {
        image: khornSrc,
        title: 'Patch 1.1 Preview',
        titleRu: 'Превью патча 1.1',
        text: 'The developers shared what changes will be affected in the next patch',
        textRu: 'Разработчики поделились, какие изменения будут затронуты в следующем патче',
        href: 'https://www.totalwar.com/blog/dev-diary-1-1-20220318/',
        hrefText: 'toNews',
    },
    {
        image: kislevSrc,
        title: 'List of races available for viewing ',
        titleRu: 'Список рас, доступный для просмотра',
        text: 'Complete (almost) list of units of each faction from TWW',
        textRu: 'Полный (почти) список юнитов каждой фракции из TWW',
        href: '/factions',
        hrefText: 'follow',
    },
    {
        image: battleSrc,
        title: 'The ALT+Tab Crash fixes Steam Beta Branch',
        titleRu: 'Исправление ALT+Tab crash в бета версии игры',
        text: 'Available Now: The ALT+Tab Crash Steam Beta Branch',
        textRu: 'Уже доступно исправления ALT+Tab crash в бета версии игры',
        href: 'https://www.totalwar.com/blog/wh3-steam-beta-20220322/',
        hrefText: 'toNews',
    },
];

const Slide: FC<Slide & { locale: 'ru' | 'en' }> = ({ image, title, titleRu, href, hrefText, locale }) => {
    const { t } = useTranslation('common');
    return (
        <Box
            pos='relative'
            w='1280px'
            h='580px'
            boxShadow='inset -2px 0px 19px 2px #000000'
            _before={{
                content: '""',
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                zIndex: '1',
                boxShadow: 'inset -2px 0px 40px 10px #000000',
            }}
            bgImage={`url(${image})`}
        >
            <Box pos='absolute' top='50%' left='20' transform='translateY(-50%)' zIndex='docked'>
                <Heading size='lg' mb='4' textTransform='uppercase'>
                    {locale === 'ru' ? titleRu : title}
                </Heading>
                {href && (
                    <Link href={href} passHref>
                        <Button
                            p='5'
                            variant='outline'
                            rightIcon={<ArrowForwardIcon />}
                            borderRadius='none'
                            borderWidth='2px'
                            textTransform='uppercase'
                            _hover={{
                                color: 'blue.800',
                                background: 'gray.300',
                                borderColor: 'blue.800',
                            }}
                        >
                            {hrefText ? t(hrefText) : 'To example'}
                        </Button>
                    </Link>
                )}
            </Box>
        </Box>
    );
};

const SlideSmall: FC<Slide & { locale: 'ru' | 'en' }> = ({ image, text, textRu, title, titleRu, locale }) => {
    const enLocale = locale === 'en';
    return (
        <Grid gridTemplateRows='100px 1fr' h='200px' w='200px'>
            <Box w='200px' h='100px' bgImage={`url(${image})`} bgSize='cover' />
            <Flex flexDirection='column' bgColor='blackAlpha.700' p='2'>
                <Heading as='h4' size='sm' mb='1' lineHeight='1'>
                    {enLocale ? title : titleRu}
                </Heading>
                {text && (
                    <Text size='sm' lineHeight='1'>
                        {enLocale ? text : textRu}
                    </Text>
                )}
            </Flex>
        </Grid>
    );
};

export const News = () => {
    const { locale } = useRouter();
    const loc = locale === 'ru' ? 'ru' : 'en';
    const [nav1, setNav1] = useState<any>();
    const [nav2, setNav2] = useState<any>();

    const mainSliderProps: Settings = {
        arrows: false,
        asNavFor: nav2,
    };

    const secondSliderProps: Settings = {
        arrows: false,
        slidesToShow: 3,
        infinite: true,
        asNavFor: nav1,
        focusOnSelect: true,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    const onClickNext = () => {
        nav1.slickNext();
    };

    const onClickPrev = () => {
        nav1.slickPrev();
    };

    return (
        <Box w='1280px' h='580px' mx='-4' mt='-4' pos='relative' overflow='hidden'>
            <Slider ref={slider1 => setNav1(slider1)} {...mainSliderProps}>
                {slides.map(item => (
                    <Slide
                        image={item.image}
                        locale={loc}
                        title={item.title}
                        titleRu={item.titleRu}
                        key={item.title}
                        text={item.text}
                        textRu={item.textRu}
                        href={item.href}
                        hrefText={item.hrefText}
                    />
                ))}
            </Slider>
            <Box pos='absolute' right='50px' top='60%' zIndex={10} w='720px'>
                <Slider ref={slider2 => setNav2(slider2)} {...secondSliderProps}>
                    {slides.map(item => (
                        <SlideSmall
                            image={item.image}
                            locale={loc}
                            title={item.title}
                            titleRu={item.titleRu}
                            key={item.title}
                            text={item.text}
                            textRu={item.textRu}
                            href={item.href}
                            hrefText={item.hrefText}
                        />
                    ))}
                </Slider>
                <Flex pos='absolute' top='-12' left='50%' transform='translateX(-50%)'>
                    <Button
                        borderRadius='none'
                        colorScheme='blackAlpha'
                        h='10'
                        w='10'
                        mr='2'
                        onClick={() => onClickPrev()}
                    >
                        <ArrowBackIcon />
                    </Button>
                    <Button borderRadius='none' colorScheme='blackAlpha' h='10' w='10' onClick={() => onClickNext()}>
                        <ArrowForwardIcon />
                    </Button>
                </Flex>
            </Box>
        </Box>
    );
};
