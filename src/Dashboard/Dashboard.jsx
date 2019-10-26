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
  };

  componentDidMount() {
    const persistedTransactions = localStorage.getItem('transactions');

    if (persistedTransactions) {
      this.setState({ transactions: JSON.parse(persistedTransactions) });
    }
  }

  componentDidUpdate(prevState) {
    const { transactions } = this.state;

    if (prevState.transactions !== transactions) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }

  notifyZeroOrLess = () => {
    toast.error('Введите сумму для проведения операции!');
  };

  notifyNotEnoughMoney = () =>
    toast.error('На счету недостаточно средств для проведения операции!');

  inputClear = e => {
    e.target.parentNode.children.amount.value = '';
  };

  onTrans = amount => {
    const transactionSum = amount.target.parentNode.children.amount.value;
    this.inputClear(amount);
    if (transactionSum <= 0) {
      return this.notifyZeroOrLess();
    }
    if (
      amount.target.name === 'Withdrawal' &&
      transactionSum > this.balance()
    ) {
      return this.notifyNotEnoughMoney();
    }

    const date = new Date().toLocaleString();

    const newTrans = {
      id: shortid.generate(),
      type: `${amount.target.name}`,
      amount: transactionSum,
      date,
    };

    amount.target.name === 'Withdrawal'
      ? this.setState(prevState => ({
          transactions: [...prevState.transactions, newTrans],
        }))
      : this.setState(prevState => ({
          transactions: [...prevState.transactions, newTrans],
        }));

    return transactionSum;
  };

  balance = () => {
    return this.allIncome() - this.allExpenses();
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
    const balance = this.balance();

    const { transactions } = this.state;

    return (
      <div className={styles.dashboard}>
        <Controls onDeposit={this.onTrans} onWithdraw={this.onTrans} />
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
