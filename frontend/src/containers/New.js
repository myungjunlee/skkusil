import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/new.css';
import lostImage from '../img/new_lost.jpg';
import foundImage from '../img/new_found.jpg';

const New = () => {

    useEffect(() => {
        document.body.className='New-body';
    });

    return (
        <div>
            <div className="New-header">
                <h2>신규 등록</h2>
            </div>
            <div className="New-lost_enterance">
                <div className="New-new_img">
                    <Link to="/new_lost">
                        <img src={lostImage} />
                    </Link>
                </div>
                <h3>물건을 잃어버렸다면? 분실물 등록!</h3>
            </div>
            <div className="New-found_enterance">
                <div className="New-new_img">
                    <Link to="/new_found">
                        <img src={foundImage} />
                    </Link>
                </div>
                <h3>물건을 주웠다면? 습득물 등록!</h3>
            </div>
        </div>
    );
};

export default New;