import {Responsive, WidthProvider} from 'react-grid-layout';
import React from 'react';
import './dashboard.scss';
import {BarChart} from '../Charts/BarChart';
import {MoveIcon} from '../../Icons';
import {LineChart} from '../Charts/LineChart';
import {HeatMap} from '../Charts/HeatMap';

const ResponsiveGridLayout = WidthProvider(Responsive);

type DashboardProps = {
    layoutConfig: string;
};

export const Dashboard = ({layoutConfig}: DashboardProps) => {
    const layout = JSON.parse(layoutConfig);
    const {filters} = layout;
    const {chartLayout} = filters;

    return (
        <ResponsiveGridLayout
            className="dashboard"
            breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
            cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
            rowHeight={140}
            maxRows={8} //  maxRows is overwritten by the layout to fit the elements, it restricts when dragging elements to an extra row.
            // it's a direct measurement of how many 'h' values from an item can fit on top of eachother
            maxWidth={1900}
            isResizable={false}
            draggableHandle=".draggable-handle"
            resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
            autosize={false}
            compactType="vertical"
        >
            {filters && (
                <div
                    className="dashboard-filter-panel"
                    data-grid={filters.filterLayout}
                    key={filters.filterName}
                >
                    <span>
                        <input type={'radio'} /> Year 7
                    </span>
                    <span>
                        <input type={'radio'} /> Year 8
                    </span>
                    <span>
                        <input type={'radio'} /> Year 9
                    </span>
                    <span>
                        <input type={'radio'} /> Year 10
                    </span>
                    <span>
                        <input type={'radio'} /> Year 11
                    </span>
                    <span>
                        <input type={'radio'} /> Male
                    </span>
                    <span>
                        <input type={'radio'} /> Female
                    </span>
                </div>
            )}
            {chartLayout.map((item) => {
                return (
                    <div
                        className="dashboard-item"
                        key={item.i}
                        data-grid={item}
                    >
                        <div className="draggable-handle">
                            <MoveIcon />
                        </div>

                        {item.chartType === 'bar' && (
                            <BarChart dataUrl={item.dataUrl} />
                        )}
                        {item.chartType === 'line' && (
                            <LineChart dataUrl={item.dataUrl} />
                        )}
                        {item.chartType === 'heat-map' && (
                            <HeatMap dataUrl={item.dataUrl} />
                        )}
                    </div>
                );
            })}
            {filters.filters && (
                // TODO: the size of the dashboard should be set by looping through the chart layout
                <div
                    data-grid={{i: 'subdash', x: 0, y: 4, w: 8, h: 1}}
                    key="subdash"
                >
                    <div className="draggable-handle">
                        <MoveIcon />
                    </div>
                    <Dashboard layoutConfig={JSON.stringify(filters)} />
                </div>
            )}
        </ResponsiveGridLayout>
    );
};
