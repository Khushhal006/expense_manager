import React, { useState, useEffect } from 'react';
import { SummaryItem } from './SummaryItem';

export const ExpenseSummary = () => {
  const [summary, setSummary] = useState({ Head: [], Tag: [] });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/summary');
      const jsonData = await response.json();
      setSummary(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='container my-3'>
      <h3 className='text-center my-3'>Summary of Expenses</h3>
      <div className="row">
        <div className="col-6">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Head</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(summary.Head) && summary.Head.length > 0 ? (
                summary.Head.map((summaryItem, index) => (
                  <SummaryItem head={summaryItem[0]} amount={summaryItem[1]}/>
                ))
              ) : (
                <tr>
                  <td className="text-center" colSpan="2">Head Summary Unavailable</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="col-6">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Tag</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(summary.Tag) && summary.Tag.length > 0 ? (
                summary.Tag.map((summaryItem, index) => (
                  <SummaryItem head={summaryItem[0]} amount={summaryItem[1]}/>
                ))
              ) : (
                <tr>
                  <td className="text-center" colSpan="2">Tag Summary Unavailable</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
