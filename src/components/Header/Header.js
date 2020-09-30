import React, {useState} from "react";
import logo from '../../images/logo.png';
import './Header.css';
import filterImage from '../../images/filter.png';
import HamburgerMenu from 'react-hamburger-menu';
import {NavLink, Link} from 'react-router-dom';

const Header = (props) => {
    let open = props.open;
    const [filter, setFilter] = useState(false);
    const color = open ? 'black' : 'white';
    if (localStorage.getItem('click') === '1') {
        open = true;
        localStorage.setItem('click', '0');
    }

    return (
        <nav className={'navigation'}>
            <Link to={'/'}><img src={logo} className={'navigation_logo'} alt={logo}/></Link>
            {localStorage.getItem('fullNav') === '1' ?
                <div className={'right-navigation'}>
                    <div className={'right-navigation_child'}>
                        <p><NavLink activeStyle={{textDecoration: 'underline'}} to={'/jogs'} className={'link-header'}>Jogs</NavLink></p>
                        <p><NavLink activeStyle={{textDecoration: 'underline'}} to={'/info'} className={'link-header'}>Info</NavLink></p>
                        <p><NavLink activeStyle={{textDecoration: 'underline'}} to={'/contact'} className={'link-header'}>Contact Us</NavLink></p>
                    </div>
                    <img src={filterImage} alt={filterImage} onClick={() => {
                        props.updateData(!filter)
                        setFilter(!filter)
                    }}/>
                    <HamburgerMenu
                        isOpen={open}
                        className={'hamburger'}
                        menuClicked={() => {
                            props.updateOpen(!open);
                            open = !open
                        }}
                        width={18}
                        height={15}
                        strokeWidth={1}
                        rotate={0}
                        color={color}
                        borderRadius={0}
                        animationDuration={0.5}
                    />
                </div>
                : ''
            }
        </nav>
    )
}

export default Header