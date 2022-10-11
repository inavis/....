import { Fragment} from "react";
import {
    Line,
    LineChart,
    XAxis,
    YAxis,
    Tooltip,
} from 'recharts';
export function LineChartComponent({value}) {
    return (
        <Fragment>
            <LineChart width={window.innerWidth>1100 ? 800 : window.innerWidth-100} height={400} data={value}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line dataKey="value" />
            </LineChart>
        </Fragment>
    )
}