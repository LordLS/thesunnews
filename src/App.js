import React from 'react'
import PubFeed from './containers/PubFeed'
import CreatePub from './containers/CreatePub'
import UpdatePub from './containers/UpdatePub'
import CreateColumn from './containers/CreateColumn'
import PubHome from './containers/Home/Home'
import PubDetail from './containers/PubDetails'
import PubSection from './containers/PubSection'
import UserPub from './containers/UserPub'
import SignUp from './containers/SignUp'
import Login from './containers/Login'
import UserProfile from './containers/UserProfile'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import Layout from './containers/Layout'
import PrivateRoute from './components/PrivateRoute'

function App() {
  document.title= 'The Sun News'
  return (
    <div>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={PubHome}/>
            <Route path="/userprofile/" component={UserProfile} />
            <Route path="/login/" component={Login} />
            <Route path="/signup/" component={SignUp} />
            <Route path="/feed/" component={PubFeed} />
            <PrivateRoute path="/mypublication" component={UserPub} />
            <PrivateRoute path="/createpublication/" component={CreatePub} />
            <PrivateRoute path="/createColumn/" component={CreateColumn} />
            <PrivateRoute path="/:pubsection/:pubid/update/" component={UpdatePub} />
            <Route path="/:pubsection/:pubid/" component={PubDetail} />
            <Route path="/:pubsection" component={PubSection} />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
