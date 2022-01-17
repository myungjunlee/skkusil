import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../actions/auth';
import { read } from '../actions/post';

const Layout = (props) => {
    useEffect(() => {
        props.checkAuthenticated();
        props.load_user();
        props.read();
    }, []);

    return (
        <div>
            <Navbar />
            {props.children}
        </div>
    );
};

export default connect(null, { checkAuthenticated, load_user, read })(Layout);