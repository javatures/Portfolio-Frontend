import React from "react";
import { Route } from "react-router-dom";
import Landing from './Landing';
import ViewPortfolio from './ViewPortfolio';
import EditEmpPortfolio from './EditEmpPortfolio';
import AboutMe from "./AboutMe";
import TestComponent from "./TestComponent";
import PortfolioList from "./PortfolioList";

function Layout() {
    return (
        <div>
          <Route exact path="/" component={Landing} />
          <Route path="/main" component={Landing} />
          <Route path="/portfolio" component={EditEmpPortfolio} />
          <Route path="/view" component={ViewPortfolio} />
          <Route path="/test" component={TestComponent} />
          <Route path="/list" component={PortfolioList} />
        </div>
          
    );
}

export default Layout;
