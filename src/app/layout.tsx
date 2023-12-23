import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Todo App',
    description: 'Todo App built with Next.js'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang='en'>
                <body className={inter.className + ' bg-white'}>
                    <Navbar />
                    <main className='fixed right-0 w-[75vw]'>{children}</main>
                </body>
            </html>
        </ClerkProvider>
    );
}
