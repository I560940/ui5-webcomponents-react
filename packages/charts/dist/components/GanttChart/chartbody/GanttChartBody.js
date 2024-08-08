import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useStylesheet } from '@ui5/webcomponents-react-base';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { MAX_BODY_WIDTH, SCALE_FACTOR } from '../util/constants.js';
import { GanttChartBodyCtx } from '../util/context.js';
import { classNames, styleData } from '../util/GanttChart.module.css.js';
import { GanttChartGrid } from './GanttChartGrid.js';
import { GanttChartLayer } from './GanttChartLayer.js';
import { GanttChartRowGroup } from './GanttChartRow.js';
import { GanttChartConnections } from './TimelineConnections.js';
const GanttChartBody = ({
  dataset,
  width,
  rowHeight,
  numOfItems,
  totalDuration,
  isDiscrete,
  annotations,
  showAnnotation,
  showConnection,
  showTooltip,
  unit,
  start,
  unscaledWidth,
  onScale,
  valueFormat,
  resetScroll
}) => {
  useStylesheet(styleData, GanttChartBody.displayName);
  const tooltipRef = useRef(null);
  const bodyRef = useRef(null);
  const scaleExpRef = useRef(0);
  const [displayArrows, setDisplayArrows] = useState(false);
  useEffect(() => {
    const bodyElement = bodyRef.current;
    bodyElement?.addEventListener('wheel', onMouseWheelEvent);
    return () => {
      bodyElement?.removeEventListener('wheel', onMouseWheelEvent);
    };
  }, []);
  const style = {
    width: `${width}px`,
    height: `${numOfItems * rowHeight}px`
  };
  const showTooltipOnHover = (mouseX, mouseY, label, startTime, duration, color, isMilestone) => {
    tooltipRef.current?.onHoverItem(mouseX, mouseY, label, startTime, duration, color, isMilestone);
  };
  const hideTooltip = () => tooltipRef.current?.onLeaveItem();
  const onMouseWheelEvent = (evt) => {
    evt.preventDefault();
    if (evt.deltaY < 0) {
      // Only scale up if scaled width will not exceed MAX_BODY_WIDTH
      const msrWidth = bodyRef.current.getBoundingClientRect().width;
      if (msrWidth * SCALE_FACTOR < MAX_BODY_WIDTH) {
        scaleExpRef.current++;
      }
    } else {
      // Only scale down if scaled width will not be less than original
      // width
      if (scaleExpRef.current > 0) {
        resetScroll();
        scaleExpRef.current--;
      }
    }
    onScale(Math.pow(SCALE_FACTOR, scaleExpRef.current));
  };
  const showArrows = () => setDisplayArrows(true);
  return _jsxs('div', {
    'data-component-name': 'GanttChartBody',
    ref: bodyRef,
    className: classNames.chartBody,
    style: style,
    children: [
      _jsx(GanttChartLayer, {
        name: 'GanttChartGridLayer',
        ignoreClick: true,
        children: _jsx(GanttChartGrid, {
          isDiscrete: isDiscrete,
          numOfRows: numOfItems,
          totalDuration: totalDuration,
          rowHeight: rowHeight,
          width: width,
          unscaledWidth: unscaledWidth
        })
      }),
      showConnection && displayArrows
        ? _jsx(GanttChartLayer, {
            name: 'GanttChartConnectionLayer',
            ignoreClick: true,
            children: _jsx(GanttChartConnections, {
              dataSet: dataset,
              width: width,
              rowHeight: rowHeight,
              bodyRect: bodyRef.current?.getBoundingClientRect()
            })
          })
        : null,
      _jsx(GanttChartLayer, {
        name: 'GanttChartRowsLayer',
        ignoreClick: true,
        children: _jsx(GanttChartRowGroup, {
          dataset: dataset,
          rowHeight: rowHeight,
          totalDuration: totalDuration,
          timelineStart: start,
          showTooltip: showTooltipOnHover,
          hideTooltip: hideTooltip,
          postRender: showArrows
        })
      }),
      showAnnotation && annotations != null
        ? _jsx(GanttChartLayer, {
            name: 'GanttChartAnnotationLayer',
            isAnnotation: true,
            ignoreClick: true,
            children: _jsx(GanttChartBodyCtx.Provider, { value: { chartBodyWidth: width }, children: annotations })
          })
        : null,
      showTooltip ? _jsx(GanttChartTooltip, { ref: tooltipRef, unit: unit, valueFormat: valueFormat }) : null
    ]
  });
};
GanttChartBody.displayName = 'GanttChartBody';
const GanttChartTooltip = forwardRef(function GanttChartTooltip({ unit, valueFormat }, ref) {
  const [state, setState] = useState({
    x: 0,
    y: 0,
    label: '',
    visible: false,
    startTime: 0,
    duration: 0,
    color: 'black',
    isMilestone: false
  });
  const divRef = useRef(null);
  const popupRef = useRef(null);
  useStylesheet(styleData, 'GanttChartTooltip');
  const onHoverItem = (mouseX, mouseY, label, startTime, duration, color, isMilestone) => {
    const { x, y, width, height } = divRef.current?.getBoundingClientRect();
    // Adjust the x and y position of the tooltip popover in order to try
    // to prevent it from being cut off by the bounds of the parent div.
    const offSetX = mouseX - x;
    const offSetY = mouseY - y;
    const xPos = offSetX < width - 80 ? offSetX : offSetX - 120;
    const yPos = offSetY < height - 70 ? offSetY : offSetY - 70;
    setState({ x: xPos, y: yPos, label, visible: true, startTime, duration, color, isMilestone });
  };
  const onLeaveItem = () => {
    setState({ ...state, visible: false });
  };
  useImperativeHandle(ref, () => ({
    onHoverItem: onHoverItem,
    onLeaveItem: onLeaveItem
  }));
  return _jsx('div', {
    'data-component-name': 'GanttChartTooltipContainer',
    className: classNames.tooltipContainer,
    ref: divRef,
    children: state.visible
      ? _jsxs('span', {
          'data-component-name': 'GanttChartTooltip',
          className: classNames.tooltip,
          ref: popupRef,
          style: {
            insetInlineStart: state.x,
            insetBlockStart: state.y
          },
          children: [
            _jsx('span', { className: classNames.tooltipLabel, children: _jsx('strong', { children: state.label }) }),
            _jsx('span', { className: classNames.tooltipColorBar, style: { backgroundColor: state.color } }),
            _jsxs('span', {
              children: ['Start: ', valueFormat != null ? valueFormat(state.startTime) : state.startTime, unit]
            }),
            state.isMilestone
              ? null
              : _jsxs('span', {
                  children: ['Duration: ', valueFormat != null ? valueFormat(state.duration) : state.duration, unit]
                }),
            _jsxs('span', {
              children: [
                'End:',
                ' ',
                valueFormat != null ? valueFormat(state.startTime + state.duration) : state.startTime + state.duration,
                unit
              ]
            })
          ]
        })
      : null
  });
});
GanttChartTooltip.displayName = 'GanttChartTooltip';
export { GanttChartBody };
