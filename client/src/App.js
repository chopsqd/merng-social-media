import {Route, Routes} from 'react-router-dom'
import {Container} from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './App.css';

import {AuthProvider} from "./context/auth"
import AuthRoute from "./utils/authRoute";

import MenuBar from './components/MenuBar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SinglePost from './pages/SinglePost'

function App() {
    return (
        <AuthProvider>
            <Container>
                <MenuBar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route
                        path="login"
                        element={
                            <AuthRoute>
                                <Login />
                            </AuthRoute>
                        }
                    />
                    <Route
                        path="register"
                        element={
                            <AuthRoute>
                                <Register />
                            </AuthRoute>
                        }
                    />
                    <Route path="/posts/:postId" element={<SinglePost/>}/>
                </Routes>
            </Container>
        </AuthProvider>
    );
}

export default App;
