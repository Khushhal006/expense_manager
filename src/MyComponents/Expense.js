import React from 'react'
import { ExpenseItem } from '../MyComponents/ExpenseItem';

export const Expense = (props) => {
    // const { expenses } = props; // Destructure the prop
    return (
        <div className='container'>
            <h3 className='text-center my-3'>List of Expenses</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Head</th>
                        <th scope="col">Tag</th>
                        <th scope="col">Note</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(props.expenses) && props.expenses.length > 0 ? (
                        props.expenses.map((expense, index) => (
                            <ExpenseItem expense={expense} key={index} index={index + 1} />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No expenses recorded</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    )
}
