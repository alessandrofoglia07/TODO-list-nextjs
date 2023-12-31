import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { todoSchema } from '@/lib/schemas/todoSchema';
import { Tag as TagT, List as ListT } from '@prisma/client';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
    const data = await req.json();

    const user = await currentProfile();

    if (!user) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const val = todoSchema.safeParse(data);

    if (!val.success) {
        return new NextResponse(val.error.message, { status: 400 });
    }

    const newTodo = await db.todo.create({
        data: {
            title: data.title,
            content: data.content,
            color: data.color,
            tags: {
                connect: data.tags.map((tag: TagT) => ({ id: tag.id }))
            },
            lists: {
                connect: data.lists.map((list: ListT) => ({ id: list.id }))
            },
            userId: user.id
        }
    });

    return NextResponse.json(newTodo);
};
