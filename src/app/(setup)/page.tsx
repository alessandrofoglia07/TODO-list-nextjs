import { initialProfile } from '@/lib/initialProfile';

interface Props {
    searchParams?: Record<string, string | string[] | undefined>;
}

const SetupPage = async ({ searchParams }: Props) => {
    const profile = await initialProfile();

    const { list, tag } = searchParams || {};

    return <div>{JSON.stringify(profile)}</div>;
};

export default SetupPage;
