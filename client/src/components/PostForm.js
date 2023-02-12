import React from 'react';
import {Button, Form} from 'semantic-ui-react'
import gql from 'graphql-tag'
import {useMutation} from "@apollo/client";

import {useForm} from "../hooks/useForm";
import {FETCH_POSTS_QUERY} from "../utils/graphql";

const PostForm = () => {
    const {formValues, onSubmit, onChange} = useForm(createPostCallback, {
        body: ''
    })

    const [createPost, {error}] = useMutation(CREATE_POST, {
        variables: formValues,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                    getPosts: [result.data.createPost, ...data.getPosts]
                }
            })
            formValues.body = ''
        }
    })

    function createPostCallback() {
        createPost()
    }

    return (
        <>
            <Form onSubmit={onSubmit}>
                <h2>Create a new post:</h2>
                <Form.Field>
                    <Form.Input
                        placeholder={"New Post"}
                        name={"body"}
                        onChange={onChange}
                        value={formValues.body}
                        error={!!error}
                    />
                    <Button type={"submit"} color={"teal"}>Submit</Button>
                </Form.Field>
            </Form>
            {error && (
                <div className={"ui error message"} style={{marginBottom: 20}}>
                    <ul className="list">
                        <li>{error.graphQLErrors[0].message}</li>
                    </ul>
                </div>
            )}
        </>
    );
};

const CREATE_POST = gql`
    mutation createPost($body: String!){
        createPost(body: $body){
            id
            body
            createdAt
            username
            likes {
                id
                username
                createdAt
            }
            likeCount
            comments {
                id
                body
                username
                createdAt
            }
            commentCount
        }
    }
`

export default PostForm;