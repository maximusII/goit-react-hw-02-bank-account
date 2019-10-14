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
        <input type="number" name="amount" />
        <button type="button" onClick={onDeposit}>
          Deposit
        </button>
        <button type="button" onClick={onWithdraw}>
          Withdraw
        </button>
      </section>
    );
  }
}

export default Controls;
