import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './TransactionHistory.module.css';

class TransactionHistory extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        type: PropTypes.string.isRequired,
        amount: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
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
          <thead className={styles.head}>
            <tr>
              <th className={styles.column}>TRANSACTION</th>
              <th className={styles.column}>AMOUNT</th>
              <th className={styles.column}>DATE</th>
            </tr>
          </thead>
          <tbody className={styles.body}>
            {items.map(item => (
              <tr key={item.id}>
                <td className={styles.column}>{item.type}</td>
                <td className={styles.column}>{item.amount}$</td>
                <td className={styles.column}>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    );
  }
}

export default TransactionHistory;
