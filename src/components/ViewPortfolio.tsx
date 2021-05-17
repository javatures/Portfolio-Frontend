import { Link } from "react-router-dom";
import AboutMeView from "./AboutMeView";
import RevatureWorkExperienceView from "./RevatureWorkExperienceView"

const ViewPortfolio = () => {
    return (
        <div>
            <div className="container mb-5 mt-5" id="editPortfolioButtons">
                <Link to="/portfolio">
                    <button className="btn btn-primary m-1">Back</button>
                </Link>
            </div>
            <AboutMeView />
            <RevatureWorkExperienceView/>
        </div>
    );
}

export default ViewPortfolio;