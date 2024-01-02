import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { listSchema } from '@/lib/schemas/listSchema';
import { Color } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

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

export const PATCH = async (req: NextRequest) => {
    const user = await currentProfile();
    const data = await req.json();

    if (!user) {
        return new NextResponse(null, { status: 401 });
    }

    const schema = z.object({
        id: z.string(),
        name: z.string(),
        color: z.nativeEnum(Color)
    });

    const val = schema.safeParse(data);

    if (!val.success) {
        return new NextResponse(val.error.message, { status: 400 });
    }

    const list = await db.list.update({
        where: {
            userId: user.id,
            id: data.id
        },
        data: {
            name: data.name,
            color: data.color
        }
    });

    return NextResponse.json(list);
};