import React from 'react'
import { G, Line, Text } from 'react-native-svg'
import moment from 'moment'

const Task = props => {
    const { x, y, width, height, ticks, textColor } = props
    const endX = x + width
    const endY = y

    // Calculate tick points
    let tickPoints = []
    let TICK_SIZE = width / 35
    let TICKS_EVERY = Math.floor(width / (ticks - 1))

    let iterator = x
    while (iterator <= endX) {
        tickPoints.push(iterator)
        iterator += TICKS_EVERY
    }


    return (
        <G>
            <Line
                stroke={textColor}
                strokeWidth="3"
                x1={x}
                x2={endX}
                y1={y}
                y2={endY}
            />


            <Line
                key={`h2-${1}`}
                stroke={textColor}
                strokeWidth="1"
                x1={1}
                y1={y}
                x2={1}
                y2={height}
            />

            <Text
                key={`t-${1}`}
                fill={textColor}
                stroke={textColor}
                fontSize={15}
                textAnchor={'start'}
                x={1}
                y={y - 0.5 * TICK_SIZE}
            >
                {'   '}{'Công việc'}
            </Text>
        </G>
    )
}

export default Task
