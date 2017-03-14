import React from 'react';

export default class Crosshair extends React.Component{
    render () {
        const {height, cursorX, points, y} = this.props;

        let  lastPoint = points[points.length - 1],
            x = cursorX > lastPoint[0]? lastPoint[0]: cursorX;

        return <path
            d={`M ${x} ${y} L ${x} ${height}`}
            stroke="#d5d8d9"
            strokeDasharray={5}
            strokeWidth="1px"
        />
    }
}
