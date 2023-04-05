import React from 'react';
import styles from './ProgressBar.module.css';

//
// Models
//
export type ProgressBarProps = {
  totalValue: number;
  currentValue: number;
};

//
// Component
//
export const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  const { totalValue, currentValue } = props;
  const percentComplete = (currentValue / totalValue) * 100;
  return (
    <div className={styles.barContainer}>
      <div
        className={styles.barFill}
        style={{ width: `${percentComplete}%` }}
      />
    </div>
  );
};
