import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import store from '../store';
import { loadSchools } from '../reducers/schools';
import { loadStudents } from '../reducers/students';

import Schools from './Schools';
import CreateSchool from './CreateSchool';
import UpdateSchool from './UpdateSchool';
import Students from './Students';
import CreateStudent from './CreateStudent';
import UpdateStudent from './UpdateStudent';
import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import NoMatch from './NoMatch';




class App extends Component {

  componentDidMount() {
    store.dispatch(loadSchools())
    store.dispatch(loadStudents())
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route path="/" component={Nav}/>
          <div className="nav-spacer"></div>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/schools" component={Schools} />
              <Route path="/schools/create" component={CreateSchool} />
              <Route path="/schools/:id" component={UpdateSchool} />
              <Route exact path="/students" component={Students} />
              <Route exact path="/students/create" component={CreateStudent} />
              <Route path="/students/create/:id" component={CreateStudent} />
              <Route path="/students/:id" component={UpdateStudent} />
              <Route component={NoMatch} />
            </Switch>
        </div>
      </Router>
    )
  }

}


export default App;
