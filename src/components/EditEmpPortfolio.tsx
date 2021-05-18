import React from 'react';
import RevatureWorkExp from './RevatureWorkExperience';
import "../css/EditEmpPortfolio.css"
import { Link } from 'react-router-dom';
import AboutMe from './AboutMe';
import Project from './Project';
import OtherWorkExperience from './OtherWorkExperience';
import Education from './Education';
import HonorAwards from './HonorAward';
import IndustryEquivalency from './IndustryEquivalency';


const EditEmpPortfolio = () => {
    return (
        <div>
            <div className="container mb-5 mt-5" id="editPortfolioButtons">
                <button className="btn btn-primary m-1">Submit for Review</button>
                <Link to="/view">
                    <button className="btn btn-primary m-1">View Portfolio</button>
                </Link>
                <button className="btn btn-primary m-1">Back</button>
            </div>
            <IndustryEquivalency /> <br />
            <AboutMe /> <br/>
            <RevatureWorkExp /> <br/>
            <Project />
            <OtherWorkExperience />
            <Education />
            <HonorAwards />
        </div>
    );
};

export default EditEmpPortfolio;