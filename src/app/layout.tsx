import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Navbar from '@/components/navbar/navbar';
import ModalProvider from '@/context/modalContext';

const font = Poppins({
    subsets: ['latin'],
    weight: ['900', '800', '700', '600', '500', '400', '300', '200', '100']
});

export const metadata: Metadata = {
    title: 'Todo App',
    description: 'Todo App built with Next.js'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang='en'>
                <body suppressHydrationWarning className={font.className + ' bg-white'}>
                    <ModalProvider>
                        <Navbar />
                        <main className='fixed right-0 w-[75vw]'>{children}</main>
                    </ModalProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
