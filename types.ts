import React from 'react';

export interface SlideData {
  id: string;
  title?: string;
  component: React.FC;
  notes: string[];
}

export interface SlideProps {
  isActive: boolean;
}

export interface SyncState {
  currentIndex: number;
  timestamp: number;
}