import React from 'react';

export default class Polyline extends React.Component{
    render() {
        let { points, lines, area, color} = this.props,
            areaPath = [],	style, fn;


        fn = lines === true ? 'L' : 'R';
        style = {	pointerEvents: 'none' };

        let path = points.map((p, pi) => (pi === 0  ? '' : (pi === 1 ? fn : '')) + p[0] + ',' + p[1]);
        path = 'M' + path.join(' ');

        return (
            <g style={ style }>
                { area === true ? <path d={ areaPath } fill={ color } fillOpacity=".05" /> : null }
                <path d={ path } fill="none"
                      stroke={ '#74a3c7' } strokeWidth={ '2px' } />
            </g>
        )
    }
}
