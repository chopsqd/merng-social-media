import React, {useState} from 'react';
import gql from 'graphql-tag'
import {useMutation} from "@apollo/client";
import {Button, Confirm, Icon} from "semantic-ui-react";

const DeleteButton = ({postId, callback}) => {
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [deletePost] = useMutation(DELETE_POST, {
        update(proxy) {
            setConfirmOpen(false)
            // Remove post from app cache
            proxy.modify({
                fields: {
                    getPosts( existingPostRefs, { readField }) {
                        return existingPostRefs.filter( postRef => postId !== readField("id", postRef ));
                    }
                }
            })

            if(callback) callback()
        },
        variables: {
            postId
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
                onConfirm={deletePost}
            />
        </>
    );
};

const DELETE_POST = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`

export default DeleteButton;