import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { listSchema } from '@/lib/schemas/listSchema';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    const data = await req.json();

    const user = await currentProfile();

    if (!user) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const val = listSchema.safeParse(data);

    if (!val.success) {
        return new NextResponse(val.error.message, { status: 400 });
    }

    const newList = await db.list.create({
        data: {
            name: data.name,
            color: data.color,
            userId: user.id
        }
    });

    return NextResponse.json(newList);
};

export const GET = async () => {
    const user = await currentProfile();

    if (!user) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const lists = await db.list.findMany({
        where: {
            userId: user.id
        }
    });

    return NextResponse.json(lists);
};

export const DELETE = async (req: NextRequest) => {
    const user = await currentProfile();
    const data = await req.json();

    if (!user) {
        return new NextResponse(null, { status: 401 });
    }

    const list = await db.list.findUnique({
        where: {
            userId: user.id,
            id: data.id
        }
    });

    if (!list) {
        return new NextResponse('', { status: 404 });
    }

    await db.list.delete({
        where: {
            id: list.id
        }
    });

    return new NextResponse('Deleted', { status: 200 });
};