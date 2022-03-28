import { Container, Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { mainNavRoutes } from '../utils/routes.util';
import NavLink from './NavLink';

const Nav: FC = () => {
    const { t } = useTranslation('nav');
    return (
        <Container maxW='container.xl'>
            <Flex h='100%' w='100%' py='4' px='8' fontWeight={600} textTransform='uppercase' alignItems='center'>
                {mainNavRoutes.map(item => (
                    <NavLink name={t(item.name)} href={item.href} key={item.name} />
                ))}
            </Flex>
        </Container>
    );
};

export default Nav;
