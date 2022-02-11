import { Link } from '@chakra-ui/react';
import { FC } from 'react';

interface Props {
    href: string;
}

const LinkButton: FC<Props> = ({ href, children }) => {
    return (
        <Link padding={'8px 24px'} borderRadius={'16px'} border='1px solid gray' href={href}>
            {children}
        </Link>
    );
};

export default LinkButton;
