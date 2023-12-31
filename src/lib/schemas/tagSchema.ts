import { Color } from '@prisma/client';
import { z } from 'zod';

export const tagSchema = z.object({
    name: z.string().min(1, 'Tag name required').max(20, 'Tag name too long'),
    color: z.nativeEnum(Color)
});

export type TagSchema = z.infer<typeof tagSchema>;
