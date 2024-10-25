import GridLayout from 'react-grid-layout';
import React from 'react';
import './dashboard.scss';
import {BarChart} from '../Charts/BarChart';
import {useState} from 'react';
import {MoveIcon} from '../../Icons';

type DashboardProps = {
    layoutConfig: string;
};

export const Dashboard = ({layoutConfig}: DashboardProps) => {
    const [viewHeight, setViewHeight] = useState(window.innerHeight);
    const [viewWidth, setViewWidth] = useState(window.innerWidth);

    console.log('height is', viewHeight);

    window.onresize = () => {
        setViewHeight(window.innerHeight);
        setViewWidth(window.innerWidth);
    };
    const layout = JSON.parse(layoutConfig);

    // onresize is doing nothing
    const onResize = (layout, oldLayoutItem, layoutItem, placeholder) => {
        // `oldLayoutItem` contains the state of the item before the resize.
        // You can modify `layoutItem` to enforce constraints.
        console.log('resizing');
        if (layoutItem.h < 3 && layoutItem.w > 2) {
            layoutItem.w = 2;
            placeholder.w = 2;
        }

        if (layoutItem.h >= 3 && layoutItem.w < 2) {
            layoutItem.w = 2;
            placeholder.w = 2;
        }
    };
    return (
        <GridLayout
            className="dashboard"
            //layout={layout}
            cols={12}
            rowHeight={140}
            maxRows={8} //  maxRows is overwritten by the layout to fit the elements, it restricts when dragging elements to an extra row.
            // it's a direct measurement of how many 'h' values from an item can fit on top of eachother
            width={viewWidth}
            height={viewHeight}
            maxWidth={1900}
            onResize={onResize}
            isrResizable={true}
            //droppingItem={{i: 'a', w: 2, h: 2}}
            draggableHandle=".draggable-handle"
        >
            {layout.map((item) => {
                return (
                    <div
                        className="dashboard-item"
                        key={item.i}
                        data-grid={item}
                    >
                        <div className="draggable-handle">
                            <MoveIcon />
                        </div>

                        {item.chartType === 'bar' ? (
                            <BarChart
                                data={
                                    item.dataAlreadyFormatted ? item.data : []
                                }
                            />
                        ) : (
                            item.i
                        )}
                    </div>
                );
            })}
        </GridLayout>
    );
};
