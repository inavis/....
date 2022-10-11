import { Fragment } from "react";
import 'chart.js/auto';
import { Doughnut} from "react-chartjs-2";

export function DonutChartComponent({memdata}){
    const options = {
        legend: {
          display: true,
          position: "bottom"
        },
        elements: {
          arc: {
            borderWidth: 0
          }
        }
      };
      const data = {
        maintainAspectRatio: false,
        responsive: false,
        labels: ["free", "used"],
        datasets: [
          {
            data: memdata,
            backgroundColor: ["blue","lightblue"],
            hoverBackgroundColor: ["blue","lightblue"]
          }
        ]
      };
    return(
        <Fragment>
             <Doughnut data={data} options={options} />
        </Fragment>
    )
}