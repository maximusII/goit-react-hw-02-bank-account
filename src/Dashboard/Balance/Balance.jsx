import React from 'react';
import PropTypes from 'prop-types';
import styles from './Balance.module.css';

const Balance = ({ balance, income, expenses }) => {
  return (
    <section className={styles.balance}>
      <span className={styles.arrowUp}>&#8593;</span>
      <span className={styles.amount}>{income}$</span>
      <span className={styles.arrowDown}>&#8595;</span>
      <span className={styles.amount}>{expenses}$</span>
      <span>Balance: {balance}</span>
    </section>
  );
};

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
  income: PropTypes.number,
  expenses: PropTypes.number,
};

Balance.defaultProps = {
  income: 0,
  expenses: 0,
};

export default Balance;
