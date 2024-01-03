import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { tagSchema } from '@/lib/schemas/tagSchema';
import { Color } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const POST = async (req: NextRequest) => {
    const data = await req.json();

    const user = await currentProfile();

    if (!user) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const val = tagSchema.safeParse(data);

    if (!val.success) {
        return new NextResponse(val.error.message, { status: 400 });
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

export const GET = async () => {
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

export const DELETE = async (req: NextRequest) => {
    const user = await currentProfile();
    const data = await req.json();

    if (!user) {
        return new NextResponse(null, { status: 401 });
    }

    const tag = await db.tag.findUnique({
        where: {
            userId: user.id,
            id: data.id
        }
    });

    if (!tag) {
        return new NextResponse('', { status: 404 });
    }

    await db.tag.delete({
        where: {
            id: tag.id
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

    const tag = await db.tag.update({
        where: {
            userId: user.id,
            id: data.id
        },
        data: {
            name: data.name,
            color: data.color
        }
    });

    return NextResponse.json(tag);
};