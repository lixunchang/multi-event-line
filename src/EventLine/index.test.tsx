import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import EventLine from './index';

describe('<EventLine />', () => {
  it('render EventLine with dumi', () => {
    const msg = 'dumi';

    render(
      <EventLine
        events={[{ start: '20220101', title: msg, type: 'test' }]}
        eventTypes={[
          { label: '测试', value: 'test', primaryColor: 'red', secondaryColor: 'yellow' },
        ]}
        lines={[[{ dt: '20220101', value: 100 }], [{ dt: '20220101', rate: 0.1 }]]}
      />,
    );
    console.log('qqqq', screen);
    expect(screen.queryByText(msg)).toBeInTheDocument();
  });
});
