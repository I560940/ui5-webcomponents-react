import { FlexBox, Icon, Slider, Button } from '@ui5/webcomponents-react';
import React, { useEffect, useState } from 'react';
import type { DimensionsState } from '../types/GanttChartTypes.js';
import { CONTROLS_ROW_HEIGHT, SCALE_FACTOR } from '../util/constants.js';
import { useStyles } from '../util/styles.js';
import '@ui5/webcomponents-icons/dist/zoom-out.js';
import '@ui5/webcomponents-icons/dist/zoom-in.js';
import '@ui5/webcomponents-icons/dist/legend.js';

export interface GanttChartZoomSliderProps {
  dimensions: DimensionsState;
  resetScroll: () => void;
  onScale: (x: number) => void;
  onLegendClick: (event: React.MouseEvent) => void;
}

export const GanttChartZoomSlider = (props: GanttChartZoomSliderProps) => {
  const { onScale } = props;
  const { onLegendClick } = props;
  const [sliderValue, setSliderValue] = useState(0);
  // TODO: consts to be exported to constants.ts
  const minValue = 0;
  const maxValue = 100;
  const step = 10;

  const classes = useStyles();

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  const decreaseValue = () => {
    if (sliderValue > minValue) {
      setSliderValue(sliderValue - step);
    }
  };

  const increaseValue = () => {
    if (sliderValue < maxValue) {
      setSliderValue(sliderValue + step);
    }
  };
  useEffect(() => {
    let calculatedValue = Math.pow(SCALE_FACTOR, sliderValue);
    if (calculatedValue < 1) {
      calculatedValue = 1;
    }
    onScale(calculatedValue);
  }, [onScale, sliderValue]);

  const handleClick = (event: React.MouseEvent) => {
    onLegendClick(event);
  };

  return (
    <FlexBox justifyContent="End" style={{ height: CONTROLS_ROW_HEIGHT }}>
      <FlexBox alignItems="Center" style={{ marginRight: '24px' }}>
        <Icon name="zoom-out" onClick={decreaseValue} style={{ cursor: 'pointer' }} />
        <Slider
          className={classes.slider}
          value={sliderValue}
          onInput={handleSliderChange}
          onChange={handleSliderChange}
          min={minValue}
          max={maxValue}
        />
        <Icon name="zoom-in" onClick={increaseValue} style={{ cursor: 'pointer' }} />
      </FlexBox>
      <FlexBox alignItems="Center" style={{ marginRight: '12px' }}>
        <Button icon="legend" design="Transparent" onClick={handleClick} />
      </FlexBox>
    </FlexBox>
  );
};
