import { Color } from '@prisma/client';

export const getRandomColor = () => {
    const colors: Color[] = Object.values(Color);
    return colors[Math.floor(Math.random() * colors.length)];
};
