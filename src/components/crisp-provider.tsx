"use client";

import { CrispChat } from './crisp-chat';

export const CrispProvider = () => {
  console.log('CrispProvider', 'key not set');
  return <CrispChat />;
}
