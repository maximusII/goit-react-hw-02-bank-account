import React from 'react';
import PropTypes from 'prop-types';
import styles from './Controls.module.css';

const Controls = ({ onDeposit, onWithdraw }) => (
  <section className={styles.controls}>
    <input className={styles.input} type="number" name="amount" />
    <button
      className={styles.buttons}
      type="button"
      name="Deposit"
      onClick={onDeposit}
    >
      Deposit
    </button>
    <button
      className={styles.buttons}
      type="button"
      name="Withdrawal"
      onClick={onWithdraw}
    >
      Withdraw
    </button>
  </section>
);

Controls.propTypes = {
  onDeposit: PropTypes.func.isRequired,
  onWithdraw: PropTypes.func.isRequired,
};

export default Controls;
