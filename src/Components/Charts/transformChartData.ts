import {BarDatum} from '@nivo/bar';

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

export const transformChartData = (data) => {
    // dimensions are stored in an array in query.dimensions - loop through this for measure strings
    const mockData = {
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
                'suspensions.count': '26',
            },
            {
                'students.current_year_group': 'Year 3',
                'suspensions.start_date.year': '2022-01-01T00:00:00.000',
                'suspensions.start_date': '2022-01-01T00:00:00.000',
                'suspensions.count': '45',
            },
            {
                'students.current_year_group': 'Year 9',
                'suspensions.start_date.year': '2022-01-01T00:00:00.000',
                'suspensions.start_date': '2022-01-01T00:00:00.000',
                'suspensions.count': '12',
            },
            {
                'students.current_year_group': 'Year 10',
                'suspensions.start_date.year': '2022-01-01T00:00:00.000',
                'suspensions.start_date': '2022-01-01T00:00:00.000',
                'suspensions.count': '34',
            },
            {
                'students.current_year_group': 'Year 1',
                'suspensions.start_date.year': '2024-01-01T00:00:00.000',
                'suspensions.start_date': '2024-01-01T00:00:00.000',
                'suspensions.count': '7',
            },
            {
                'students.current_year_group': 'Year 1',
                'suspensions.start_date.year': '2023-01-01T00:00:00.000',
                'suspensions.start_date': '2023-01-01T00:00:00.000',
                'suspensions.count': '8',
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

    const transformedData: BarDatum[] = mockData.data.map((datum) => {
        return {
            [dimension]: datum['students.current_year_group'],
            [measure]: Number(datum['suspensions.count']),
            suspensions_countColor: 'hsl(0, 70%, 50%)',
        };
    });

    return {
        transformedData,
        query: mockData.query,
        annotation: mockData.annotation,
    };
};
