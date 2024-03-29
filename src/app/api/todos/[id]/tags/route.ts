import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { tagSchema } from '@/lib/schemas/tagSchema';
import { Tag } from '@prisma/client';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const GET = async (_req: Request, { params }: { params: { id: string } }) => {
    const { id } = params;
    const user = await currentProfile();

    if (!user) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const tags = await db.tag.findMany({
        where: {
            todos: {
                some: {
                    id
                }
            }
        }
    });

    return NextResponse.json(tags);
};

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
    const data = await req.json();
    const { id } = params;
    const user = await currentProfile();

    if (!user) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const val = z.array(tagSchema).safeParse(data);

    if (!val.success) {
        return new NextResponse(val.error.message, { status: 400 });
    }

    const updatedTodo = await db.todo.update({
        where: {
            id
        },
        include: {
            tags: true
        },
        data: {
            tags: {
                set: data.map((tag: Tag) => ({ id: tag.id }))
            }
        }
    });

    return NextResponse.json(updatedTodo);
};
