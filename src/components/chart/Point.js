import React from 'react';

export default class Point extends React.Component{

    mouseEnter () {
        this.props.showTooltip(this.props.point, this.props.dataSetIndex, this.props.index)
    }


    mouseLeave () {
        this.props.hideTooltip()
    }


    render () {
        const { point, stroke, radius, mouseData, index , color, showOnlyMousePoint } = this.props,
            x = point[0],
            y = point[1];

        return (!showOnlyMousePoint || (showOnlyMousePoint
        && mouseData.currentIndex === index))? <circle
            cx={ x }
            cy={ y }
            r={ radius }
            fill={color}
            strokeWidth={ stroke }
            stroke={ '#ffffff' }
            onMouseEnter={() => this.mouseEnter()}
            onMouseLeave={() =>this.mouseLeave()} /> : null
    }

}
