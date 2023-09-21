import './App.css';
import Header from "./MyComponents/Header";
import {Expense} from './MyComponents/Expense';
import {AddExpense} from './MyComponents/AddExpense';
import { ExpenseSummary } from './MyComponents/ExpenseSummary';
import React, {useEffect, useState} from 'react';

function App() {

  const [expenses, setExpenses] = useState([])
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try{
      const response = await fetch('http://127.0.0.1:5000/view-expenses')
      const jsonData = await response.json();
      setExpenses(jsonData)
    }
    catch(error){
      console.error('Error fetching data:', error);
    }
  }

  // const onEdit = (expense) => {
  //   console.log("I am onEdit of ", expense);
    
  //   setExpenses(expenses.filter((e) => {
  //     return e !== expense;
  //   }));
  // }

  // const [expenses, setExpense] = useState([
  //   {
  //     date: "19/09/2023",
  //     amount: "1000",
  //     head: "travel",
  //     tag: "office",
  //     note: "dummy note"
  //   },
  //   {
  //     date: "18/09/2023",
  //     amount: "2000",
  //     head: "travel",
  //     tag: "office",
  //     note: "dummy note"
  //   },
  //   {
  //     date: "15/09/2023",
  //     amount: "2000",
  //     head: "travel",
  //     tag: "office",
  //     note: "dummy note"
  //   },
  // ]);
  return (
    <>
    <Header/>
    <AddExpense fetchData={fetchData}/>
    <Expense expenses={expenses}/> {/* onEdit={onEdit} */}
    <ExpenseSummary/>
    </>
  );
}

export default App;
