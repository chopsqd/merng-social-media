import React, {useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import {Button, Form} from 'semantic-ui-react'
import {useMutation} from '@apollo/client'
import gql from 'graphql-tag'
import {useForm} from '../hooks/useForm'
import {AuthContext} from '../context/auth'

const Login = () => {
    const navigate = useNavigate();
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})
    const {onChange, onSubmit, formValues} = useForm(loginUserCallback, {
        username: '',
        password: ''
    })

    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
        update(_, {data: {login: userData}}) {
            context.login(userData)
            navigate("/")
        },
        onError(error) {
            setErrors(error.graphQLErrors[0].extensions.errors)
        },
        variables: formValues
    })

    function loginUserCallback() {
        loginUser()
    }

    return (
        <div className={"form-container"}>
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <h1 className={"page-title"}>Login</h1>
                <Form.Input
                    label={"Username"}
                    placeholder={"Username..."}
                    name={"username"}
                    type={"text"}
                    error={!!errors.username}
                    value={formValues.username}
                    onChange={onChange}
                />
                <Form.Input
                    label={"Password"}
                    placeholder={"Password..."}
                    name={"password"}
                    type={"password"}
                    error={!!errors.password}
                    value={formValues.password}
                    onChange={onChange}
                />
                <Button type={"submit"} primary>Login</Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className={"ui error message"}>
                    <ul className={"list"}>
                        {Object.values(errors).map(value =>
                            <li key={value}>{value}</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id 
            email 
            username 
            createdAt 
            token
        }
    }
`

export default Login;