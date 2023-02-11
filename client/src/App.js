import {Route, Routes} from 'react-router-dom'
import {Container} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './App.css';

import MenuBar from './components/MenuBar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
    return (
        <Container>
            <MenuBar/>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
            </Routes>
        </Container>
    );
}

export default App;
