import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AccountLogin from "./AccountLogin";
import Project from "./Project";
import RevatureWorkExperience from "./RevatureWorkExperience";
import Landing from './Landing';
import ViewPortfolio from './ViewPortfolio';
import EditEmpPortfolio from './EditEmpPortfolio';
import AboutMe from "./AboutMe";
import OtherWorkExperience from "./OtherWorkExperience";
import Education from "./Education";
import HonorAward from "./HonorAward";



function Layout() {
    return (
          <div>
          <Route path="/login" exact component={AccountLogin} />
          <Route path="/projects" exact component={Project} />
          <Route path="/revature-work-experience" exact component={RevatureWorkExperience} />
          <Route path="/" exact component={Landing} />
          <Route path="/main" exact component={Landing} />
          <Route path="/portfolio" exact component={EditEmpPortfolio} />
          <Route path="/aboutMe" exact component={AboutMe} />
          <Route path="/view" component={ViewPortfolio} />
          <Route path="/other-work-experience" exact component={OtherWorkExperience} />
          <Route path="/education" component={Education} />
          <Route path="/honors" component={HonorAward} />

        </div>
          
    );
}

export default Layout;
