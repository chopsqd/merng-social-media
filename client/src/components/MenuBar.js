import React, {useEffect, useState, useContext} from 'react'
import {Menu} from 'semantic-ui-react'
import {Link, useLocation} from 'react-router-dom'
import {AuthContext} from "../context/auth";

function MenuBar() {
    const {user, logout} = useContext(AuthContext)
    const [activeItem, setActiveItem] = useState('home')
    const {pathname} = useLocation()

    const handleClick = (event, {name}) => {
        setActiveItem(name)
    }

    useEffect(() => {
        const path = pathname === '/' ? 'home' : pathname.substr(1)
        setActiveItem(path)
    }, [])

    return (
        <div>
            {user
                ? (
                    <Menu pointing secondary size={"massive"} color={"teal"}>
                        <Menu.Item
                            name={user.username}
                            active
                            as={Link}
                            to={"/"}
                        />
                        <Menu.Menu position='right'>
                            <Menu.Item
                                name='logout'
                                onClick={logout}
                            />
                        </Menu.Menu>
                    </Menu>
                )
                : (
                    <Menu pointing secondary size={"massive"} color={"teal"}>
                        <Menu.Item
                            name='home'
                            active={activeItem === 'home'}
                            onClick={handleClick}
                            as={Link}
                            to={"/"}
                        />
                        <Menu.Menu position='right'>
                            <Menu.Item
                                name='login'
                                active={activeItem === 'login'}
                                onClick={handleClick}
                                as={Link}
                                to={"/login"}
                            />
                            <Menu.Item
                                name='register'
                                active={activeItem === 'register'}
                                onClick={handleClick}
                                as={Link}
                                to={"/register"}
                            />
                        </Menu.Menu>
                    </Menu>
                )}
        </div>
    )

}

export default MenuBar