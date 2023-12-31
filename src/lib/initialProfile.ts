import { currentUser, redirectToSignIn } from '@clerk/nextjs';
import { db } from './db';
import { currentProfile } from './currentProfile';

export const initialProfile = async () => {
    const loggedIn = await currentProfile();
    if (loggedIn) return loggedIn;

    const user = await currentUser();
    if (!user) return redirectToSignIn();

    const profile = await db.user.findUnique({
        where: {
            userId: user.id
        }
    });

    if (profile) return profile;

    const newProfile = await db.user.create({
        data: {
            userId: user.id,
            email: user.emailAddresses[0].emailAddress,
            username: user.username || user.emailAddresses[0].emailAddress
        }
    });

    return newProfile;
};
