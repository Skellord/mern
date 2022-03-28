import { Button, Flex, Icon, Link } from '@chakra-ui/react';
import Image from 'next/image';
import Nextlink from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { HiTranslate } from 'react-icons/hi';

import Logo from '../assets/img/WH3_Logo.png';
import Nav from './Nav';

const Header: FC = () => {
    const { locale, asPath } = useRouter();

    return (
        <Flex as='header' w='100%' h='20' bgColor='gray.900' px='3' pos='relative' zIndex='base'>
            <Nav />
            <Flex px='3' pos='absolute' top='0' left='0' justifyContent='space-between' w='100%' h='100%' zIndex='-1'>
                <Nextlink href={'/'}>
                    <Link display='flex' alignItems='center'>
                        <Image src={Logo} width={100} height={56} alt='logo' />
                    </Link>
                </Nextlink>
                <Nextlink href={asPath} passHref locale={locale === 'en' ? 'ru' : 'en'}>
                    <Button variant='link' pl='6' pr='6'>
                        <Icon as={HiTranslate} mr='3' />
                        {locale === 'en' ? 'Перевести на русский' : 'Switch to english'}
                    </Button>
                </Nextlink>
            </Flex>
        </Flex>
    );
};

export default Header;
