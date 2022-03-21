import { Container, Grid } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { mainNavRoutes } from '../utils/routes.util';
import NavLink from './NavLink';

const Nav: FC = () => {
    const { t } = useTranslation('nav');
    return (
        <Container maxW='container.xl' bgColor='blue.900'>
            <Grid templateColumns='repeat(5, 1fr)' gap={6} py='4' px='8' fontWeight={600} textTransform='uppercase'>
                {mainNavRoutes.map(item => (
                    <NavLink name={t(item.name)} href={item.href} key={item.name} />
                ))}
            </Grid>
        </Container>
    );
};

export default Nav;
