import React from 'react';
import {
  LoginLayout,
  FingerprintLogin,
  FingerprintLoginProps,
} from 'components';

const App: React.FC<FingerprintLoginProps> = (props) => {
  return (
    <LoginLayout>
      <FingerprintLogin {...props} />
    </LoginLayout>
  );
};

export default App;
