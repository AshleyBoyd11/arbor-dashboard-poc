import {ResponsiveBar} from '@nivo/bar';
import React from 'react';
import {transformChartData} from './transformChartData';
type BarChartProps = {
    dataUrl: string;
};
export const BarChart = ({dataUrl}: BarChartProps) => {
    // TODO: replace this with a fetch
    const data = dataUrl;
    // transformChartdata is returning the same thing right now
    const {transformedData, query, annotation} = transformChartData(data);
    const keys = query.measures;
    const indexBy = query.dimensions[0];
    const xAxisLabel = annotation.dimensions[indexBy].title;
    const yAxisLabel = annotation.measures[keys[0]].title;

    return (
        <ResponsiveBar
            data={transformedData}
            keys={keys}
            indexBy={indexBy} // not sure if multi index is available
            margin={{top: 50, right: 130, bottom: 50, left: 60}}
            padding={0.3}
            valueScale={{type: 'linear'}}
            indexScale={{type: 'band', round: true}}
            colors={{scheme: 'nivo'}}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
            ]}
            fill={[
                {
                    match: {
                        id: 'fries',
                    },
                    id: 'dots',
                },
                {
                    match: {
                        id: 'sandwich',
                    },
                    id: 'lines',
                },
            ]}
            borderColor={{
                from: 'color',
                modifiers: [['darker', 1.6]],
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: xAxisLabel,
                legendPosition: 'middle',
                legendOffset: 32,
                truncateTickAt: 0,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: yAxisLabel,
                legendPosition: 'middle',
                legendOffset: -40,
                truncateTickAt: 0,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [['darker', 1.6]],
            }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={(e) =>
                e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
            }
            onClick={(e) => console.log(e)}
        />
    );
};
