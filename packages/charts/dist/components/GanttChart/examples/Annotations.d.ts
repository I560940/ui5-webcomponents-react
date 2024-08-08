import type { CSSProperties } from 'react';
interface TimingFigureProps {
  arrival: number;
  period: number;
  deadline?: number;
  totalDuration: number;
}
export declare const TimingFigure: ({
  arrival,
  period,
  deadline,
  totalDuration
}: TimingFigureProps) => import('react/jsx-runtime').JSX.Element;
interface InventionProps {
  name: string;
  time: number;
  totalDuration: number;
  rowHeight: number;
  color: CSSProperties['color'];
}
export declare const Invention: ({
  name,
  rowHeight,
  time,
  totalDuration,
  color
}: InventionProps) => import('react/jsx-runtime').JSX.Element;
export {};
