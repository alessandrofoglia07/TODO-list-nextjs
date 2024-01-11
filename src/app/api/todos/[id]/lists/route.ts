import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { listSchema } from '@/lib/schemas/listSchema';
import { List } from '@prisma/client';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// TODO: fix this
export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
    const data = await req.json();
    const { id } = params;
    const user = await currentProfile();

    if (!user) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const val = z.array(listSchema).safeParse(data);

    if (!val.success) {
        return new NextResponse(val.error.message, { status: 400 });
    }

    const updatedTodo = await db.todo.update({
        where: {
            id
        },
        include: {
            lists: true
        },
        data: {
            lists: {
                set: data.map((list: List) => ({ id: list.id }))
            }
        }
    });

    return NextResponse.json(updatedTodo);
};
