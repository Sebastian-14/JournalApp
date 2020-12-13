import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';

import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';

import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {
    const dispatch = useDispatch()
    const { msgError } = useSelector(state => state.ui)
    /*
    {
        name: 'sebas',
        email: 'sebas@gmail.com',
        password: '123456',
        password2: '123456'
    }
    */
    const [ formValues, handleInputChange ] = useForm({
        name: 'sebas123',
        email: 'sebas123@gmail.com',
        password: '123456',
        password2: '123456'
    })

    const { name, email, password, password2 } = formValues

    const handleRegister = (e) => {
        e.preventDefault()
        if (isFormValid()) {
            console.log('Formulario correcto')
            dispatch(startRegisterWithEmailPasswordName(email, password, name))
        }
        // console.log(name, email, password, password2)
    }

    const isFormValid = () => {
        if (name.trim().length === 0) {
            console.log('el nombre es requerido')
            dispatch(setError('el nombre es requerido'))
            return false
        } else if (!validator.isEmail(email)) {
            console.log('email incorrecto')
            dispatch(setError('email incorrecto'))
            return false
        } else if (password !== password2 || password.length < 5) {
            console.log('contraseña incorrecta')
            dispatch(setError('contraseña incorrecta'))
            return false
        }
        dispatch(removeError())
        return true
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={ handleRegister }>

                {
                    msgError &&
                    <div className="auth__alert-error">
                        {
                            msgError
                        }
                    </div>
                }

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={ password2 }
                    onChange={ handleInputChange }
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>



                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
