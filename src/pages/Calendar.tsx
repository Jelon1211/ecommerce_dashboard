import React, { useState } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';

import { scheduleData } from '../data/dummy';
import { Header } from '../components/index';
import ContentWrapper from './ContentWrapper/ContentWrapper';

const PropertyPane = (props: any) => <div className="mt-5">{props.children}</div>;

export const Calendar = () => {
  const [scheduleObj, setScheduleObj] = useState<any>({});

  const change = (args: any) => {
    scheduleObj.selectedDate = args.value;
    scheduleObj.dataBind();
  };

  const onDragStart = (arg: any) => {
    arg.navigation.enable = true;
  };

type ViewDirective = {
  key: any;
  option: any;
}

  return (
    <ContentWrapper>
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Calendar" />
       <ScheduleComponent
        height="650px"
        ref={(schedule) => setScheduleObj(schedule)}
        selectedDate={new Date(2023, 0, 10)}
        eventSettings={{ dataSource: scheduleData }}
        dragStart={onDragStart}
      >
        <ViewsDirective>
        {/* @ts-expect-error */}
          { ['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'].map((item) => <ViewDirective key={item} option={item} />)}
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
       </ScheduleComponent>
      <PropertyPane>
        <table
          style={{ width: '100%', background: 'white' }}
        >
          <tbody>
            <tr style={{ height: '50px' }}>
              <td style={{ width: '100%' }}>
                <DatePickerComponent
                  value={new Date(2023, 0, 10)}
                  showClearButton={false}
                  placeholder="Current Date"
                  floatLabelType="Always"
                  change={change}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </PropertyPane>
    </div>
    </ContentWrapper>
  );
};