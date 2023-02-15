import React, {useContext} from 'react';
import gql from 'graphql-tag';
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {Button, Card, Grid, Icon, Image, Label} from "semantic-ui-react";
import moment from "moment";

import {AuthContext} from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

const SinglePost = () => {
    const {postId} = useParams()
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const {loading, data = {}, error} = useQuery(FETCH_POST, {
        variables: {
            postId
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
            <Grid>
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
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
};

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