import classNames from 'classnames/bind';
import { useState } from 'react';

import Styles from './LoginForm.module.scss';

import { Input } from 'src/components/Input/Input';
import Modal from 'src/components/Modal/Modal';
import { Label } from 'src/components/label/Label';
import { useFirebaseApp } from 'src/config/firebase/config';
import { logInWithEmailAndPassword } from 'src/api/auth/auth';
import { UserForm } from 'src/state/user/types';

interface LoginFormProps {
  setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const cx = classNames.bind(Styles);

export default function LoginForm({ setIsLoginForm, setModal }: LoginFormProps) {
  const [user, setUser] = useState<UserForm>({ email: '', password: '' });
  const { auth } = useFirebaseApp();

  const handleLogIn = () => {
    logInWithEmailAndPassword(auth, user);
    setUser({ email: '', password: '' });
    setModal(false);
  };

  const handleChangeUserField = (newValue: string, fieldName: string) => {
    setUser((user) => ({ ...user, [fieldName]: newValue }));
  };

  return (
    <Modal
      buttons={[
        {
          variant: 'primary',
          title: 'Login',
          handleClick: handleLogIn,
          isDisabled: false,
          style: { boxShadow: 'none', marginRight: '10px' },
        },
        {
          title: 'Cancel',
          handleClick: () => setModal(false),
          variant: 'terthiary',
        },
      ]}
      setCloseModal={() => setModal(false)}
      modalTitle="Log into your account"
    >
      <div className={cx('login')}>
        <div className={cx('login__container')}>
          <div className={cx('input-and-label')}>
            <Label id="login-email" labelFor="login-email-input">
              E-mail
            </Label>
            <Input
              placeholder="Write your E-mail"
              id="login-email"
              type="text"
              value={user.email}
              handleChange={(newValue) => handleChangeUserField(newValue, 'email')}
            />
          </div>
          <div className={cx('input-and-label')}>
            <Label id="login-password" labelFor="login-password-input">
              Password
            </Label>
            <Input
              placeholder="Write your password"
              type="password"
              id="login-password"
              value={user.password}
              handleChange={(newValue) => handleChangeUserField(newValue, 'password')}
            />
          </div>
          <div className={cx('login__statement')}>
            {"Don't have an account? "}
            <span
              className={cx('login__link')}
              onClick={() => {
                setIsLoginForm(false);
                setUser({ email: '', password: '' });
              }}
            >
              Register now.
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
