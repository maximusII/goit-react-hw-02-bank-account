import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Controls.module.css';

// eslint-disable-next-line react/prefer-stateless-function
class Controls extends Component {
  static propTypes = {
    onDeposit: PropTypes.func.isRequired,
    onWithdraw: PropTypes.func.isRequired,
  };

  render() {
    const { onDeposit, onWithdraw } = this.props;
    return (
      <section className={styles.controls}>
        <input className={styles.input} type="number" name="amount" />
        <button className={styles.buttons} type="button" onClick={onDeposit}>
          Deposit
        </button>
        <button className={styles.buttons} type="button" onClick={onWithdraw}>
          Withdraw
        </button>
      </section>
    );
  }
}

export default Controls;
