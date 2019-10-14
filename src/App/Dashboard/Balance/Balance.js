import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Balance.module.css';

// eslint-disable-next-line react/prefer-stateless-function
class Balance extends Component {
  static propTypes = {
    balance: PropTypes.number.isRequired,
    income: PropTypes.func,
    expenses: PropTypes.func,
  };

  static defaultProps = {
    income: 0,
    expenses: 0,
  };

  render() {
    const { balance, income, expenses } = this.props;
    return (
      <section className={styles.balance}>
        <span className={styles.arrowUp}>&#8593;</span>
        <span className={styles.amount}>{income}$</span>
        <span className={styles.arrowDown}>&#8595;</span>
        <span className={styles.amount}>{expenses}$</span>
        <span>Balance: {balance}</span>
      </section>
    );
  }
}

export default Balance;
