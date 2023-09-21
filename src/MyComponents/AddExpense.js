import React, { useState } from 'react';
import Axios from 'axios';

export const AddExpense = ( {fetchData} ) => {
  const url = "http://127.0.0.1:5000/add-expense";
  const [data, setData] = useState({
    date: "",
    amount: "",
    head: "",
    tag: "",
    note: ""
  });

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }

  function submit(e) {
    e.preventDefault();
    // Continue here with submission
    Axios.post(url, {
      date: data.date,
      amount: data.amount,
      head: data.head,
      tag: data.tag,
      note: data.note
    })
      .then(res => {
        console.log(res.data);
        // fetchData();
        // Optionally, you can reset the form fields after successful submission
        setData({
          date: "",
          amount: "",
          head: "",
          tag: "",
          note: ""
        });
        fetchData();
      });
  }

  return (
    <div className='container my-3'>
      <h3 className='text-center'>Add Expense</h3>
      <form onSubmit={submit}>
        <div className='row'>
          <div className="mb-3 col-4">
            <label htmlFor="date" className="form-label">Date</label>
            <input onChange={(e) => handle(e)} type="date" className="form-control" id="date" aria-describedby="emailHelp" value={data.date} />
          </div>
          <div className="mb-3 col-4">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input onChange={(e) => handle(e)} type="number" className="form-control" id="amount" value={data.amount} />
          </div>
          <div className="mb-3 col-4">
            <label htmlFor="head" className="form-label">Head</label>
            <input onChange={(e) => handle(e)} type="text" className="form-control" id="head" value={data.head} />
          </div>
        </div>
        <div className='row'>
          <div className="mb-3 col-6">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input onChange={(e) => handle(e)} type="text" className="form-control" id="tag" value={data.tag} />
          </div>
          <div className="mb-3 col-6">
            <label htmlFor="note" className="form-label">Note</label>
            <input onChange={(e) => handle(e)} type="text" className="form-control" id="note" value={data.note} />
          </div>
        </div>
        <button type="submit" className="btn btn-success">Add</button>
      </form>
    </div>
  );
};
