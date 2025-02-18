'use client';
import React from 'react';
import clsx from 'clsx';
import { Play, Pause, RotateCcw } from 'react-feather';
import { motion } from 'framer-motion';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  const id = React.useId();

  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [selectedColor, setSelectedColor] = React.useState(COLORS[0]);
  // reset | running | paused
  const [status, setStatus] = React.useState('reset');

  React.useEffect(() => {
    if (status != 'running') {
      return;
    }

    const intervalId = setInterval(() => {
      setTimeElapsed((currentTimeElapsed) => {
        const nextTimeElapsed = currentTimeElapsed + 1;
        setSelectedColor(COLORS[nextTimeElapsed % COLORS.length]);
        return nextTimeElapsed;
      });
    }, 1000);

    return () => {
      clearTimeout(intervalId);
    };
  }, [status]);

  function handlePlay() {
    setStatus('running');
  }

  function handlePause() {
    setStatus('paused');
  }

  function handleReset() {
    setStatus('reset');
    setTimeElapsed(0);
    setSelectedColor(COLORS[0]);
  }

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  layoutId={`${id}-outline`}
                  className={styles.selectedColorOutline}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          {status !== 'running' && (
            <button onClick={handlePlay}>
              <Play />
              <VisuallyHidden>Play</VisuallyHidden>
            </button>
          )}
          {status === 'running' && (
            <button onClick={handlePause}>
              <Pause />
              <VisuallyHidden>Pause</VisuallyHidden>
            </button>
          )}
          <button onClick={handleReset}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
