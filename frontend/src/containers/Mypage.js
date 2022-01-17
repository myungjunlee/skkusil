import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import '../style/mypage.css';
import image from '../img/logo2.jpg';

const Mypage = ({ _user, logout, isAuthenticated }) => {
    
    const [campusName, setCampusName] = useState('');
    const [linkMP, setLinkMP] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            document.body.className='Mypage-body';

             // campus 한글로 출력
            if (_user.campus === 'M' ) {
                setCampusName('명륜 캠퍼스');
            } else {
                setCampusName('율전 캠퍼스');
            }
        }

    });

    const gotoList = (e) => {
        e.preventDefault();
        setLinkMP(true);
    }

    // 로그인 안 했을 시 로그인 페이지로
    if (!isAuthenticated) {
        return <Redirect to = '/login' />
    }

    // 마이페이지 습득물 분실물 칸으로
    if (linkMP) {
        return <Redirect to = '/mypage_list' />
    }
    
    return (
        <div>
            <div className="Mypage-user_info">
                <img src={image} id="user_img" />
            </div>
            <div className="Mypage-user_box">
                <h1>{_user.name}</h1>
                <h2>{campusName} / {_user.student_id}</h2>
                <button id="my_lost" onClick={e => gotoList(e)}>내 분실물 & 습득물</button><br/>
                <button id="modi_profile">프로필 수정</button>
                <div className="Mypage-line"></div>
                <div className="Mypage-user_function">
                    <ul>
                        <li><i className="fa fa-question-circle"></i>자주 묻는 질문</li>
                    </ul>
                    <ul>
                        <li><i className="fa fa-comments"></i>1:1 문의</li>
                    </ul>
                    <ul>
                        <li><i className="fa fa-cog"></i>앱 설정</li>
                    </ul>
                    <ul>
                        <li onClick={logout}><i className="fa fa-power-off"></i>로그아웃</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    _user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Mypage);