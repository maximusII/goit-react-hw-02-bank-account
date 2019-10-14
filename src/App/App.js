import React, { Component } from 'react';
import styles from './App.module.css';
import Dashboard from './Dashboard/Dashboard';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Dashboard />
      </div>
    );
  }
}

export default App;
