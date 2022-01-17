import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../style/noti.css';
import ex1Image from '../img/ex1.jpeg';
import ex2Image from '../img/ex2.jpeg';
import ex3Image from '../img/ex3.jpeg';

const Noti = ({ isAuthenticated }) => {

    useEffect(() => {
        if (isAuthenticated) {
            document.body.className='Noti-body';
        }
    });

    if (!isAuthenticated) {
        return <Redirect to = '/login' />
    }

    return (
        <div>
             {/* header */}
            <div className="Noti-header">
                <h2>알림</h2>
            </div>
            {/* 알림 전체 틀 notifi_box */}
            <div className="Noti-notifi_box">
                {/* 개별 알림 notifi_item */}
                <div className="Noti-notifi_item">
                    {/* 알림 이미지 */}
                    <div className="Noti-noti_img">
                        <img src={ex1Image} alt="preview_img" style={{width: '73px', height: '73px', borderRadius: '70px'}}/>
                    </div>
                    {/* 알림 텍스트 / h3: 알림 종류, p:알림 세부 내용 */}
                    <div className="Noti-noti_text">
                        <h3>시스템 알림</h3>
                        <p>방금 내 분실물과 비슷한 물건이 습득물 게시판에 올라왔어요! 얼른 확인해보세요!</p>
                    </div>
                    {/* 알림 시간 */}
                    <div className="Noti-noti_time">
                        00:00
                    </div>
                </div>
                {/* 개별 알 notifi_item */}
                <div className="Noti-notifi_item">
                    {/* 알림 이미지 */}
                    <div className="Noti-noti_img">
                        <img src={ex2Image} alt="preview_img" style={{width: '73px', height: '73px', borderRadius: '50px'}} />
                    </div>
                    {/* 알림 텍스트 / h3: 알림 종류, p:알림 세부 내용 */}
                    <div className="Noti-noti_text">
                        <h3>채팅 알림</h3>
                        <p>[17 강병준]</p>
                        <p>제가 잃어버린 노트북 같아서 연락드립니다ㅠㅠ</p>
                    </div>
                    {/* 알림 시간 */}
                    <div className="Noti-noti_time">
                        00:00
                    </div>
                </div>
                {/* 개별 알림 notifi_item */}
                <div className="Noti-notifi_item">
                    {/* 알림 이미지 */}
                    <div className="Noti-noti_img">
                        <img src={ex3Image} alt="preview_img" style={{width: '73px', height: '73px', borderRadius: '50px'}} />
                    </div>
                    {/* 알림 텍스트 / h3: 알림 종류, p:알림 세부 내용 */}
                    <div className="Noti-noti_text">
                        <h3>스꾸실 이벤트</h3>
                        <p>스꾸실 보물찾기 이벤트 시작!</p>
                        <p>분실물 지도를 확인하고 상품의 주인공이 되세요!</p>
                    </div>
                    {/* 알림 시간 */}
                    <div className="Noti-noti_time">
                        00:00
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Noti);