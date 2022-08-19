import { StyleSheet, View } from 'react-native';
import React from 'react';
import GanttChart from './src/Gantt'

const task = [
  {
    _id: '1',
    name: 'Khảo sát yêu tính năng',
    start: 32400,
    end: 39600,
    progress: 1,
  },
  // {
  //   _id: '2',
  //   name: 'Xây dựng tài liệu phân tích thiết kế chức năng',
  //   start: new Date('2022-08-15').getTime(),
  //   end: new Date('2022-08-31').getTime(),
  //   progress: 1,
  // },
  // {
  //   _id: '3',
  //   name: 'Thống nhất tài liệu phân tích thiết kế chức năng',
  //   start: new Date('2022-08-23').getTime(),
  //   end: new Date('2022-08-31').getTime(),
  //   progress: 1,
  // },
  // {
  //   _id: '4',
  //   name: 'Phát triển các tính năng tablet',
  //   start: new Date('2022-09-01').getTime(),
  //   end: new Date('2022-09-30').getTime(),
  //   progress: 1,
  // },
  // {
  //   _id: '5',
  //   name: 'Phát triển Hệ thống báo cáo biểu đồ',
  //   start: new Date('2022-09-08').getTime(),
  //   end: new Date('2022-10-08').getTime(),
  //   progress: 1,
  // },
  // {
  //   _id: '6',
  //   name: 'Phát triển tính năng theo dõi công việc Kỹ thuật viên',
  //   start: new Date('2022-10-01'),
  //   end: new Date('2022-10-31'),
  //   progress: 1,
  // },
  // {
  //   _id: '7',
  //   name: 'Phát triển tính năng Quản lý chương trình khuyến mại',
  //   start: new Date('2022-10-15'),
  //   end: new Date('2022-11-15'),
  //   progress: 1,
  // },
  // {
  //   _id: '8',
  //   name: 'Phát triển các tính năng nâng cấp CSKH và Dịch vụ',
  //   start: new Date('2022-11-01'),
  //   end: new Date('2022-11-23'),
  //   progress: 1,
  // },
  // {
  //   _id: '9',
  //   name: 'UAT Chức năng xây dựng',
  //   start: new Date('2022-10-01'),
  //   end: new Date('2022-11-30'),
  //   progress: 1,
  // },
  // {
  //   _id: '10',
  //   name: 'Đào tạo bộ phận dịch vụ và CSKH VAD',
  //   start: new Date('2022-11-23'),
  //   end: new Date('2022-11-30'),
  //   progress: 1,
  // },
  // {
  //   _id: '11',
  //   name: 'Hỗ trợ golive',
  //   start: new Date('2022-12-01'),
  //   end: new Date('2022-12-31'),
  //   progress: 1,
  // },
];

export default function App() {
  return (
    <View style={{ paddingVertical: 10 }}>
      <GanttChart
        data={task}
        numberOfTicks={24.5}
        onPressTask={task => alert(task.name)}
        gridMin={0}
        gridMax={96400}
        colors={{
          barColorPrimary: '#0c2461',
          barColorSecondary: '#4a69bd',
          textColor: '#fff',
          backgroundColor: '#82ccdd',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
