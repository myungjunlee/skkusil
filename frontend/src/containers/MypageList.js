import React, { useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { detail } from '../actions/apost';
import '../style/mypagelist.css';
import cssImage from '../img/skkulogo.png';

const MypageList = ({ lists, _user, isAuthenticated, detail }) => {
  let history = useHistory();
  let newList = null;

  useEffect(() => {
    if (isAuthenticated) {
        document.body.className='MP-body';
      }
    });

  if (!isAuthenticated) {
    return <Redirect to = '/login' />
  } else {
    newList = lists.filter((list) => list.user === _user.id);
  }

  let renderList_lost = newList.map((list) => {
      if (list.lost_found === 'L') {
        return (
            <Link
                to='/loading_lost'
                onClick={e => getDetail(list.id, e)}
                >
                {/* 잃어버린 물건 - 개별 아이템 */}
                <li key={list.id}>
                    <div className="mypage-option">
                        {/* 아이템 미리보기 이미지 */}
                        <img src={list.image !== null ? list.image : cssImage} style={{width:'100%', height:'100px'}} />
                    </div>
                </li>
            </Link>
        );
    }
  });

  let renderList_found = newList.map((list) => {
        if (list.lost_found === 'F') {
        return (
            <Link
                to='/loading_found'
                onClick={e => getDetail(list.id, e)}
                >
                {/* 잃어버린 물건 - 개별 아이템 */}
                <li key={list.id}>
                    <div className="mypage-option">
                        {/* 아이템 미리보기 이미지 */}
                        <img src={list.image} style={{width:'100%', height:'100px'}} />
                    </div>
                </li>
            </Link>
        );
    }
    });

  const getDetail = (id, e) => {
          detail(id);
      };

    const goBack = () => {
        history.goBack();
    };

  return(
      <div>
          
        <header>
            {/* 헤더 부분 / 마이페이지 기본정보(학번, 이름, 소속정보) */}
            <div className="mypage-header">
                {/* 뒤로가기 버튼 */}
                <div className="MP-back">
                <button onClick={goBack}><i className="fa fa-chevron-left"></i></button>
                </div>
                <h1 style={{ margin: '0' }}>{_user.name}</h1>
                <h5 style={{ margin: '0' }}>{_user.campus === 'M' ? '명륜 캠퍼스' : '율전 캠퍼스'} / {_user.student_id} </h5>
            </div>
            <div className="mypage-top-area">내 분실물 & 습득물</div>
        </header>

        {/* mypage-container : 잃어버린/주운 물건 리스트 전체 틀 */}
        <div className="mypage-container">
            {/* mypage-myLost-container: 잃어버린 물건 목록 전체 틀(타이틀, 이미지목록) */}
            <div className="mypage-myLost-container">
                {/* 타이틀 - '내가 잃어버린 물건 목록' */}
                <div className="mypage-text">
                    내가 잃어버린 물건 목록
                </div>
                {/* '잃어버린 물건' 목록 기본 틀 */}
                <div className="mypage-wrapper">
                    <ul>
                        {renderList_lost}
                    </ul>
                </div>
            </div>

            {/* mypage-myFound-container: 주운 물건 목록 전체 틀(타이틀, 이미지목록) */}
            <div className="mypage-myFound-container">
                {/* 타이틀 - '내가 주운 물건 목록' */}
                <div className="mypage-text">
                    내가 주운 물건 목록
                </div>
                {/* '주운 물건' 목록 기본 틀 */}
                <div className="mypage-wrapper">
                    <ul>
                        {renderList_found}
                    </ul>
                    {/* 하단 더 보기 버튼 */}
                <button type="button" className="mypage-btn">더 보기</button>
                </div>
            </div>
        </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  lists: state.post._datas,
  _user: state.auth.user
});

export default connect(mapStateToProps, {detail})(MypageList);