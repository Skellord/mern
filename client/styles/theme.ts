import { background, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    fonts: {
        body: 'Simonetta',
    },
    styles: {
        global: {
            main: {
                fontSize: '16px',
                color: 'white',
                height: '100vh',
            },
        },
    },
});

export default theme;
