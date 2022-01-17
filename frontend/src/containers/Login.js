import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { log_time } from '../actions/log';
import '../style/login.css';
import image from '../img/SKKUsilLogo_White.png';

const Login = ({ login, log_time, isAuthenticated, _user }) => {

    const [log, setLog] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        document.body.className='Login-body';

        if (_user !== null && log !== '') {
            console.log(_user);
    
            log_time(_user.id, log);
            setSuccess(true);
        }

    });
    
    const [formData, setFormData] = useState({
        email: '',
        password:''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        login(email, password);

        let dateTime = new Date();
        let date = dateTime.getDate();
        let month = dateTime.getMonth() + 1;
        let year = dateTime.getFullYear();
        let hours = dateTime.getHours();
        let minutes = dateTime.getMinutes();
        let seconds = dateTime.getSeconds();

        let currentDate = `${year}-${month<10?`0${month}`:`${month}`}-${date<10?`0${date}`:`${date}`}`
        let currentTime = `${hours<10?`0${hours}`:`${hours}`}:${minutes<10?`0${minutes}`:`${minutes}`}:${seconds<10?`0${seconds}`:`${seconds}`}`
        let current = `${currentDate} ${currentTime}`
        setLog(current);
    };

    if (success) {
        return <Redirect to = '/' />
    }

    return(
        <div>
            <div className="Login-main_img">
                <img src={image} width="80%" />
            </div>
            <form onSubmit={e => onSubmit(e)}>
            <div className="Login-login_text">
                        <input
                            type='email'
                            placeholder=' 킹고 이메일 주소'
                            name='email'
                            value={email}
                            onChange={e => onChange(e)}
                            maxlength="20"
                            required
                        />
                        <input
                            type='password'
                            placeholder=' 비밀번호'
                            name='password'
                            value={password}
                            onChange={e => onChange(e)}
                            maxlength='20'
                            required
                        />
            </div>
            <div className="Login-login_btn">
                <button id="log_in" type='submit'>로그인</button>
                <Link to='/register'><button id="register">회원가입</button></Link>
            </div>
            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    _user: state.auth.user
});

export default connect(mapStateToProps, { login, log_time })(Login);