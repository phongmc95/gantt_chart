import {Dimensions, PanResponder, ScrollView, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Svg, {G} from 'react-native-svg';
import * as d3 from 'd3';
import Axis from './Axis';
import Bar from './Bar';
import Task from './Task';
import Name from './TaskName';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const barHeight = 22;

export default function Gantt({
    data,
    numberOfTicks,
    onPressTask,
    gridMax,
    gridMin,
    colors: {barColorPrimary, barColorSecondary, backgroundColor, textColor},
}) {
    const chartRef = useRef(null);
    const [isMoving, setIsMoving] = useState(false);
    const [top, setTop] = useState(0);
    const [initialY, setInitialY] = useState(0);
    const [initialTop, setInitialTop] = useState(0);
    const [panResponder, setPanResponder] = useState();
    const timeAxisHeight = height / 20;
    const [extent, setExtent] = useState([]);

  useEffect(() => {
    let dateTimes = data.reduce((acc, cur) => {
      acc.push(cur.start, cur.end);
      return acc;
    }, []);

    let extent = d3.extent([...dateTimes, gridMin, gridMax]);

    setExtent(extent);
  }, []);

  useEffect(() => {
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: event => {
        const {touches} = event.nativeEvent;

        if (touches.length === 1) {
          const [{locationY}] = touches;
          processTouch(locationY);
        }
      },
      onPanResponderRelease: () => setIsMoving(false),
    });

    setPanResponder(panResponder);
  }, []);

  const processTouch = y => {
    if (!isMoving) {
      setIsMoving(true);
      setInitialY(y);
      setInitialTop(top);
    } else {
      const dy = y - initialY;
      setTop(Math.min(initialTop + dy, 0));

      // react-native-svg - setNativeProps({ matrix: [scaleX, skewY, skewX, scaleY, translateX, translateY] })
      chartRef.setNativeProps({matrix: [1, 0, 0, 1, 0, top]});
    }
  };

  const calcXScale = (domain) => {
    return d3.scaleTime().domain(domain).range([0, width]);
  };
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{backgroundColor, width: '20%'}}>
        <Svg height={height} width={width}>
          <Task
            height={height}
            width={width}
            x={0}
            y={timeAxisHeight}
            ticks={1}
            textColor={textColor}
          />
        </Svg>
        <Svg
          height={height - timeAxisHeight}
          width={width}
          style={{
            backgroundColor: 'transparent',
            position: 'absolute',
            top: timeAxisHeight + 1.5,
            left: 10,
          }}>
          <G x={0} y={top} ref={chartRef}>
            {data.map((task, index) => {
              return (
                <Name
                  onPress={onPressTask}
                  key={task._id}
                  index={index}
                  barHeight={barHeight}
                  task={task}
                  textColor={textColor}
                />
              );
            })}
          </G>
        </Svg>
      </View>
      <ScrollView
        style={{backgroundColor}}
        {...panResponder?.panHandlers}
        horizontal={true}>
        <Svg height={height} width={width}>
          <Axis
            height={height}
            width={width}
            x={0}
            y={timeAxisHeight}
            ticks={numberOfTicks}
            textColor={textColor}
            scale={calcXScale(extent)}
          />
        </Svg>

        <Svg
          height={height - timeAxisHeight}
          width={width}
          style={{
            backgroundColor: 'transparent',
            position: 'absolute',
            top: timeAxisHeight + 1.5,
            left: 0,
          }}>
          <G x={0} y={top} ref={chartRef}>
            {data.map((task, index) => {
              return (
                <Bar
                  onPress={onPressTask}
                  key={task._id}
                  index={index}
                  startVal={task.start}
                  endVal={task.end}
                  barHeight={barHeight}
                  task={task}
                  primaryColor={barColorPrimary}
                  secondaryColor={barColorSecondary}
                  textColor={textColor}
                  scale={calcXScale(extent)}
                />
              );
            })}
          </G>
        </Svg>
      </ScrollView>
    </View>
  );
}
