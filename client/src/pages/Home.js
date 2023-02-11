import React from 'react';
import { Grid } from 'semantic-ui-react'
import {useQuery} from '@apollo/client'
import gql from 'graphql-tag'

import PostCard from '../components/PostCard'

const Home = () => {
    const {loading, data={}, error} = useQuery(FETCH_POSTS_QUERY)
    const posts = data.getPosts

    if(loading) {
        return <h1 className={"page-title"}>Loading posts...</h1>
    }

    if(error) {
        return <h1 className={"page-title"}>Some error occurred: {error.message}</h1>
    }

    return (
        <Grid columns={3}>
            <Grid.Row className={"page-title"}>
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {posts && posts.map(post =>
                    <Grid.Column key={post.id} style={{marginBottom: 20}}>
                        <PostCard post={post}/>
                    </Grid.Column>
                )}
            </Grid.Row>
        </Grid>
    );
};

const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id 
            body 
            createdAt 
            username 
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

export default Home;