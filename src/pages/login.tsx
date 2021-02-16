import { ApolloError, gql, useMutation } from '@apollo/client';
import React from 'react';
import { Helmet } from "react-helmet-async"
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { authTokenVar, isLoggedInVar } from '../apollo';
import { Button } from '../components/button';
import { FormError } from '../components/form-error';
import { LOCALSTORAGE_TOKEN } from '../constants';
import { loginMutation, loginMutationVariables } from '../__generated__/loginMutation';

const LOGIN_MUTATION = gql`
    mutation loginMutation($loginInput: LoginInput!) {
        login(input: $loginInput) {
            ok 
            error
            token
        }
    }
`

interface ILoginForm {
    email: string;
    password: string;
}

export const Login = () => {
    const { register, getValues, errors, handleSubmit, formState } = useForm<ILoginForm>({
        mode: "onChange"
    });
    const onCompleted = (data: loginMutation) => {
        const { login: { ok, token } } = data
        if (ok && token) {
            localStorage.setItem(LOCALSTORAGE_TOKEN, token)
            authTokenVar(token)
            isLoggedInVar(true)
        }
    }

    const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
        loginMutation,
        loginMutationVariables
    >(LOGIN_MUTATION, {
        onCompleted,
    })
    const onSubmit = () => {
        if (!loading) {
            const { email, password } = getValues()
            console.log('submitting', email, password)
            loginMutation({
                variables: {
                    loginInput: {
                        email,
                        password
                    }
                }
            })
        }
    }

    return (
        <div className="h-screen flex items-center justify-center text-center bg-white">
            <Helmet >
                <title>Uber eats</title>
            </Helmet>
            <div className="bg-white w-full max-w-lg pt-8 pb-8 rounded-lg px-5">
                <h3 className="text-2xl text-gray-800 text-left">Welcome back</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-7 mb-5">
                    <input
                        ref={register({
                            required: "Email is required",
                            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        })}
                        name="email"
                        type="email"
                        required
                        placeholder="Email"
                        className="input"
                    />
                    {errors.email?.message &&
                        <FormError errorMessage={errors.email?.message} />
                    }
                    {errors.email?.type === "pattern" &&
                        <FormError errorMessage="Please enter a valid email" />
                    }
                    <input
                        ref={register({ required: "Password is required" })}
                        name="password"
                        type="password"
                        required
                        placeholder="Password"
                        className="input"
                    />
                    {errors.password?.message &&
                        <FormError errorMessage={errors.password?.message} />
                    }
                    {errors.password?.type === "minLength" &&
                        <FormError errorMessage="Password must be 8 characters" />
                    }
                    <Button canClick={formState.isValid} loading={loading} actionText="Login" />
                    {loginMutationResult?.login.error && <FormError errorMessage={loginMutationResult.login.error} />}
                </form>
                <div>
                    New to uber? <Link to="/create-account" className="text-green-600 hover:underline text-center">Create an account</Link>
                </div>
            </div>
        </div >
    );
};
