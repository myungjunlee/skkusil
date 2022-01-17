import React, { useState, useEffect, useRef } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import '../style/register.css';
import logoImage from '../img/SKKUsilLogo.png';
import passImage from '../img/register/m_icon_pass.png';
import disabledImage from '../img/register/m_icon_check_disable.png';

const Register = ({ signup, isAuthenticated }) => {

    // 비번창 스타일 컨트롤 위한 useref
    const pass1 = useRef(null);
    const pass2 = useRef(null);
    const err = useRef(null);

    // body style & navbar 속성 변경
    useEffect(() => {
        document.body.className='Register-body';
        const navbarChange1 = document.querySelector('.Navbar-mobile_list');
        navbarChange1.style.borderTop = '';
        navbarChange1.style.zIndex = '2';
    });

    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        email_name: '',
        email_address: '@skku.edu',
        password: '',
        re_password: '',
        name: '',
        student_id: '',
        phone: '',
        campus: ''
    });

    const { email_name, email_address, password, re_password, name, student_id, phone, campus } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        const email = email_name + email_address;

        if (password === re_password) {
            signup(email, password, re_password, name, student_id, phone, campus);
            setAccountCreated(true);
        }
    };

    if (isAuthenticated) {
        // navbar 속성 변경
        const navbarChange2 = document.querySelector('.Navbar-mobile_list');
        navbarChange2.style.borderTop = 'rgb(187, 187, 187) 1px solid';
        navbarChange2.style.zIndex = '';

        return <Redirect to = '/' />
    }
    if (accountCreated) {
        // navbar 속성 변경
        const navbarChange3 = document.querySelector('.Navbar-mobile_list');
        navbarChange3.style.borderTop = 'rgb(187, 187, 187) 1px solid';
        navbarChange3.style.zIndex = '';

        return <Redirect to = '/login' />
    }

    // useref로 잡은 값들이 초기에는 null이므로 초기 방어
    if ((pass1.current !== null) && (pass2.current !== null) && (err.current !== null)) {
        // 비밀번호 일치 여부
        if (password !== '' && re_password !== '') {
            // 일치 경우
            if (password !== re_password) {
                pass1.current.className = "Register-fail";
                pass2.current.className = "Register-fail";
                err.current.style.visibility = "visible";
                err.current.style.display = "";
            // 불일치 경우
            } else {
                pass1.current.className = "Register-success";
                pass2.current.className = "Register-success";
                err.current.style.visibility = "hidden";
                err.current.style.display = "none";
            }

        } else {
            pass1.current.className = "Register-box int_pass";
            pass2.current.className = "Register-box int_pass_check";
            err.current.style.visibility = "hidden";
            err.current.style.display = "none";
        }
    }

    return(
        <div>
            <div className="Register-back">
                <button onClick="history.back()"><i className="fa fa-chevron-left"></i></button>
            </div>
            <div className="Register-logo">
                <img src={logoImage} />
            </div>
            <div id="wrapper">
            <form onSubmit={e => onSubmit(e)}>
                {/* content */}
                <div id="content">
                    {/* E-mail */}
                    <div>
                        <h3 className="Register-join_title"><label htmlFor="Email">킹고 이메일 인증</label></h3>
                        <div id="Email_wrap">
                            {/* E-mail ID */}
                            <div id="Email_ID">
                                <span className="Register-box">
                                    <input 
                                        type="text" 
                                        id="ID" 
                                        className="Register-int"
                                        placeholder="이메일 앞 주소" 
                                        name='email_name'
                                        value={email_name}
                                        onChange={e => onChange(e)}
                                        required
                                    />
                                </span>
                            </div>
                            {/* E-mail Type */}
                            <div id="Email_type">
                                <span className="Register-box">
                                    <select 
                                        id="TYPE"
                                        className="Register-sel"
                                        name='email_address'
                                        value={email_address}
                                        onChange={e => onChange(e)}
                                        required
                                    >
                                        <option>선택</option>
                                        <option value="@skku.edu">@skku.edu</option>
                                        <option value="@g.skku.edu">@g.skku.edu</option>
                                    </select>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* PW1 */}
                    <div>
                        <h3 className="Register-join_title"><label htmlFor="pswd1">비밀번호</label></h3>
                        <span className="Register-box int_pass" ref={pass1}>
                            <input 
                                type='password'
                                id="pswd1" 
                                className="Register-int" 
                                maxlength="20"
                                minLength='6'
                                name='password'
                                value={password}
                                onChange={e => onChange(e)}
                                required
                            />
                            <img src={passImage} id="pswd1_img1" className="Register-pswdImg" />
                        </span>
                    </div>
                    {/* PW Confirm */}
                    <div>
                        <h3 className="Register-join_title"><label htmlFor="pswd2">비밀번호 재확인</label></h3>
                        <span className="Register-box int_pass_check" ref={pass2}>
                            <input 
                                type="password" 
                                id="pswd2" 
                                className="Register-int" 
                                maxlength="20"
                                minLength='6'
                                name='re_password'
                                value={re_password}
                                onChange={e => onChange(e)}
                                required
                            />
                            <img src={disabledImage} id="pswd2_img1" className="Register-pswdImg" />
                        </span>
                        <small style={{color: '#e74c3c', visibility: 'hidden', display: 'none'}} ref={err}>비밀번호 불일치</small>
                    </div>
                    {/* NAME */}
                    <div>
                        <h3 className="Register-join_title"><label htmlFor="name">이름</label></h3>
                        <span className="Register-box int_name">
                            <input 
                                type="text" 
                                id="name" 
                                className="Register-int" 
                                maxlength="20"
                                name='name'
                                value={name}
                                onChange={e => onChange(e)}
                                required
                            />
                        </span>
                    </div>
                    {/* Student Number */}
                    <div>
                        <h3 className="Register-join_title"><label htmlFor="std_number">학번</label></h3>
                        <span className="Register-box int_name">
                            <input 
                                type="text" 
                                id="studentid" 
                                className="Register-int" 
                                maxlength="20"
                                name='student_id'
                                value={student_id}
                                onChange={e => onChange(e)}
                                required
                            />
                        </span>
                    </div>
                    {/* Campus */}
                    <div>
                        <h3 className="Register-join_title"><label htmlFor="campus">원전공 캠퍼스</label></h3>
                        <span className="Register-box campus_code">
                            <select 
                                id="std_campus" 
                                className="Register-sel"
                                name='campus'
                                value={campus}
                                onChange={e => onChange(e)}
                                required
                            >
                                <option>선택</option>
                                <option value="M">명륜 캠퍼스</option>
                                <option value="Y">율전 캠퍼스</option>
                            </select>                            
                        </span>
                    </div>
                    {/* Phone Number */}
                    <div>
                        <h3 className="Register-join_title"><label htmlFor="phoneNo">휴대전화</label></h3>
                        <span className="Register-box int_mobile">
                            <input 
                                type="text" 
                                id="mobile" 
                                className="Register-int" 
                                maxlength="16" 
                                placeholder="전화번호 입력"
                                name='phone'
                                value={phone}
                                onChange={e => onChange(e)}
                                required 
                            />
                        </span>
                        <small>가입하기 클릭 후 꼭 이메일 인증해주세요!</small>
                    </div>
                    {/* JOIN BTN */}
                    <div className="Register-btn_area">
                        <button type="submit" id="btnJoin">
                            <span>가입하기</span>
                        </button>
                    </div>
                </div> 
            {/* content */}
            </form>
            </div> 
        {/* wrapper */}
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Register);