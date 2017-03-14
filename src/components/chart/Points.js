import React from 'react';
import Point from './Point';

export default class Points extends React.Component{

    render () {
       const { points, dataSetIndex,
                showTooltip, showOnlyMousePoint,
                mouseData,
                hideTooltip, radius, stroke, dotsColor, label, dots, hideLabels } = this.props,
            lastPoint = points[points.length - 1],
            x = lastPoint[0],
            y = lastPoint[1];


        return (

            <g>
                { dots === true ?
                    points.map((p, pi) =>
                        <Point
                            color={dotsColor}
                            showOnlyMousePoint={showOnlyMousePoint}
                            mouseData={mouseData}
                            point={ p }
                            dataSetIndex={ dataSetIndex }
                            showTooltip={ showTooltip }
                            hideTooltip={ hideTooltip }
                            stroke={ stroke }
                            radius={ radius }
                            index={ pi }
                            key={ pi }
                        />)
                    : null }

                { hideLabels !== true ?
                    <text className="LineChart--label" x={ x + 5 } y={ y + 2 } fill={ dotsColor }>{ label }</text>
                    : null }
            </g>
        )
    }

}