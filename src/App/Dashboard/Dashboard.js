import React, { Component } from 'react';
import shortid from 'shortid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Dashboard.module.css';
import Controls from './Controls/Controls';
import Balance from './Balance/Balance';
import TransactionHistory from './TransactionHistory/TransactionHistory';

class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
  };

  notifyZeroOrLess = () => {
    toast.error('Введите сумму для проведения операции!');
  };

  notifyNotEnoughMoney = () =>
    toast.error('На счету недостаточно средств для проведения операции!');

  inputClear = e => {
    e.target.parentNode.children.amount.value = '';
  };

  onDeposit = amount => {
    const transactionSum = amount.target.parentNode.children.amount.value;
    this.inputClear(amount);
    if (transactionSum <= 0) {
      return this.notifyZeroOrLess();
    }

    const date = new Date().toLocaleString();

    const newTransDeposit = {
      id: shortid.generate(),
      type: 'Deposit',
      amount: transactionSum,
      date,
    };

    this.setState(prevState => ({
      balance: prevState.balance + +transactionSum,
      transactions: [...prevState.transactions, newTransDeposit],
    }));
    return transactionSum;
  };

  onWithdraw = amount => {
    const transactionSum = amount.target.parentNode.children.amount.value;
    this.inputClear(amount);
    if (transactionSum <= 0) {
      return this.notifyZeroOrLess();
    }
    if (transactionSum > this.state.balance) {
      return this.notifyNotEnoughMoney();
    }

    const date = new Date().toLocaleString();

    const newTransWithdraw = {
      id: shortid.generate(),
      type: 'Withdrawal',
      amount: transactionSum,
      date,
    };

    this.setState(prevState => ({
      balance: prevState.balance - +transactionSum,
      transactions: [...prevState.transactions, newTransWithdraw],
    }));
    return transactionSum;
  };

  allIncome = () => {
    let count = 0;
    this.state.transactions
      .filter(el => el.type === 'Deposit')
      .map(el => el.amount)
      .forEach(el => (count += +el));
    return count;
  };

  allExpenses = () => {
    let count = 0;
    this.state.transactions
      .filter(el => el.type === 'Withdrawal')
      .map(el => el.amount)
      .forEach(el => (count += +el));
    return count;
  };

  render() {
    const allIncome = this.allIncome();
    const allExpenses = this.allExpenses();

    const { transactions, balance } = this.state;

    return (
      <div className={styles.dashboard}>
        <Controls onDeposit={this.onDeposit} onWithdraw={this.onWithdraw} />
        <Balance balance={balance} income={allIncome} expenses={allExpenses} />
        <TransactionHistory items={transactions} />
        <ToastContainer
          position={toast.POSITION.BOTTOM_LEFT}
          autoClose={3000}
        />
      </div>
    );
  }
}

export default Dashboard;
