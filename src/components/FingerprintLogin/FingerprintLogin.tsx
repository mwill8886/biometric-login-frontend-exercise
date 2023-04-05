import React, { useState } from 'react';
import styles from './FingerprintLogin.module.css';
import { FingerprintForm, UsernameForm } from 'components';
import { FingerprintScanner, LoginService, Finger } from 'services';

//
// Models
//
export type FingerprintLoginProps = {
  scanner: FingerprintScanner;
  loginService: LoginService;
};

export type ViewTypes = 'username' | 'fingerprint' | 'success';

//
// Component
//
export const FingerprintLogin: React.FC<FingerprintLoginProps> = (props) => {
  const { loginService, scanner } = props;

  const [view, setView] = useState<ViewTypes>('username');
  const [username, setUsername] = useState<string>('');
  const [fingers, setFingers] = useState<Array<Finger>>([]);
  const [error, setError] = useState<string>('');

  return (
    <div className={styles.loginContainer}>
      {view === 'username' && (
        <UsernameForm
          loginService={loginService}
          setView={setView}
          setUsername={setUsername}
          setFingers={setFingers}
        />
      )}
      {view === 'fingerprint' && (
        <FingerprintForm
          loginService={loginService}
          scanner={scanner}
          username={username}
          fingers={fingers}
          setView={setView}
        />
      )}
      {view === 'success' && (
        <div>
          <h1>Success</h1>
          <p>Congratulations, you have successfully authenticated</p>
          <button onClick={() => setView('username')} className="button-open">
            reset
          </button>
        </div>
      )}
    </div>
  );
};
