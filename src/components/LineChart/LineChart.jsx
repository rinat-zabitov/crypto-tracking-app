import { useEffect, useState } from 'react';
import './LineChart.css';
import Chart from 'react-google-charts';
export const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([['Year', 'Sales']]);

  useEffect(() => {
    let dataCopy = [['Year', 'Sales']];
    if (historicalData.prices) {
      historicalData.prices.map(price =>
        dataCopy.push([
          `${new Date(price[0]).toLocaleDateString().slice(0, -5)}`,
          price[1],
        ])
      );
      setData(dataCopy);
    }
  }, [historicalData]);

  return <Chart chartType="LineChart" data={data} height="100%" legendToggle />;
};
