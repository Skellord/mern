import { Button, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import Logo from '../assets/img/WH3_Logo.png';

const Header: FC = () => {
    const { locale, asPath } = useRouter();

    return (
        <Flex as='header' w='100%' h='14' bgColor='gray.900' px='3'>
            <Link href={'/'}>
                <a style={{ display: 'flex', marginRight: 'auto' }}>
                    <Image src={Logo} width='100px' alt='logo' />
                </a>
            </Link>
            <Link href={asPath} locale={locale === 'en' ? 'ru' : 'en'}>
                <Button variant='link'>{locale === 'en' ? 'Перевести на русский' : 'Switch to english'}</Button>
            </Link>
        </Flex>
    );
};

export default Header;
