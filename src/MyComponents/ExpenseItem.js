import React from 'react';

export const ExpenseItem = ({ expense, index}) => {
  return (
    <tr>
      <th scope="row">{index}</th>
      <td>{expense.date}</td>
      <td>{expense.amount}</td>
      <td>{expense.head}</td>
      <td>{expense.tag}</td>
      <td>{expense.note}</td>
    </tr>
  );
};
