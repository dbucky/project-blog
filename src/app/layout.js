import React from 'react';
import { Work_Sans, Spline_Sans_Mono } from 'next/font/google';
import clsx from 'clsx';
import { cookies } from 'next/headers';

import {
  BLOG_TITLE,
  BLOG_DESCRIPTION,
  LIGHT_TOKENS,
  DARK_TOKENS,
} from '@/constants';

import RespectMotionPreference from '@/components/RespectMotionPreference';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './styles.css';

const mainFont = Work_Sans({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family',
});
const monoFont = Spline_Sans_Mono({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family-mono',
});

export const metadata = {
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
};

async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value || 'light';

  return (
    <RespectMotionPreference>
      <html
        lang="en"
        className={clsx(mainFont.variable, monoFont.variable)}
        data-color-theme={theme}
        style={theme === 'light' ? LIGHT_TOKENS : DARK_TOKENS}
      >
        <body>
          <Header theme={theme} />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </RespectMotionPreference>
  );
}

export default RootLayout;
