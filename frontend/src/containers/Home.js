import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/home.css';
import image from '../img/SKKUsilLogo_White.png'

const Home = () => {

    useEffect(() => {
        document.body.className='Home-body';

        const plus = document.querySelector('.fa-plus');
        const search = document.querySelector('.fa-search');
        const bell = document.querySelector('.fa-bell');
        const user = document.querySelector('.fa-user');

        plus.style.color = 'black';
        search.style.color = 'black';
        bell.style.color = 'black';
        user.style.color = 'black';
    });

    return (
        <div className="Home-main_img">
            <img src={image} width="80%" />
        </div>
    );
};



export default Home;