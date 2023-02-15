import React, {useContext, useRef, useState} from 'react';
import gql from 'graphql-tag';
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import {Button, Card, Form, Grid, Icon, Image, Label} from "semantic-ui-react";
import moment from "moment";

import {AuthContext} from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

const SinglePost = () => {
    const {postId} = useParams()
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const commentInputRef = useRef(null)
    const [comment, setComment] = useState('')
    const {loading, data = {}, error} = useQuery(FETCH_POST, {
        variables: {
            postId
        }
    })

    const [submitComment] = useMutation(SUBMIT_COMMENT, {
        update() {
            setComment('')
            if(commentInputRef && commentInputRef.current && commentInputRef.current.blur) {
                commentInputRef.current.blur()
            }
        },
        variables: {
            postId,
            body: comment
        }
    })
    
    function deletePostCallback() {
        navigate('/')
    }

    if (loading) {
        return <h1 className={"page-title"}>Loading post data...</h1>
    }

    if (error) {
        return <h1 className={"page-title"}>Some error occurred: {error.message}</h1>
    }

    if(data) {
        const {id, body, createdAt, username, comments, commentCount, likes, likeCount} = data.getPost

        return (
            <Grid style={{marginTop: 10}}>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            floated='right'
                            size='small'
                            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                        />
                    </Grid.Column>

                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr/>
                            <Card.Content extra>
                                <LikeButton user={user} post={{id, likeCount, likes}}/>
                                <Button
                                    as={"div"}
                                    labelPosition={"right"}
                                    onClick={() => {
                                    }}
                                >
                                    <Button basic color={"blue"}>
                                        <Icon name='comments'/>
                                    </Button>
                                    <Label basic color={"blue"} pointing={"left"}>
                                        {commentCount}
                                    </Label>
                                </Button>
                                {user && user.username === username && <DeleteButton postId={id} callback={deletePostCallback}/>}
                            </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                    <h5>Post a comment</h5>
                                    <Form>
                                        <div className={"ui action input fluid"}>
                                            <input
                                                type={"text"}
                                                placeholder={"Comment..."}
                                                name={"comment"}
                                                value={comment}
                                                onChange={event => setComment(event.target.value)}
                                            />
                                            <Button
                                                type={"submit"}
                                                className={"ui button teal"}
                                                disabled={comment.trim() === ''}
                                                onClick={submitComment}
                                                ref={commentInputRef}
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {comments.map(comment =>
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    {user && user.username === comment.username && (
                                        <DeleteButton postId={id} commentId={comment.id} />
                                    )}
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        )}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
};

const SUBMIT_COMMENT = gql`
    mutation($postId: String!, $body: String!){
        createComment(postId: $postId, body: $body){
            id
            comments{
                id
                body
                username
                createdAt
            }
            commentCount
        }
    }
`

const FETCH_POST = gql`
    query GetPost($postId: ID!) {
      getPost(postId: $postId) {
        id
        body
        username
        createdAt
        likeCount
        likes {
          username
        }
        commentCount
        comments {
          id
          username
          createdAt
          body
        }
      }
    }
`

export default SinglePost;