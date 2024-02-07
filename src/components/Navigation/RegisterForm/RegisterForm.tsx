import classNames from 'classnames/bind';
import { useState } from 'react';

import Styles from './RegisterForm.module.scss';

import { Input } from 'src/components/Input/Input';
import Modal from 'src/components/Modal/Modal';
import { Label } from 'src/components/label/Label';
import { UserForm } from 'src/state/user/types';
import { useFirebaseApp } from 'src/config/firebase/config';
import { registerWithEmailAndPassword } from 'src/api/auth/auth';

const cx = classNames.bind(Styles);

interface RegisterFormProps {
  setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm = ({ setIsLoginForm, setModal }: RegisterFormProps) => {
  const [user, setUser] = useState<UserForm>({ email: '', password: '' });
  const { auth, db } = useFirebaseApp();

  const handleChangeUserField = (newValue: string, fieldName: string) => {
    setUser((user) => ({ ...user, [fieldName]: newValue }));
  };

  const handleRegister = () => {
    registerWithEmailAndPassword(db, auth, user);
    setUser({ email: '', password: '' });
    setModal(false);
  };

  return (
    <Modal
      buttons={[
        {
          variant: 'primary',
          title: 'Register',
          handleClick: handleRegister,
          isDisabled: false,
          style: { boxShadow: 'none', marginRight: '10px' },
        },
        {
          variant: 'primary',
          title: 'Cancel',
          handleClick: () => setModal(false),
        },
      ]}
      setCloseModal={() => setModal(false)}
      modalTitle="Create your account"
    >
      <div className={cx('register')}>
        <div className={cx('register__container')}>
          <div className={cx('input-and-label')}>
            <Label id="register-email" labelFor="register-email-input">
              E-mail
            </Label>
            <Input
              placeholder="Write your E-mail"
              value={user.email}
              handleChange={(newValue) => handleChangeUserField(newValue, 'email')}
              id="register-email"
              type="text"
            />
          </div>
          <div className={cx('input-and-label')}>
            <Label id="register-password" labelFor="register-password-input">
              Password
            </Label>
            <Input
              placeholder="Write your password"
              value={user.password}
              handleChange={(newValue) => handleChangeUserField(newValue, 'password')}
              id="register-password"
              type="password"
            />
          </div>
          <div className={cx('register__statement')}>
            Already have an account? &nbsp;
            <span
              className={cx('register__link')}
              onClick={() => {
                {
                  setIsLoginForm(true);
                  setUser({ email: '', password: '' });
                }
              }}
            >
              Login now.
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RegisterForm;
