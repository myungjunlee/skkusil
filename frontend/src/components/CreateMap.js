import React, { useState, useEffect, useRef } from "react";
import './Map.css';

const { kakao } = window;

const CreateMap = (props) => {

  // 명륜 중심 좌표
  const m_lat = 37.587368304106555;
  const m_lng = 126.99450721990385;
  // 율전 중심 좌표
  const y_lat = 37.29400462774529;
  const y_lng = 126.97499655624479;

  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  useEffect(() => {
    document.body.className='';
    // 명륜으로 중심 좌표 설정
    if (props.campus === 'M') {
      setLat(m_lat);
      setLng(m_lng);
      // 율전으로 중심 좌표 설정
    } else if (props.campus === 'Y') {
      setLat(y_lat);
      setLng(y_lng);
    }
  });

  // 검색창 기능
  const [inputText, setInputText] = useState('');
  const [searchPlace, setSearchPlace] = useState('');

  // location에 들어감
  const [location, setLocation] = useState({
    latitude: '',
    longitude: '',
    address: ''
  });

  const { latitude, longitude, address } = location;

  // 지도를 담을 영역의 DOM 레퍼런스
  const container = useRef(null);

  // 검색창 입력 변화 감지
  const onChange = (e) => setInputText(e.target.value);

  // 검색 버튼 클릭시 검색 시작
  const onSubmitButton = (e) => {
    e.preventDefault();
    setSearchPlace(inputText);
    setInputText('');
  };

  // searchPlace 값이 변화할 때마다 업데이트됨
  useEffect(() => {
    // center옵션은 지도를 생성하는데 반드시 필요하며 파라미터는 위경도좌표이다. (위도,경도 순서)
    // level옵션은 지도의 확대, 축소 정도이다.
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 5,
    };

    // 지도 생성 및 객체 리턴
    const map = new kakao.maps.Map(container.current, options);

    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();

    // 클릭한 위치를 표시할 마커입니다
    const marker = new kakao.maps.Marker();

    // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다
    const infowindow = new kakao.maps.InfoWindow({zindex:1});
    
    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places(); 

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    // 키워드로 장소를 검색합니다
    ps.keywordSearch(searchPlace, placesSearchCB); 

    // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
        searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
              // 도로명 주소 있으면 도로명 주소로, 없으면 지번주소로
              const detailAddr = !!result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name;
                
              const content = '<div class="bAddr">' +
                              '<div>' + detailAddr + '</div>' +
                              '</div>';                            
              // 마커를 클릭한 위치에 표시합니다 
              marker.setPosition(mouseEvent.latLng);
              marker.setMap(map);

              // 인포윈도우에 클릭한 위치에 대한 상세 주소정보를 표시합니다
              infowindow.setContent(content);
              infowindow.open(map, marker);

              const place_info = {
                latitude: mouseEvent.latLng.getLat(),
                longitude: mouseEvent.latLng.getLng(),
                address: detailAddr
              };

              // 정보 location 변수로 전달
              setLocation(place_info);
            }   
        });
    });

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB (data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          const bounds = new kakao.maps.LatLngBounds();

          for (let i=0; i<data.length; i++) {
              displayMarker(data[i]);    
              bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }       

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds);
      } 
    }

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place) {
      
      // 마커를 생성하고 지도에 표시합니다
      const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x) 
      });

      // 마커에 마우스클릭 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function() {

        const detailAddr = place.road_address_name ? place.road_address_name : place.address_name;

        const content = '<div class="bAddr_list">' +
                '<div>' + place.place_name + '</div>' +
                '</div>';

          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
          infowindow.setContent(content);
          infowindow.open(map, marker);

          // 장소 관련 정보 setLocation으로 전송
          const place_info = {
            latitude: place.y,
            longitude: place.x,
            address: `${detailAddr} ${place.place_name}` 
          };

          // 클릭시 location변수로 정보 전달
          setLocation(place_info);

      });

    }

  }, [searchPlace, lat, lng]);

  // 취소 버튼 작동
  const mapOff = () => {
    props.mapOff();
  };

  // 지도 위치 등록
  const mapEnroll = () => {
    props.mapCreator(latitude, longitude, address);
    props.mapOff();
  };

    return (
      <div className="map_wrap">
        <div
          ref={container}
          id='map'
          style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}
        ></div>
        <div className="menu_wrap">
            <div class="option">
                <div>
                    <form>
                        <input type='text' onChange={e => onChange(e)} placeholder='장소를 입력해주세요' value={inputText} /> 
                        <button type='submit' onClick={e => onSubmitButton(e)}>↪</button>                        
                    </form>
                </div>
            </div>
        </div>
        <div className='map_cancel'>
          <button type='button' onClick={mapOff}>X</button>
        </div>
        <div className='map_confirm'>
          <button type='button' onClick={mapEnroll}>등록</button>
        </div>
      </div>
    );
  };
  
  export default CreateMap;