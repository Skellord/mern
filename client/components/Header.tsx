import { Flex } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import Logo from '../assets/img/WH3_Logo.png';

const Header: FC = () => {
    return (
        <Flex as='header' w='100%' h='56px' bgColor='gray.900' px='3'>
            <Link href={'/'}>
                <a style={{ display: 'flex' }}>
                    <Image src={Logo} width='100px' />
                </a>
            </Link>
        </Flex>
    );
};

export default Header;
