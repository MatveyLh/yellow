import React, {useState} from "react";
import logo_green from "../../images/logo-green.png";
import {NavLink} from "react-router-dom";
import './HamburgerMenu.css';

const HamburgerMenu = (props) => {
    const [flag, setFlag] = useState(props.open);

    return (
        <div className={'hamburger-menu'}>
            <nav className={'navigation-hamburger'}>
                <img src={logo_green} className={'navigation_logo-hamburger'} alt={logo_green}/>
            </nav>
            <div className={'hamburger-menu__items'}>
                <NavLink to={'/jogs'} onClick={() => {
                    props.updateOpen(!flag);
                    setFlag(!flag)
                    localStorage.setItem('click', '1');
                }} activeStyle={{color: 'green'}} className={'item'}>Jogs</NavLink>
                <NavLink onClick={() => {
                    props.updateOpen(!flag);
                    setFlag(!flag)
                    localStorage.setItem('click', '1');
                }} to={'/info'} className={'item'} activeStyle={{color: '#7ed322'}}>Info</NavLink>
                <NavLink
                    onClick={() => {
                        props.updateOpen(!flag);
                        setFlag(!flag)
                        localStorage.setItem('click', '1');
                    }} to={'/contact'} className={'item'}>Contact Us</NavLink>
            </div>
        </div>
    )
}

export default HamburgerMenu;