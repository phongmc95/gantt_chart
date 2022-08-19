import React from 'react'
import { Rect, Text, G } from 'react-native-svg'

const Name = props => {
  const {
    index,
    barHeight,
    task,
    onPress,
    textColor
  } = props

  const padding = 4

  const x = 0
  const y = barHeight * index + padding * (index + 1)

  return (
    <G onPressIn={() => onPress(task)}>
      <Text
        fill={textColor}
        stroke={textColor}
        fontSize={15}
        textAnchor="start"
        x={x}
        y={y + (barHeight + 10) / 2}
      >
        {index + 1}. {task.name}
      </Text>
    </G>
  )
}

export default Name
