import {useState} from 'react'

export const useForm = (callback, initialState = {}) => {
    const [formValues, setFormValues] = useState(initialState)

    const onChange = (event) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = (event) => {
        event.preventDefault()
        callback()
    }

    return {
        onChange,
        onSubmit,
        formValues
    }
}