import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../style/studentaid_lost.css';

const Studentaid_found = () => {

    const [linkSF, setLinkSF] = useState(false);

    useEffect(() => {
        document.body.className='SAL-body';
    });
    
    const individualFound = (e) => {
        e.preventDefault();
        setLinkSF(true);
    };

    if (linkSF) {
        return <Redirect to = '/search_found' />
    };

    return (
        <div>
            {/* header */}
            <div className="SAL-header">
                <h2>습득물 게시판</h2>
            </div>
            {/* 검색창 / search_container  */}
            <div className="SAL-search_container">
                <input 
                    type="search" 
                    value="" 
                    className="SAL-search_text" 
                    placeholder="습득물 검색" 
                />
                <button type="submit" className="SAL-search_btn">검색</button>      
            </div>
            {/* 검색 옵션 search_option (개인분실물 or 학생지원팀) */}
            <div className="SAL-search_option">
                <button type="button" className="SAL-Indi_btn" onClick={e => individualFound(e)}>개인습득물</button>
                <button type="button" className="SAL-Offi_btn SAL-circle_btn">학생지원팀</button>
            </div>
            {/* 학생지원팀 전체 틀 offi_list */}
            <div className="SAL-offi-list">
                {/* 학생지원팀 - 개별 아이템 offi-item */}
                <div className="SAL-offi-item">
                    <div className="SAL-offiItem-info">
                        <h3>국민은행 나라사랑 체크카드</h3>
                        <p>[명륜] 법학관 1층 자판기</p>
                    </div>
                    <div className="SAL-offi-date">
                        2021.07.20
                    </div>
                </div>
                {/* 학생지원팀 - 개별 아이템 offi-item */}
                <div className="SAL-offi-item">
                    <div className="SAL-offiItem-info">
                        <h3>닥스 장지갑</h3>
                        <p>[명륜] 경영관 1층 학생식당</p>
                    </div>
                    <div className="SAL-offi-date">
                        2021.07.19
                    </div>
                </div>
                {/* 학생지원팀 - 개별 아이템 offi-item */}
                <div className="SAL-offi-item">
                    <div className="SAL-offiItem-info">                
                        <div>
                            {/* 반환완료 offiItem-fin */}
                            <div className="SAL-offiItem-fin">[반환완료]</div>
                            <h3>E하우스 기숙사 키</h3>
                        </div>
                        <p>[명륜] 교내 셔틀버스</p>
                    </div>
                    <div className="SAL-offi-date">
                        2021.07.17
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Studentaid_found;