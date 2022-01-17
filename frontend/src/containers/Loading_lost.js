import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../style/loading.css';
import image from '../img/SKKUsilLogo_White.png'

const Loading_lost = ({ isAuthenticated, list }) => {

    useEffect(() => {
        document.body.className='Detail-body';
    });

    if (!isAuthenticated) {
        return <Redirect to = '/login' />
    }

    if (list !== null && list.length !== 0) {
        return <Redirect to = '/detail_lost' />
    } 

    return (
        <div className="Loading-main_img">
            <img src={image} width="80%" />
            Loading
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    list: state.apost._data
});

export default connect(mapStateToProps)(Loading_lost);