import React, { useState, useEffect, useContext } from 'react';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { MyContext } from '../components/common/kanban/selectedBoard';

import './form.css';
import { registration } from '../api/api_user';

const RegisterPage = () => {
  const { isAuth, authUser, realLogin, realLogout, realReg } =
    useContext(MyContext);

  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    // resetField - reset поля (хорошо подходит для формы авторизации!)
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    reset();
    setIsSubmitSuccessful(false);
  }, [isSubmitSuccessful]);

  // redirect
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/kanban/board');
  };

  const submit = (data) => {
    setIsSubmitSuccessful(true);
    console.log(data);
    realReg(data.nickname, data.password);
    handleRedirect();
  };

  const errorHandler = (e) => {
    console.log(e);
  };

  return (
    <div className="landing">
      <div className="form">
        <form
          onSubmit={handleSubmit(submit, errorHandler)}
          className="form__content"
        >
          <p className="form_text">Регистрация</p>
          <input
            {...register('nickname', {
              required: 'Необходимо ввести ваш никнейм',
              minLength: {
                value: 2,
                message: 'Минимальная длина строки: 2',
              },
              maxLength: {
                value: 50,
                message: 'Максимальная длина строки: 50',
              },
            })}
            className={classNames({
              form_input: true,
              form_input__error: errors.nickname,
            })}
            type="text"
            placeholder="Никнейм"
          />
          <p
            className={classNames({
              form_text: true,
              form_error_text: errors.nickname,
            })}
          >
            {errors.nickname?.message}
          </p>

          <input
            {...register('password', {
              required: 'Необходимо ввести пароль',
              minLength: {
                value: 6,
                message: 'Минимальная длина строки: 6',
              },
              maxLength: {
                value: 20,
                message: 'Максимальная длина строки: 20',
              },
            })}
            className={classNames({
              form_input: true,
              form_input__error: errors.password,
            })}
            type="text"
            placeholder="Пароль"
          />
          <p
            className={classNames({
              form_text: true,
              form_error_text: errors.password,
            })}
          >
            {errors.password?.message}
          </p>
          {/* <input {...register('password_again', {
              required: 'Необходимо ввести пароль снова',
              minLength: {
                value: 6,
                message: 'Минимальная длина строки: 2',
              },
              maxLength: {
                value: 20,
                message: 'Максимальная длина строки длина строки: 50',
              },
            })}
            className={classNames({
              form_input__error: errors.name,
            })} type="text" placeholder="Повторите пароль" /> */}
          {/* kanban/board */}
          <button className="form__btn" type="submit">
            Зарегистрироваться
          </button>
          {/* <Link to={'/kanban/board'} className="form__btn">
            
          </Link> */}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
