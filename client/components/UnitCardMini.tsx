import { FC } from 'react';
import { Box, Text, Link } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';

interface Props {
    name: string;
    imgSrc: string;
    href: string;
}

export const UnitCardMini: FC<Props> = ({ name, imgSrc, href }) => {
    const link = `/unit/${href}`;
    return (
        <NextLink href={link} as={link}>
            <Link>
                <Box flexBasis='60px' flexWrap='wrap' position='relative' borderRadius='4px' overflow='hidden'>
                    <Image loader={() => imgSrc} src={imgSrc} width={60} height={130} placeholder='empty' unoptimized />
                    <Text
                        position='absolute'
                        bottom='4'
                        w='60px'
                        fontSize='sm'
                        lineHeight='1'
                        px='2px'
                        textShadow='3px 3px 3px #000'
                    >
                        {name}
                    </Text>
                </Box>
            </Link>
        </NextLink>
    );
};
