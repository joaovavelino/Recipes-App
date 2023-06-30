import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import AppContext from '../../context/Context/AppContext';
import frontCooking from '../../images/frontCooking.png';
import { PASSWORD_LENGTH } from '../../helpers/constants';
import './Login.css';

export default function Login() {
  const { login, setLogin } = useContext(AppContext);
  const [disabled, setDisabled] = useState(true);
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const loginCheck = login.includes('@');
    const emailCheck = login.includes('.com');
    const passwordCheck = password.length > PASSWORD_LENGTH;
    if (loginCheck && emailCheck && passwordCheck) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [login, password]);

  const saveOnStorage = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: login }));
    setRedirect(true);
  };

  if (redirect) {
    return (<Redirect to="/foods" />);
  }

  return (
    <div className="container">
      <img
        className="logo"
        src={ frontCooking }
        alt="Logo"
      />
      <form>
        <div>
          <input
            className="input"
            type="email"
            data-testid="email-input"
            name="email"
            placeholder="e-mail"
            value={ login }
            onChange={ ({ target: { value } }) => setLogin(value) }
          />
          <input
            className="input"
            type="password"
            data-testid="password-input"
            name="password"
            placeholder="password"
            onChange={ ({ target: { value } }) => setPassword(value) }
          />
        </div>
        <div>
          <button
            className="button"
            type="button"
            data-testid="login-submit-btn"
            id="login-submit-btn"
            disabled={ disabled }
            onClick={ saveOnStorage }
          >
            Enter
          </button>
        </div>
      </form>
    </div>
  );
}
