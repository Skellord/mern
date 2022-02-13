import { background, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    styles: {
        global: {
            body: {
                fontSize: '16px',
                color: 'white',
            },
            html: {
                height: '100%',
            },
        },
    },
});

export default theme;
