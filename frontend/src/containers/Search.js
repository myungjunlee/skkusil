import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/search.css';
import foundImage from '../img/found.jpeg';
import lostImage from '../img/lost1.png';

const Search = () => {
    
    useEffect(() => {
        document.body.className='Search-body';
    });

    return (
        <div>
            {/* header */}
            <div className="Search-header">
                <h2>검색</h2>
            </div>
            {/* 게시판 전체 틀 content_container */}
            <div className="Search-content_container">
                {/* 분실물 게시판 lost */}
                <div className="Search-lost">
                    {/* 게시판 이미지 lost_img */}
                    <div className="Search-lost_img">
                        <Link to="/search_lost"><img src={lostImage} /></Link>
                    </div>
                    {/* 게시판 정보 lost_info */}
                    <div className="Search-lost_info">
                        <div className="Search-lost_text">
                            <h3>분실물 게시판</h3>
                            <p>성균관대학교 내/외에서 분실하여</p>
                            <p>연락을 애타게 기다리고 있는 분실물 목록입니다.</p>
                        </div>
                    </div>             
                </div>
                {/* 습득물 게시판 found */}
                <div className="Search-found">
                    {/* 게시판 이미지 found_img */}
                    <div className="Search-found_img">
                        <Link to="/search_found"><img src={foundImage} /></Link>
                    </div>
                    {/* 게시판 정보 found_info */}
                    <div className="Search-found_info">
                        <div className="Search-fount_text">
                            <h3>습득물 게시판</h3>
                            <p>다른 학우분들이 습득하여</p>
                            <p>주인을 기다리고 있는 물건들을 확인할 수 있습니다.</p>               
                        </div>
                    </div>                        
                </div>
            </div>
        </div>
    );
};

export default Search;