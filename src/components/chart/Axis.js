import React from 'react';
import {getArrayByLength} from '../../utils/array'

export default class Axis extends React.Component {
    render() {
        const {x1, x2, y2, y1, textX, textY, text, showLine} = this.props;
        return (
            <g>
                {
                    showLine?
                        <line
                            x1={ x1 } y1={ y1 }
                            x2={ x2 } y2={ y2 }
                            stroke="#eaeaea"
                            strokeWidth="1px"
                        /> : null
                }
                <text className="LineChart--axis"
                      x={ textX }
                      y={ textY }
                      textAnchor="end">
                    {text || null}
                </text>
            </g>
        )
    }
}


export class XAxis extends React.Component {
    render() {
        const {padding, showZero} = this.props,
            lines = getArrayByLength(this.props.lines || 4),
            row = this.props.height / lines.length,
            maxValue = ~~(this.props.maxValue / lines.length),
            startY = ~~(lines.length * row + padding) + .5;
        return (
            <g>

                { lines.map((l, li) => {
                    let y = ~~(l * row + padding) + .5;
                    return (
                        <Axis
                            showLine={true}
                            textX={ padding - 10 }
                            textY={ y + 2 }
                            key={l}
                            text={maxValue * (lines.length - li)}
                            x1={ padding } y1={ y }
                            x2={ this.props.width } y2={ y }/>
                    )
                })}
                {
                    showZero?
                        <Axis
                            showLine={true}
                            textX={ padding - 10 }
                            textY={startY + 2 }
                            key={'start'}
                            text={'0'}
                            x1={ padding } y1={startY}
                            x2={ this.props.width } y2={ startY }/> : null
                }

            </g>
        )
    }
}

export class YAxis extends React.Component {
    render() {
        const months = getArrayByLength(12);
        const padding = this.props.padding,
            lines = months,
            row = this.props.width / months.length,
            height = this.props.height + padding,
            axis = this.props.axis;

        return (
            <g>
                { lines.map((l, li) => {
                    let x = ~~((li + 1) * row + padding) + .5;
                    return (
                    <Axis
                        showLine={false}
                        textX={ x }
                        textY={ height + 15 }
                        key={li}
                        text={ axis[li % axis.length] }
                        x1={ x } y1={ padding }
                        x2={ x } y2={ height }/>
                    )
                })}

            </g>
        )
    }
}

