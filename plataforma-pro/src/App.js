import React, {Component} from 'react';
import './App.css';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import Header from './components/Header/Header';
import Actividad from './users/Actividad/Actividad';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {

  state = {
    sideDrawerOpen : false
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen : !prevState.sideDrawerOpen};
    });
  };

  render(){

    let sideDrawer;
    let backDrop;

    if(this.state.sideDrawerOpen){
      sideDrawer =  <SideDrawer click={this.drawerToggleClickHandler} />;
      backDrop = <Backdrop click={this.drawerToggleClickHandler} />;
    }


    return (
      <div >
        <Router>
          <Header click={this.drawerToggleClickHandler} />
          {sideDrawer}
          {backDrop}
          <main className="cuerpo">
            <Switch>
                <Route exact path="/actividad" component={Actividad} OnClick={this.drawerToggleClickHandler} />
            </Switch>
          </main>
        </Router>
      </div>
    );
  }
}

export default App;