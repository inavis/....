import { Fragment} from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from 'recharts';
export const BarChartComponent = ({value}) => {
    return (
        <Fragment>
            <BarChart width={window.innerWidth>1100 ? 800 : window.innerWidth-100} height={400} data={value}>
                <Bar dataKey="value" fill="green" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </BarChart>
        </Fragment>
    )
}