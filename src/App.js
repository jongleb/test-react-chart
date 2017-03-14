import React, { Component } from 'react';
import './App.css';
import {Chart} from './components/chart/Graphic';
import {DATA} from './stub/data';

class App extends Component {
  render() {
    return (
        <span className="App-intro">
          <Chart
              background={'#f6f7f8'}
              radius={3.5}
              dotsColor={'#78a6c8'}
              axis={['Январь',
                  'Февраль',
                  'Март',
                  'Апрель',
                  'Май',
                  'Июнь',
                  'Июль',
                  'Август',
                  'Сентябрь',
                  'Октябрь',
                  'Ноябрь',
                  'Декабрь'
              ]}
              data={DATA}
              padding={0}
              width={800}
              height={200} />
        </span>
    );
  }
}

export default App;
