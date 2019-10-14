import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './TransactionHistory.module.css';

class TransactionHistory extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        type: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        date: PropTypes.date.isRequired,
      }),
    ),
  };

  static defaultProps = {
    items: [],
  };

  render() {
    const { items } = this.props;
    return (
      items.length > 0 && (
        <table className={styles.history}>
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.type}</td>
                <td>{item.amount}$</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    );
  }
}

export default TransactionHistory;
