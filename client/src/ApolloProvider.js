import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {ApolloClient, InMemoryCache, createHttpLink, ApolloProvider} from '@apollo/client'
import App from './App'

const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

export default (
    <ApolloProvider client={client}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </ApolloProvider>
);