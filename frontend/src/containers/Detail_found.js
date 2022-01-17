import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { read } from '../actions/post';
import { remove } from '../actions/apost';
import ReadMap from '../components/ReadMap';
import '../style/detail.css';
import imageLogo2 from '../img/logo2.jpg';
import imageLocation from '../img/location.png';
import imageTag from '../img/tag.png';
import imageColor from '../img/color.png';
import cssImage from '../img/skkulogo.png';

const Detail_found = ({ read, remove, list, _user, isAuthenticated }) => {
  // 뒤로가기 버튼을 위한 사전 작업
  let history = useHistory();
  // 캠퍼스 이니셜(M,Y)에 따라 이름 부여
  const [campusName, setCampusName] = useState('');
  // 게시물 등록 날짜 커스터마이징
  const [createDate, setCreateDate] = useState('');
  // 게시물 삭제시 발동
  const [postRemoved, setPostRemoved] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
        document.body.className='Detail-body';
      }
    // campus 한글로 출력
    if (list.campus === 'M' ) {
        setCampusName('명륜 캠퍼스');
    } else {
        setCampusName('율전 캠퍼스');
    }
    if (list.length !== 0) {
      // 등록 날짜 커스터마이징
      setCreateDate(list.create_date.slice(0,10));
    }
  });

  // remove 함수가 호출되고 list 값 삭제되면 실행됨
  useEffect(() => {
    if (list.length === 0) {
      read();
      setPostRemoved();
    }
    console.log(list);
  },[list]);

  if (!isAuthenticated) {
    return <Redirect to = '/login' />
  }

  if (postRemoved) {
      return <Redirect to = '/search_found' />
  }

  const { id, user, title, building, latitude, longitude, address, location, date, item, color, image, content } = list;

  const deleteConfirm = e => {
    remove(id);
  };

  const coorInfo = {
    latitude: Number(latitude),
    longitude: Number(longitude),
    address: address
  };

  const goBack = () => {
    history.goBack();
  };

  const noOwner = () => (
    <button id="item_detail_startChat">채팅 시작하기</button>
  );
  
  const userManagement = () => (
        <div>
          <Link to = '/edit_found'
          ><button 
            id="item_detail_modify"
            >수정하기</button></Link>
          <button
              id="item_detail_delete"              
              onClick={e => deleteConfirm()}
          >삭제하기</button>
        </div>
  );

  return (
    <div>
      <div className="Detail-header">
        <div className="Detail-back">
            <button onClick={goBack}><i className="fa fa-chevron-left"></i></button>
        </div>
        <h2>습득물 게시판</h2>
      </div>
      <div className="item_detail_content">
          <div className="item_detail_img">
              <img src={image !== null ? image : cssImage} />
          </div>
          <div className="item_detail_box">
              <h1 className="item_detail_name" style={{margin:'0'}}>
                  {title}
              </h1>
              <h2 className="item_detail_registerDate" style={{margin:'0'}}>
                  등록일 : {createDate}
              </h2>
              <div className="item_detail_category_logo">
                  <div className="item_detail_category_logo_parent">
                      <div className="item_detail_category_campus" style={{backgroundImage: "url(" + imageLogo2 + ")"}}>
                      </div>
                      <div className="item_detail_category_location" style={{backgroundImage: "url(" + imageLocation + ")"}}>
                      </div>
                      <div className="item_detail_category_category" style={{backgroundImage: "url(" + imageTag + ")"}}>
                      </div>
                      <div className="item_detail_category_color" style={{backgroundImage: "url(" + imageColor + ")"}}>
                      </div>
                  </div>
              </div>
              <div className="item_detail_category_exp">
                  <div className="item_detail_category_exp_parent">
                      <div className="item_detail_category_exp_campus"> {campusName} </div>
                      <div className="item_detail_category_exp_location"> {building} </div>
                      <div className="item_detail_category_exp_category"> {item} </div>
                      <div className="item_detail_category_exp_color"> {color} </div>
                  </div>
              </div>
              <h2 className="item_detail_lostDate" style={{margin:'0'}}>
                  습득일 : {date}
              </h2>
              <h2 className="item_detail_lostDetailLoca" style={{margin:'0'}}>
                  습득 장소명 : {location}
              </h2>
              <p className="item_detail_lostExp">
                  {content}
              </p>
              <ReadMap coordinate={coorInfo} />
              { user === _user.id ? userManagement() : noOwner() }
          </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  list: state.apost._data,
  _user: state.auth.user
});

export default connect(mapStateToProps, {read, remove})(Detail_found);
