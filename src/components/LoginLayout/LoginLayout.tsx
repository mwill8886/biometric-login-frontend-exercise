import React from 'react';
import styles from './LoginLayout.module.css';

export const LoginLayout: React.FC<any> = (props) => {
  const { children } = props;
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.contentContainer}>{children}</div>
    </div>
  );
};
