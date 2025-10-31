import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import {TanStackProvider} from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import {ReactNode} from "react";
import "./globals.css";

const roboto = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Created by Denys Mahei'
}

export default function RootLayout({
                                       children,
                                       modal,
                                   }: Readonly<{
    children: ReactNode;
    modal: ReactNode;
}>) {

    return (
        <html lang="en">
        <body className={roboto.variable}>
        <TanStackProvider>
            <div className="wrapper">
                <Header/>
                <main>
                    <div className="container">
                        {children}
                        {modal}
                    </div>
                </main>
                <Footer/>
            </div>
        </TanStackProvider>
        </body>
        </html>
    );
}
