import React from 'react';
import 'font-awesome/css/font-awesome.css';

const TooltipRange = (val1, val2) => val1 > val2?
    <span>
        <i style={{color: 'green', 'paddingLeft': '10px'}}
           className="fa fa fa-sort-asc"/>
         <span style={{color: 'green'}}>{Math.abs(val1 - val2)}</span>
    </span>
    : <span>
        <i
            style={{color: 'red', 'paddingLeft': '10px'}}
            className="fa fa fa-sort-desc"/>
        <span style={{color: 'red'}}>{Math.abs(val1 - val2)}</span>
    </span>;

export default class Tooltip extends React.Component{
    render () {
        let { value, x, y, mouseData } = this.props,
            style;

        style = {
            left: ~~x,
            top: ~~y
        };

        return (
            <span className="LineChart--tooltip" style={ style }>
                {
                    value?
                        <span>
                            <span style={{color: '#989fa8'}}>
                                {
                                    value[1].toLocaleString('ru', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })
                                }
                            </span>
                            <br/>
                            <span>
                                <span>$ {value[0]}</span>
                                {
                                   !mouseData.first ? TooltipRange(value[0], mouseData.prev[2][0]) : null
                                }
                            </span>
                        </span>
                    :null
                }
			</span>
        )
    }
}
