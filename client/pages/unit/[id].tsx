import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export default function UnitDetailPage() {
    const router = useRouter();
    const { id } = router.query;
    return <Layout>{id}</Layout>;
}
