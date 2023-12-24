import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    const data = await req.json();

    const user = await currentProfile();

    if (!user) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const newTag = await db.tag.create({
        data: {
            name: data.name,
            color: data.color,
            userId: user.id
        }
    });

    return NextResponse.json(newTag);
};

export const GET = async (req: NextRequest) => {
    const user = await currentProfile();

    if (!user) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const tags = await db.tag.findMany({
        where: {
            userId: user.id
        }
    });

    return NextResponse.json(tags);
};