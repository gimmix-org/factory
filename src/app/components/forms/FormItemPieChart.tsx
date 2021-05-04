import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { Data } from 'react-minimal-pie-chart/types/commonTypes';

const FormItemPieChart = ({
  label,
  description,
  data
}: {
  label: string;
  description: string;
  data: Data;
}) => {
  const total = data.reduce<number>((acc, cur) => cur.value + acc, 0);
  return (
    <div className="form-item">
      <label>{label}</label>
      <div className="description">{description}</div>

      <div className="preview">
        <div className="table">
          {data.map((item, i) => (
            <div
              key={i}
              className="table-item"
              style={{ backgroundColor: item.color }}
            >
              <div className="table-item-title">{item.title}</div>
              <div className="table-item-value">
                {Math.round((100 * (100 * item.value)) / total) / 100}%
              </div>
            </div>
          ))}
        </div>
        <div className="chart">
          <PieChart
            animate
            data={data}
            label={({ dataEntry }) =>
              `${dataEntry.title}: ${
                Math.round(dataEntry.percentage * 100) / 100
              }%`
            }
            radius={100}
            labelPosition={30}
            labelStyle={{
              fontSize: '4',
              fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`
            }}
          />
        </div>
      </div>
      <style jsx>{`
        label {
          margin-bottom: 5px;
          font-weight: 500;
          font-size: 18px;
          display: block;
        }
        .description {
          margin-bottom: 10px;
          font-size: 14px;
          color: #777;
          line-height: 1.4em;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol';
        }
        .preview {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 20px;
        }
        .table {
          min-width: 0;
          overflow: hidden;
        }
        .table-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          border-bottom: 1px solid #ccc;
        }
        .table-item:last-of-type {
          border-bottom: none;
        }
        .table-item-value {
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,
            Courier, monospace;
          font-variant-numeric: tabular-nums;
          font-size: 14px;
        }
        .chart {
        }
      `}</style>
    </div>
  );
};

export default FormItemPieChart;
