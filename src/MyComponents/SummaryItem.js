import React from 'react';

export const SummaryItem = ({ head, amount }) => {
  return (
    <tr>
      <td>{head}</td>
      <td>{amount}</td>
    </tr>
  );
};