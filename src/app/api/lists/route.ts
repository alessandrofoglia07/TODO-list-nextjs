import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    const data = await req.json();

    const user = await currentProfile();

    if (!user) {
        return new NextResponse('Unauthorized', { status: 401 });
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

export const GET = async (req: NextRequest) => {
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