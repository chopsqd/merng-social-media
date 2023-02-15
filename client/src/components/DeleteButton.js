import React, {useState} from 'react';
import gql from 'graphql-tag'
import {useMutation} from "@apollo/client";
import {Button, Confirm, Icon} from "semantic-ui-react";

const DeleteButton = ({postId, callback, commentId}) => {
    const [confirmOpen, setConfirmOpen] = useState(false)
    const mutation = commentId ? DELETE_COMMENT : DELETE_POST
    const [deleteMutation] = useMutation(mutation, {
        update(proxy) {
            setConfirmOpen(false)

            if(!commentId) {
                // Remove post from app cache
                proxy.modify({
                    fields: {
                        getPosts( existingPostRefs, { readField }) {
                            return existingPostRefs.filter( postRef => postId !== readField("id", postRef ));
                        }
                    }
                })
            }

            if(callback) callback()
        },
        variables: {
            postId,
            commentId
        }
    })

    return (
        <>
            <Button
                as='div'
                color={"red"}
                floated={"right"}
                onClick={() => setConfirmOpen(true)}
            >
                <Icon name={"trash alternate"} style={{margin: 0}}/>
            </Button>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deleteMutation}
            />
        </>
    );
};

const DELETE_POST = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`

const DELETE_COMMENT = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!){
        deleteComment(postId: $postId, commentId: $commentId){
            id
            comments{
                id
                username
                createdAt
                body
            }
            commentCount
        }
    }
`

export default DeleteButton;