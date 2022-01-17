import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../style/navbar.css';

const Navbar = () => {

    const plus = useRef(null);
    const search = useRef(null);
    const home = useRef(null);
    const bell = useRef(null);
    const user = useRef(null);

    const clickPlus =() => {
        plus.current.style.color = 'rgb(141, 198, 63)';
        search.current.style.color = 'black';
        bell.current.style.color = 'black';
        user.current.style.color = 'black';
    };

    const clickSearch =() => {
        search.current.style.color = 'rgb(141, 198, 63)';
        plus.current.style.color = 'black';
        bell.current.style.color = 'black';
        user.current.style.color = 'black';
    };

    const clickHome =() => {
        search.current.style.color = 'black';
        plus.current.style.color = 'black';
        bell.current.style.color = 'black';
        user.current.style.color = 'black';
    };

    const clickBell =() => {
        bell.current.style.color = 'rgb(141, 198, 63)';
        search.current.style.color = 'black';
        plus.current.style.color = 'black';
        user.current.style.color = 'black';
    };

    const clickUser =() => {
        user.current.style.color = 'rgb(141, 198, 63)';
        search.current.style.color = 'black';
        bell.current.style.color = 'black';
        plus.current.style.color = 'black';
    };

    return (
        // 하단 네비게이션바
        <nav className="Navbar-navbar">
            {/* 폰트(font awesome cdn 활용) */}
            <ul className="Navbar-mobile_list">
                <li><Link to="/new"><i className="fa fa-plus" ref={plus} style={{color:'black'}} onClick={clickPlus}></i></Link></li>
                <li><Link to="/search"><i className="fa fa-search" ref={search} style={{color:'black'}} onClick={clickSearch}></i></Link></li>
                <li><Link to="/"><i className="fa fa-home" id="home" ref={home} onClick={clickHome}></i></Link></li>
                <li><Link to="/noti"><i className="fa fa-bell" ref={bell} style={{color:'black'}} onClick={clickBell}></i></Link></li>
                <li><Link to="/mypage"><i className="fa fa-user" ref={user} style={{color:'black'}} onClick={clickUser}></i></Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;