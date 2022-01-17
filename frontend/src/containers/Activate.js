import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';
import image from '../img/SKKUsilLogo.png';
import '../style/activate.css';

const Activate = ({ verify, match }) => {
    const [verified, setVerified] = useState(false);

    const verify_account = e => {
        const uid = match.params.uid;
        const token = match.params.token;

        verify(uid, token);
        setVerified(true);
    };

    useEffect(() => {
        document.body.className='Act-body';
    }, []);

    if (verified) {
        return <Redirect to='/' />
    }

    return(
        <div>
            <div className="Act-email_logo">
                <img src={image} />
            </div>
            <h2>이메일 주소 인증</h2>
            <p>
                안녕하세요. 성균관대학교 분실물 관리 앱 [SKKU_SIL]입니다.<br/><br/>
                정상적인 서비스 이용을 위해 아래 버튼을 클릭하여 이메일 인증을 완료해주세요.
            </p>
            <button 
                className="Act-authorize"
                onClick={verify_account}
                type='button'
            >
                이메일 인증하기
            </button>
            <p>
                이용해 주셔서 감사합니다.
            </p>
            <h2>SKKU_SIL 팀 드림</h2>
        </div>
    );
};

export default connect(null, { verify })(Activate);