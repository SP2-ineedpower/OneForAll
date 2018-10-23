import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.css';


import Home from './componants/Home';
import Userpage from './componants/Userpage';
import Projectpage from './componants/Projectpage';
import Errorpage from './componants/Error';


class Application extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/Userpage" component={Userpage} />
            <Route path="/Projectpage" component={Projectpage} />
            <Route component={Errorpage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}



ReactDOM.render(
  <Application />,
  document.getElementById('root')
);
