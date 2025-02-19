'use client';
import React from 'react';
import clsx from 'clsx';
import { Rss, Sun, Moon } from 'react-feather';
import Cookies from 'js-cookie';

import { LIGHT_TOKENS, DARK_TOKENS } from '@/constants';

import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './Header.module.css';

async function Header({ theme, className, ...delegated }) {
  let dynamicTheme = theme;

  function toggleTheme() {
    dynamicTheme = dynamicTheme === 'light' ? 'dark' : 'light';
    const tokens = dynamicTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;
    const styles = [];
    for (const property in tokens) {
      styles.push(`${property}:${tokens[property]}`);
    }
    document.documentElement.style = styles.join(';');
    document.documentElement.dataset.colorTheme = dynamicTheme;
    Cookies.set('theme', dynamicTheme, { expires: 365 });
  }
  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: 'translate(2px, -2px)',
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </button>
        <button className={styles.action} onClick={toggleTheme}>
          {dynamicTheme === 'light' ? (
            <Sun size="1.5rem" />
          ) : (
            <Moon size="1.5rem" />
          )}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
