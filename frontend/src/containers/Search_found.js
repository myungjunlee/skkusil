import React, { useState, useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { read } from '../actions/post';
import { detail } from '../actions/apost';
import '../style/search_lost.css';
import cssImage from '../img/skkulogo.png';

const Search_found = ({ isAuthenticated, lists, read, detail }) => {
    let history = useHistory();
    const [linkSAF, setLinkSAF] = useState(false);

    if (lists !== null && lists !=='' && lists.length > 1) {
        if (lists[0].id < lists[1].id) {
            lists.sort((a, b) => b.id - a.id);
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            document.body.className='SL-body';
        }
    });

    useEffect(() => {
        read();
    }, []);
    
    const [searchItem, setSearchItem] = useState("");
    
    const [selectedFilter, setSelectedFilter] = useState({
        lost_found:'',
        campus:'',
        building:'',
        item:'',
        color:'',
        date:''
    });

    const [filterList, setFilterList] = useState(lists);

    useEffect(() => {
        setFilterList(lists)
    }, [lists]);

    const {lost_found, campus, building, item, color, date} = selectedFilter;

    if (!isAuthenticated) {
        return <Redirect to = '/login' />
    }

    if (linkSAF) {
        return <Redirect to = '/studentaid_found' />
    };

    const handleSearch = (e) => {
        setSearchItem(e.target.value);
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        let searchList = lists;
        if (searchItem) {
            
            searchList = searchList.filter((list) => list.location.match(searchItem));

            if (Object.keys(searchList).length === 0) {
                searchList = lists;
                searchList = searchList.filter((list) => list.content.match(searchItem));

                if (Object.keys(searchList).length === 0) {
                    searchList = lists;
                    searchList = searchList.filter((list) => list.title.match(searchItem));

                    if (Object.keys(searchList).length === 0) {
                        searchList = lists;
                        searchList = searchList.filter((list) => list.item.match(searchItem));

                        if (Object.keys(searchList).length === 0) {
                            searchList = lists;
                            searchList = searchList.filter((list) => list.building.match(searchItem));
                        }
                    }
                }
                
            }
        }
        setFilterList(searchList);
    }

    const filtering = () => {
        let filteringList = lists;
        if (lost_found) {
            filteringList = filteringList.filter((list) => list.lost_found === lost_found);
        }
        if (campus) {
            filteringList = filteringList.filter((list) => list.campus === campus);
        }
        if (building) {
            filteringList = filteringList.filter((list) => list.building === building);
        }
        if (item) {
            filteringList = filteringList.filter((list) => list.item === item);
        }
        if (color) {
            filteringList = filteringList.filter((list) => list.color === color);
        }
        if (date) {
            filteringList = filteringList.filter((list) => list.date === date);
        }
        setFilterList(filteringList);
    }

    const handleChange = (e) => {
        setSelectedFilter({...selectedFilter, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        filtering();
    }

    let renderList = filterList.map((list) => {
        
        if (list.lost_found === 'F') {
            return (
                <Link
                    to= '/loading_found'
                    onClick={e => getDetail(list.id, e)}
                    >
                    {/* ??????????????? - ?????? ????????? indiItem */}
                    <ul className="indi_list">
                        <li>
                            <div className="indItem_img">
                                <img src={list.image !== null ? list.image : cssImage} />
                            </div>
                            <div className="indItem-info">
                                <span className="indItem-name"> {list.title} </span>
                                <span className="indItem-date"> {list.create_date.slice(0,10)} </span>
                                <br/>
                                <br/>
                                <div className="indItem-loca"> [{list.campus === 'M' ? '?????? ?????????' : '?????? ?????????'} / {list.building}]</div>
                                <span className="indItem-sort"> {list.item} </span>
                                <span className="indItem-color"> {list.color} </span>
                            </div>
                        </li>
                    </ul>
                </Link>
            );
        }
    });

    const getDetail = (id, e) => {
            detail(id);
        };

    const studentAidFound = (e) => {
        e.preventDefault();
        setLinkSAF(true);
    };

    const goBack = () => {
        history.goBack();
    };

    return(

        <div>
            {/* header */}
            <div className="SL-header">
                {/* ???????????? ?????? */}
                <div className="SL-back">
                    <button onClick={goBack}><i className="fa fa-chevron-left"></i></button>
                </div>
                <h2>????????? ?????????</h2>
                <div className="SL-filter">
                    {/* <a href="./filter.html"> */}
                        <button>Filter</button>
                        {/* </a> */}
                </div>
            </div>
            {/* ????????? / search_container */}
            <form onSubmit= {e => handleSearchSubmit(e)}>
                <div className="SL-search_container">
                    <input 
                        type="text"
                        value={searchItem}
                        className="SL-search_text" 
                        placeholder="????????? ??????"
                        onChange= {e => handleSearch(e)}
                    />
                    <button type="submit" className="SL-search_btn">??????</button>
                </div> 
            </form>
            {/* ?????? ?????? search_option (??????????????? or ???????????????) */}
            <div className="SL-search_option">
                <button type="button" className="SL-Indi_btn SL-circle_btn">???????????????</button>
                <button type="button" className="SL-Offi_btn" onClick={e => studentAidFound(e)}>???????????????</button>
            </div>
            {/* ??????????????? ?????? ??? indi_list */}
            <div className="indi_item">
                {renderList}
            </div>
        </div>

        // <form onSubmit={e => handleSubmit(e)}>
        //     <label>
        //         FILTER
        //         <select name="lost_found" value={lost_found} onChange= {e => handleChange(e)}>
        //             <option value="">??????/??????</option>
        //             <option value="?????????">?????????</option>
        //             <option value="?????????">?????????</option>
        //         </select>
        //         <select name="campus" value={campus} onChange= {e => handleChange(e)}>
        //             <option value="">?????????</option>
        //             <option value="??????">??????</option>
        //             <option value="??????">??????</option>
        //         </select>
        //         <select name="building" value={building} onChange= {e => handleChange(e)}>
        //             <option value="">??????</option>
        //             <option value='???????????????'>???????????????</option>
        //             <option value='?????????'>?????????</option>
        //             <option value='???????????????'>???????????????</option>
        //             <option value='?????????'>?????????</option>
        //             <option value='?????????'>?????????</option>
        //             <option value='?????????'>?????????</option>
        //             <option value='?????????????????????'>?????????????????????</option>
        //             <option value='600?????? ?????????'>600?????? ?????????</option>
        //             <option value='????????????'>????????????</option>
        //             <option value='????????????'>????????????</option>
        //             <option value='?????????'>?????????</option>
        //             <option value='?????? (?????? ??????)'>?????? (?????? ??????)</option>
        //         </select>
        //         <select name="item" value={item} onChange= {e => handleChange(e)}>
        //             <option value="">?????? ??????</option>
        //             <option value="????????????">????????????</option>
        //             <option value="??????/?????????">??????/?????????</option>
        //             <option value="??????/?????????">??????/?????????</option>
        //             <option value="??????">??????</option>
        //         </select>
        //         <select name="color" value={color} onChange= {e => handleChange(e)}>
        //             <option value="">??????</option>
        //             <option value="?????????">?????????</option>
        //             <option value="?????????">?????????</option>
        //         </select>
        //         <input type="date" placeholder="??????" name="date" value={date} onChange = {e => handleChange(e)}></input>
        //     </label>
        //     <input type="submit" value="Submit" />
        // </form>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    lists: state.post._datas
});

export default connect(mapStateToProps, {read, detail})(Search_found);