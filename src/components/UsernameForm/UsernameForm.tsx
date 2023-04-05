import React from 'react';
import styles from './UsernameForm.module.css';
import { LoginService, Finger } from 'services';
import { ReactComponent as UserIcon } from 'assets/icon-user.svg';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ViewTypes } from 'components';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

//
// Models
//
export type UsernameFormProps = {
  loginService: LoginService;
  setView: (view: ViewTypes) => void;
  setUsername: (username: string) => void;
  setFingers: (fingers: Array<Finger>) => void;
};

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
});

type Inputs = {
  username: string;
};

//
// Component
//
export const UsernameForm: React.FC<UsernameFormProps> = (props) => {
  const { loginService, setView, setUsername, setFingers } = props;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await loginService.lookupUser({ username: data.username });

    if (response.exists) {
      setUsername(data.username);
      setFingers(response.enrolledFingers);

      // advance to next step
      setView('fingerprint');
    } else {
      setError('username', {
        type: 'manual',
        message: 'Invalid entry please try again.',
      });
    }
  };

  return (
    <div>
      <UserIcon className="icon" />
      <p className="header">
        Please submit your <strong>username</strong> to initiate the
        authentication process
      </p>
      <hr className="divider" />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputWrapper}>
          <label className={styles.label} htmlFor="username">
            Username
          </label>
          <input
            id="username"
            className={styles.input}
            type="text"
            {...register('username', { required: true })}
          />
          <div className={styles.error}>{errors?.username?.message}</div>
        </div>

        <div className={styles.buttonWrapper}>
          <button className="button-contained" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
