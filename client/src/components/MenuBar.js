import React, {useEffect, useState} from 'react'
import {Menu, Segment} from 'semantic-ui-react'
import {Link, useLocation} from 'react-router-dom'

function MenuBar() {
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
        </div>
    )

}

export default MenuBar