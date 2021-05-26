import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Modal, ModalBody } from "react-bootstrap";
import { PlusCircle, QuestionCircle, XCircle } from "react-bootstrap-icons";
import { useCookies } from "react-cookie";
import { Tooltip } from "reactstrap";
import "../css/Project.css";

const Project = () => {
  /**
   * Render projects on load
   */
  useEffect(() => {
    getAllProjects();
  }, []);

  /**
   * Render projects on page
   */
  const renderProject = (
    id: string,
    name: string,
    description: string,
    responsibilities: string,
    technologies: string,
    respositoryUrl: string,
    workProducts: string
  ) => {
    let project = document.querySelector(".projects");
    let card = document.createElement("div");
    let cardHeader = document.createElement("div");
    let cardBody = document.createElement("div");
    let nameHeader = document.createElement("h1");
    let descriptionContent = document.createElement("p");
    let responsibilitiesHeader = document.createElement("h5");
    let responsibilitiesContent = document.createElement("p");
    let technologiesHeader = document.createElement("h5");
    let technologiesContent = document.createElement("p");
    let respositoryUrlHeader = document.createElement("h5");
    let respositoryUrlContent = document.createElement("a");
    let workProductsHeader = document.createElement("h5");

    let deleteButton = document.createElement("button");
    let editButton = document.createElement("button");
    let buttonDiv = document.createElement("div");

    buttonDiv.style.float = "right";
    deleteButton.setAttribute("id", "delete-project");
    deleteButton.setAttribute("class", "btn btn-danger");
    editButton.setAttribute("id", "edit-button");
    editButton.setAttribute("class", "btn btn-secondary");
    card.setAttribute("class", "card");
    cardHeader.setAttribute("class", "card-header");
    cardBody.setAttribute("class", "card-body");
    respositoryUrlContent.setAttribute("href", respositoryUrl);
    respositoryUrlContent.setAttribute("target", "_blank");

    setId(id);
    setName(name);
    setDescription(description);
    setResponsibilities(responsibilities);
    setTechnologies(technologies);
    setRespositoryUrl(respositoryUrl);
    setWorkProducts(workProducts);

    nameHeader.innerHTML = name;
    descriptionContent.innerHTML = description;
    responsibilitiesHeader.innerHTML = "Responsibilities";
    responsibilitiesContent.innerHTML = responsibilities;
    technologiesHeader.innerHTML = "Technologies";
    technologiesContent.innerHTML = technologies;
    respositoryUrlHeader.innerHTML = "Repository URL";
    respositoryUrlContent.innerHTML = respositoryUrl;
    workProductsHeader.innerHTML = "Work Products";
    deleteButton.innerHTML = "Delete";
    editButton.innerHTML = "Edit";

    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    cardHeader.appendChild(nameHeader);
    nameHeader.appendChild(buttonDiv);
    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(deleteButton);
    card.appendChild(descriptionContent);
    card.appendChild(responsibilitiesHeader);
    card.appendChild(responsibilitiesContent);
    card.appendChild(technologiesHeader);
    card.appendChild(technologiesContent);
    card.appendChild(respositoryUrlHeader);
    card.appendChild(respositoryUrlContent);
    card.appendChild(workProductsHeader);
    let workProductsContent;
    if (workProducts !== null && workProducts !== "") {
      workProductsContent = document.createElement("img");
      workProductsContent.setAttribute("src", workProducts);
      card.appendChild(workProductsContent);
    }
    project?.appendChild(card);

    cardBody.style.whiteSpace = "pre-line";
    cardHeader.style.borderBottom = "5px solid rgb(115, 165, 194)";
    cardHeader.style.backgroundColor = "white";
    if (Number(project?.childElementCount) > 1) {
      card.style.marginTop = "50px";
    }
    // card.style.padding = "1em";
    // card.style.margin = "1em";
    editButton.style.marginRight = "10px";
    nameHeader.style.fontWeight = "bold";

    deleteButton.addEventListener("click", () => {
      handleShowModalDelete();
    });
    editButton.addEventListener("click", () => {
      handleShowModalEdit();
    });
  };

  /**
   * Show/Hide Modal
   */
  const [showModal, setShowModal] = useState(false);
  const handleHideModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const handleHideModalEdit = () => setShowModalEdit(false);
  const handleShowModalEdit = () => setShowModalEdit(true);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const handleHideModalDelete = () => setShowModalDelete(false);
  const handleShowModalDelete = () => setShowModalDelete(true);
  const [showDetails, setShowDetails] = useState(false);
  const handleCloseDetails = () => setShowDetails(false);
  const handleShowDetails= () => setShowDetails(true);

  /**
   * Tooltips
   */
  const [showAddTooltip, setShowAddTooltip] = useState(false);
  const toggleAddTooltip = () => setShowAddTooltip(!showAddTooltip);
  const [showDetailsTooltip, setShowDetailsTooltip] = useState(false);
  const toggleDetailsTooltip = () => setShowDetailsTooltip(!showDetailsTooltip);
  const [showEditTooltip, setShowEditTooltip] = useState(false);
  const toggleEditTooltip = () => setShowEditTooltip(!showEditTooltip);

  /**
   * 'Add project' state handling
   */
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [respositoryUrl, setRespositoryUrl] = useState("");
  const [workProducts, setWorkProducts] = useState("");
  
  const [cookie] = useCookies();
  /**
   * Get data from the database
   */
  const getAllProjects = async () => {
    axios
      .get("http://3.236.213.150:8081/projects/portfolio/all/"+cookie["portfolio"].id)
      .then((response) => {
        console.log("got data");
        console.log(response.data);
        response.data.map((data: any) => {
          renderProject(
            data.id,
            data.name,
            data.description,
            data.responsibilities,
            data.technologies,
            data.respositoryUrl,
            data.workProducts
          );
          console.log(data);
        });
      })
      .catch((error) => {
        console.log("did not get data");
      });
  };

  /**
   * Save data to database
   */
  const handleSave = async () => {
    //let portfolio = cookie["portfolio"]
    axios

      .post("http://3.236.213.150:8081/projects/", {
        name,
        description,
        responsibilities,
        technologies,
        respositoryUrl,
        workProducts,
        portfolio: cookie["portfolio"]
      })
      .then((response) => {
        console.log("success");
        setName("");
        setDescription("");
        setResponsibilities("");
        setTechnologies("");
        setRespositoryUrl("");
        setWorkProducts("");
        window.location.reload();
      })
      .catch((error) => {
        console.log("error");
      });
    setShowModal(false);
  };

  /**
   * Delete data from database
   */
  const handleDelete = async (id: string) => {
    axios
      .delete(`http://3.236.213.150:8081/projects/${id}`)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        window.location.reload();
      });
  };

  const handleUpdate = async (id: string) => {
    axios
      .post(`http://3.236.213.150:8081/projects/${id}`, {
        name,
        description,
        responsibilities,
        technologies,
        respositoryUrl,
        workProducts,
        portfolio: cookie["portfolio"]
      })
      .then((response) => {
        console.log("update: success");
        console.log(response.data.name);
        window.location.reload();
      })
      .catch((error) => {
        console.log("error");
      });
    setShowModalEdit(false);
  };

  /**
   * Details message
   */
  const messageDetails: string = "Enter information about your various projects here.";
  let rowLength = 5;

  return (
    <div className="container">
      <Card id="card-container">
        <Card.Header id="header-project">
          <h4>
            Project
            <QuestionCircle
              id="card-info"
              onClick={handleShowDetails}
            />
            <PlusCircle id="add-project" onClick={handleShowModal} />
            <Tooltip
              target="card-info"
              isOpen={showDetailsTooltip}
              toggle={toggleDetailsTooltip}
            >
              Details
            </Tooltip>
            <Tooltip
              target="add-project"
              isOpen={showAddTooltip}
              toggle={toggleAddTooltip}
            >
              Add Project
            </Tooltip>
          </h4>
        </Card.Header>
        <Modal show={showModal} onHide={handleHideModal} backdrop="static">
          <Modal.Header>
            <Modal.Title>Add Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form method="post">
              <h6 className="project-create-form-header">Project Name</h6>
              <input
                type="text"
                name="name"
                className="form-input"
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <h6 className="project-create-form-header">
                Project Description
              </h6>
              <textarea
                style={{ width: "100%" }}
                rows={rowLength}
                name="description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />
              <h6 className="project-create-form-header">Responsibilities</h6>
              <input
                type="text"
                name="responsibilities"
                className="form-input"
                onChange={(e) => setResponsibilities(e.target.value)}
              />
              <br />
              <h6 className="project-create-form-header">Technologies</h6>
              <input
                type="text"
                name="technologies"
                className="form-input"
                onChange={(e) => setTechnologies(e.target.value)}
              />
              <br />
              <h6 className="project-create-form-header">Project Repo URL</h6>
              <input
                type="text"
                name="respositoryUrl"
                className="form-input"
                onChange={(e) => setRespositoryUrl(e.target.value)}
              />
              <br />
              <h6 className="project-create-form-header">
                Project Work Products
              </h6>
              <input
                type="text"
                name="workProducts"
                className="form-input"
                onChange={(e) => setWorkProducts(e.target.value)}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleHideModal}>
              Close
            </Button>
            <Button
              className="oButton"
              variant="primary"
              onClick={() => {
                handleSave();
              }}
            >
              Add
            </Button>
          </Modal.Footer>
        </Modal>
        <Card.Body id="card-body">
          <Card.Text className="projects">
            {/* 'Delete' Modal */}
            <Modal
              show={showModalDelete}
              onHide={handleHideModalDelete}
              backdrop="static"
            >
              <Modal.Header>
                <Modal.Title>Delete Project?</Modal.Title>
              </Modal.Header>
              <Modal.Body className="modalBody">
                <div>
                  <p>Are you sure?</p>
                </div>
                <div>
                  <button
                    className="btn btn-primary"
                    // style={{ margin: "0.25em 0.25em" }}
                    onClick={() => {
                      handleDelete(id);
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className="btn btn-secondary"
                    // style={{ margin: "0.25em 0.25em" }}
                    onClick={handleHideModalDelete}
                  >
                    Cancel
                  </button>
                </div>
              </Modal.Body>
            </Modal>
            {/* 'Edit' Modal */}
            <Modal
              show={showModalEdit}
              onHide={handleHideModalEdit}
              backdrop="static"
            >
              <Modal.Header>
                <Modal.Title>Edit Project</Modal.Title>
              </Modal.Header>
              <Modal.Body className="modalBody">
                <form method="post">
                  <h6 className="project-edit-form-header">Project Name</h6>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    className="form-input"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <br />
                  <h6>Project Description</h6>
                  <textarea
                    style={{ width: "100%" }}
                    rows={rowLength}
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <br />
                  <h6>Responsibilities</h6>
                  <input
                    type="text"
                    name="responsibilities"
                    value={responsibilities}
                    className="form-input"
                    onChange={(e) => setResponsibilities(e.target.value)}
                  />
                  <br />
                  <h6>Technologies</h6>
                  <input
                    type="text"
                    name="technologies"
                    value={technologies}
                    className="form-input"
                    onChange={(e) => setTechnologies(e.target.value)}
                  />
                  <br />
                  <h6>Project Repo URL</h6>
                  <input
                    type="text"
                    name="respositoryUrl"
                    value={respositoryUrl}
                    className="form-input"
                    onChange={(e) => setRespositoryUrl(e.target.value)}
                  />
                  <br />
                  <h6>Project Work Products</h6>
                  <input
                    type="text"
                    name="workProducts"
                    value={workProducts}
                    className="form-input"
                    onChange={(e) => setWorkProducts(e.target.value)}
                  />
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleHideModalEdit}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  className="yes-button"
                  onClick={() => {
                    handleUpdate(id);
                  }}
                >
                  Update
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal show={showDetails} onHide={handleCloseDetails}>
                <Modal.Header>
                    <Modal.Title>Details</Modal.Title>
                    <XCircle id="work-experience-details" onClick={handleCloseDetails}/>
                </Modal.Header>
                <ModalBody>
                    <p>
                      <b>Roles/Responsibilities</b> - Mention your Roles in the Project and add at least 8 bulleted responsibilities
                      Talk about how you used different libraries, tools, and APIs (e.g. “Used the Collections framework and Stream API to store unique users and filter them by status”)
                      Include any metrics you have, like code coverage, code quality grades, build time, lines of code, etc (“Added unit tests to increase code coverage from 20% to 70%”)
                      Also, start your bullet points with the active past verbs (“built, created, implemented, etc…”).
                      <br/>
                      <br/>
                      <b>Project Repo URL</b> - Include Github Repo Links for your projects.
                      <br/>
                      <br/>
                      Your Project Repo Should be Public and the Repo name should be your Project Name.
                      <br/>
                      <br/>
                      Push your properly documented project code to the repo.
                      <br/>
                      <br/>
                      <b>Repo must have a README file with at least with</b> - Title of the Project, An Explanation and Overview of the project, List of features implemented, Technologies used, How to set up / get started using it, Usage of the project, Contributors, and License information.
                      <br/>
                      <br/>
                      Project architecture should be documented in a wiki.
                      <br/>
                      <br/>
                      You can have a look at the Sample README.md file template for your project documentation.
                    </p>
                </ModalBody>
            </Modal>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Project;
