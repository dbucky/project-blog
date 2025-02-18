'use client';
import React from 'react';
import { MotionConfig } from 'framer-motion';

function RespectMotionPreference({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export default RespectMotionPreference;
