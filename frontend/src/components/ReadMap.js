import React, { useEffect, useRef } from "react";

const { kakao } = window;

const ReadMap = (props) => {
    // 지도를 담을 영역의 DOM 레퍼런스
    const container = useRef(null); 
    
    const latitude = props.coordinate.latitude;
    const longitude = props.coordinate.longitude;
    const address = props.coordinate.address;

    useEffect(() => {

        const mapOption = {
            center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
            level: 2 // 지도의 확대 레벨
        };
        // 지도를 생성합니다
        const map = new kakao.maps.Map(container.current, mapOption);
        // 클릭한 위치를 표시할 마커입니다
        const marker = new kakao.maps.Marker();
        // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다
        const infowindow = new kakao.maps.InfoWindow({zindex:1});
        // 마커의 인포윈도우
        const content = '<div style="padding:5px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;">' + address + '</div>';
        // 마커를 해당 위치에 표시합니다 
        marker.setPosition(new kakao.maps.LatLng(latitude, longitude));
        marker.setMap(map);

        // 인포윈도우에 주소 정보를 나타냅니다
        infowindow.setContent(content);
        infowindow.open(map, marker);
    }, [latitude]);

    return (
        <div style={{paddingLeft: '5%'}}>
            <div ref={container} style={{ width: '95%', height: '300px', zIndex: '0' }}></div>
        </div>
    );
};

export default ReadMap;