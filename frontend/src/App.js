import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import New from './containers/New';
import New_lost from './containers/New_lost';
import New_found from './containers/New_found';
import Search from './containers/Search';
import Search_lost from './containers/Search_lost';
import Search_found from './containers/Search_found';
import Detail_lost from './containers/Detail_lost';
import Detail_found from './containers/Detail_found';
import Edit_lost from './containers/Edit_lost';
import Edit_found from './containers/Edit_found';
import Studentaid_lost from './containers/Studentaid_lost';
import Studentaid_found from './containers/Studentaid_found';
import Mypage from './containers/Mypage';
import MypageList from './containers/MypageList';
import Noti from './containers/Noti';
import Loading_lost from './containers/Loading_lost';
import Loading_found from './containers/Loading_found';

import { Provider } from 'react-redux';
import store from './store';

import Layout from './hocs/Layout';

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    {/*<Route exact path="/reset-password" component={ResetPassword} />
                    <Route exact path="/password/reset/confirm/:uid/:token" component={ResetPasswordConfirm} />*/}
                    <Route exact path="/activate/:uid/:token" component={Activate} />
                    <Route exact path="/new" component={New} />
                    <Route exact path="/new_lost" component={New_lost} />
                    <Route exact path="/new_found" component={New_found} />
                    <Route exact path="/search" component={Search} />
                    <Route exact path="/search_lost" component={Search_lost} />
                    <Route exact path="/search_found" component={Search_found} />
                    <Route exact path="/detail_lost" component={Detail_lost} />
                    <Route exact path="/detail_found" component={Detail_found} />
                    <Route exact path="/studentaid_lost" component={Studentaid_lost} />
                    <Route exact path="/studentaid_found" component={Studentaid_found} />
                    <Route exact path="/mypage" component={Mypage} />
                    <Route exact path="/mypage_list" component={MypageList} />
                    <Route exact path="/noti" component={Noti} />
                    <Route exact path="/loading_lost" component={Loading_lost} />
                    <Route exact path="/loading_found" component={Loading_found} />
                    <Route exact path='/edit_lost' component={Edit_lost} />
                    <Route exact path='/edit_found' component={Edit_found} />
                </Switch>
            </Layout>
        </Router>
    </Provider>
);

export default App;