import {BarDatum} from '@nivo/bar';
import {HeatMapDatum, HeatMapSerie} from '@nivo/heatmap';

type Query = {
    limit: number;
    measures: string[];
    dimensions: string[];
    filters: {
        member: string;
        operator: string;
        values: string[];
    }[];
    timeDimensions: {
        dimension: string;
        granularity: string;
    }[];
    timezone: string;
    rowLimit: number;
};

type Data = {
    [key: string]: string | number;
};

type ApiResponse<T> = {
    query: Query;
    data: T[];
    lastRefreshTime: string;
    annotation: {
        measures: {
            [key: string]: {
                title: string;
                shortTitle: string;
                description: string;
                type: string;
                meta: {
                    user_roles: string[];
                };
                drillMembers: string[];
                drillMembersGrouped: {
                    measures: string[];
                    dimensions: string[];
                };
            };
        };
        dimensions: {
            [key: string]: {
                title: string;
                shortTitle: string;
                type: string;
            };
        };
        segments: {};
        timeDimensions: {
            [key: string]: {
                title: string;
                shortTitle: string;
                description: string;
                type: string;
                meta: {
                    user_roles: string[];
                };
            };
        };
    };
    dataSource: string;
    dbType: string;
    extDbType: string;
    external: boolean;
    slowQuery: boolean;
    total: number | null;
};

type ChartType = 'bar' | 'line' | 'heatMap';

type LineData = {
    id: string | number;
    data: Array<{
        x: number | string | Date;
        y: number | string | Date;
    }>;
};

export const transformChartData = <T extends Data>(
    data: ApiResponse<T>,
    chartType: ChartType,
) => {
    // dimensions are stored in an array in query.dimensions - loop through this for measure strings
    const mockData: ApiResponse<Data> = {
        query: {
            limit: 5000,
            measures: ['suspensions.count'],
            dimensions: ['students.current_year_group'],
            filters: [
                {
                    member: 'students.is_current',
                    operator: 'equals',
                    values: ['TRUE'],
                },
            ],
            timeDimensions: [
                {
                    dimension: 'suspensions.start_date',
                    granularity: 'year',
                },
            ],
            timezone: 'UTC',
            rowLimit: 5000,
        },
        data: [
            {
                'students.current_year_group': 'Year 7',
                'suspensions.start_date.year': '2021-01-01T00:00:00.000',
                'suspensions.start_date': '2021-01-01T00:00:00.000',
                'suspensions.count': Math.floor(Math.random() * 10),
            },
            {
                'students.current_year_group': 'Year 8',
                'suspensions.start_date.year': '2022-01-01T00:00:00.000',
                'suspensions.start_date': '2022-01-01T00:00:00.000',
                'suspensions.count': Math.floor(Math.random() * 10),
            },
            {
                'students.current_year_group': 'Year 9',
                'suspensions.start_date.year': '2022-01-01T00:00:00.000',
                'suspensions.start_date': '2022-01-01T00:00:00.000',
                'suspensions.count': Math.floor(Math.random() * 10),
            },
            {
                'students.current_year_group': 'Year 10',
                'suspensions.start_date.year': '2022-01-01T00:00:00.000',
                'suspensions.start_date': '2022-01-01T00:00:00.000',
                'suspensions.count': Math.floor(Math.random() * 10),
            },
            {
                'students.current_year_group': 'Year 11',
                'suspensions.start_date.year': '2024-01-01T00:00:00.000',
                'suspensions.start_date': '2024-01-01T00:00:00.000',
                'suspensions.count': Math.floor(Math.random() * 10),
            },
        ],
        lastRefreshTime: '2024-10-10T15:51:17.003Z',
        annotation: {
            measures: {
                'suspensions.count': {
                    title: 'Suspensions Count',
                    shortTitle: 'Count',
                    description: 'Total count of suspension records.',
                    type: 'number',
                    meta: {
                        user_roles: [
                            'GROUP__BI_VIEWER__VIEW',
                            'GROUP__DATA_ACCESS__VIEW_ALL_INSTITUTIONS',
                        ],
                    },
                    drillMembers: [],
                    drillMembersGrouped: {
                        measures: [],
                        dimensions: [],
                    },
                },
            },
            dimensions: {
                'students.current_year_group': {
                    title: 'Students Current Year Group',
                    shortTitle: 'Current Year Group',
                    type: 'string',
                },
            },
            segments: {},
            timeDimensions: {
                'suspensions.start_date.year': {
                    title: 'Suspensions Start Date',
                    shortTitle: 'Start Date',
                    description: 'The start date of the suspension.',
                    type: 'time',
                    meta: {
                        user_roles: [
                            'GROUP__PERMANENT_EXCLUSIONS__VIEW',
                            'GROUP__PERMANENT_EXCLUSIONS__ADMINISTER',
                        ],
                    },
                },
                'suspensions.start_date': {
                    title: 'Suspensions Start Date',
                    shortTitle: 'Start Date',
                    description: 'The start date of the suspension.',
                    type: 'time',
                    meta: {
                        user_roles: [
                            'GROUP__PERMANENT_EXCLUSIONS__VIEW',
                            'GROUP__PERMANENT_EXCLUSIONS__ADMINISTER',
                        ],
                    },
                },
            },
        },
        dataSource: 'default',
        dbType: 'snowflake',
        extDbType: 'cubestore',
        external: false,
        slowQuery: false,
        total: null,
    };

    const measure = mockData.query.measures[0];
    const dimension = mockData.query.dimensions[0]; // these need to work wth a full array

    // having two entries for a dimensions e.g. 2 abscence statistics for year 1 will only show the first one.
    // it breaks when it hits the second entry

    let transformedData:
        | HeatMapSerie<HeatMapDatum, BarDatum>[]
        | BarDatum[]
        | LineData[] = [];

    switch (chartType) {
        case 'bar':
            transformedData = mockData.data.map((datum) => {
                return {
                    [dimension]: datum[dimension],
                    [measure]: Number(datum[measure]),
                };
            });
            break;
        case 'line':
            transformedData = [
                {
                    id: measure,
                    data: mockData.data.map((datum) => {
                        return {
                            x: datum[dimension],
                            y: Number(datum[measure]),
                        };
                    }),
                },
            ];
            break;
        case 'heatMap':
            transformedData = [
                {
                    id: measure,
                    data: mockData.data.map((datum) => {
                        return {
                            x: datum[dimension],
                            y: Number(datum[measure]),
                        };
                    }),
                },
            ];
            break;
    }

    // goal with this file is to tranform data to the right type for the chart using it, maybe pass the type required or just handle it all in the chart

    return {
        transformedData,
        query: mockData.query,
        annotation: mockData.annotation,
    };
};
