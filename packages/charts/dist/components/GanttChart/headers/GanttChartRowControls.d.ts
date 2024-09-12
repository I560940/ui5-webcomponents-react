import React from 'react';
import type { DimensionsState } from '../types/GanttChartTypes.js';
import '@ui5/webcomponents-icons/dist/zoom-out.js';
import '@ui5/webcomponents-icons/dist/zoom-in.js';
import '@ui5/webcomponents-icons/dist/legend.js';
export interface GanttChartRowControlsProps {
  dimensions: DimensionsState;
  resetScroll: () => void;
  height: number;
  onScale: (x: number) => void;
}
export declare const GanttChartRowControls: (props: GanttChartRowControlsProps) => React.JSX.Element;
