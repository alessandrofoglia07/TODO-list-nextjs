import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const GET = async (_req: Request, { params }: { params: { id: string } }) => {
    const user = await currentProfile();

    if (!user) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params?.id) {
        return new NextResponse('Bad Request', { status: 400 });
    }

    const todo = await db.todo.findUnique({
        where: {
            id: params.id,
            userId: user.id
        }
    });

    return NextResponse.json(todo);
};
