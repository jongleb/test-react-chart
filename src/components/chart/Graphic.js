import React from 'react';
import {XAxis, YAxis} from './Axis';
import Polyline from './Polyline';
import Points from './Points';
import Tooltip from './Tooltip';
import Crosshair from './Crosshair';
import {dayOfYear} from '../../utils/date';

export class Chart extends React.Component {


    constructor(props){
        super(props);

        this.receiveState(props);

        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
    }


    componentWillReceiveProps(props) {
        this.receiveState(props);
    }

    receiveState(props){
        const {data} = props;

        const width = this.props.width || 400,
            height = this.props.height || width * (9 / 16),
            padding = 5,
            maxValue = Math.max.apply(null, data.map(i => i[0])),
            zoom = height / maxValue;

        this.state = {
            width,
            height,
            padding,
            maxValue,
            zoom,
            tooltip: false,
            value: '',
            dataSet: 0,
            index: 0,
            x: 0,
            y: 0,
            cursorX: 0,
            color: '',
            points: data
                .sort((a,b) =>{
                    return new Date(a[1]) - new Date(b[1]);
                })
                .map(pt => {
                    let day = dayOfYear(pt[1]);
                    return [
                        ~~(((width / 365) * day) + padding),
                        ~~(zoom * (maxValue - pt[0]) + padding),
                        pt
                    ]
                }),
            mouseData: {
                last: false,
                first: false,
                prev: null,
                next: null,
                currentIndex: 0,
                current: null
            }
        };
    }

    mouseMove(e){
        const x = e.nativeEvent.offsetX;
        const {points, mouseData} = this.state;
        const current = points
            .reduce((prev, curr) =>
                Math.abs(curr[0] - x) < Math.abs(prev[0] - x) ? curr : prev);

        const currentIndex = points.indexOf(current);

        this.setState(...this.state, {
            updating: false,
            tooltip: true,
            value: current[2],
            x: current[0],
            y: current[1],
            cursorX: x,
            mouseData: {
                ...mouseData,
                last: currentIndex === points.length - 1,
                first: currentIndex === 0,
                prev: points[currentIndex - 1],
                next: points[currentIndex + 1],
                currentIndex,
                current
            }
        });
    }


    showTooltip(point, dataSetIndex, index) {
        this.setState(...this.state, {
            updating: false,
            tooltip: true,
            value: point[2],
            dataSet: dataSetIndex,
            index: index,
            x: point[0],
            y: point[1],
            color: point[3]
        })
    }

    hideTooltip() {
        this.setState({
            tooltip: false,
            value: '',
            dataSet: 0,
            index: 0,
            x: 0,
            y: 0,
            color: ''
        });
    }

    render() {
        const {axis, lines} = this.props,
            radius = this.props.radius || 2,
            dotsColor = this.props.dotsColor || '#000',
            background = this.props.background || '#fff',
            {points, mouseData,
            showOnlyMousePoint, tooltip,
            width, height, padding, maxValue} = this.state;

        return (
            <span className="LineChart" style={{ width: width + 2*padding ,
                background: background}}>
                <svg
                    onMouseMove={this.mouseMove}
                    viewBox={ '0 0 ' + (width + 2*padding) + ' ' + (height + 2*padding) }
                    xmlns="http://www.w3.org/2000/svg"
                    width={this.props.width}
                    style={{padding: '32px'}}
                    height={this.props.height}>
                <g>
                    <XAxis maxValue={ maxValue }
                           padding={ padding }
                           width={ width }
                           showZero={true}
                           lines={lines}
                           height={ height }/>
                    <YAxis axis={ axis }
                           padding={ padding }
                           width={ width }
                           height={ height }/>
                </g>
                <g>
                    <Polyline height={ height }
                              lines={true}
                              padding={ padding }
                              points={points}/>

                    <Points
                        mouseData={mouseData}
                        showOnlyMousePoint={showOnlyMousePoint || true}
                        showTooltip={ this.showTooltip }
                        hideTooltip={ this.hideTooltip }
                        dots={true}
                        dotsColor={dotsColor}
                        points={points}
                        radius={radius}/>
                </g>
                 <Crosshair
                     points={points}
                     y={this.state.y}
                     height={ height }
                     cursorX={this.state.cursorX} />
            </svg>
                {
                    tooltip? <Tooltip
                            mouseData={mouseData}
                            value={ this.state.value }
                            x={ this.state.x }
                            y={ this.state.y + 15 }
                            color={ this.state.color }
                        /> : null
                }

            </span>
        )
    }
}