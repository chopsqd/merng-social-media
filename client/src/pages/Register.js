import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import {Button, Form} from 'semantic-ui-react'
import {useMutation} from '@apollo/client'
import gql from 'graphql-tag'
import {useForm} from '../hooks/useForm'

const Register = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const {onChange, onSubmit, formValues} = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(_, result) {
            navigate("/")
        },
        onError(error) {
            setErrors(error.graphQLErrors[0].extensions.errors)
        },
        variables: formValues
    })

    function registerUser() {
        addUser()
    }

    return (
        <div className={"form-container"}>
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <h1 className={"page-title"}>Register</h1>
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
                    label={"Email"}
                    placeholder={"Email..."}
                    name={"email"}
                    type={"email"}
                    error={!!errors.email}
                    value={formValues.email}
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
                <Form.Input
                    label={"Confirm Password"}
                    placeholder={"Confirm Password..."}
                    name={"confirmPassword"}
                    type={"password"}
                    error={!!errors.confirmPassword}
                    value={formValues.confirmPassword}
                    onChange={onChange}
                />
                <Button type={"submit"} primary>Register</Button>
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

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id 
            email 
            username 
            createdAt 
            token
        }
    }
`

export default Register;