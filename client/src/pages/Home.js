import React, {useContext} from 'react';
import { Grid } from 'semantic-ui-react'
import {useQuery} from '@apollo/client'

import {AuthContext} from "../context/auth";
import {FETCH_POSTS_QUERY} from "../utils/graphql";
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'

const Home = () => {
    const {user} = useContext(AuthContext)
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
                {user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}
                {posts && posts.map(post =>
                    <Grid.Column key={post.id} style={{marginBottom: 20}}>
                        <PostCard post={post}/>
                    </Grid.Column>
                )}
            </Grid.Row>
        </Grid>
    );
};

export default Home;