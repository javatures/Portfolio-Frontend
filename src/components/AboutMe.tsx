import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { QuestionCircle, PlusCircle, Pencil, Trash } from 'react-bootstrap-icons';
import { Tooltip } from 'reactstrap';
import '../css/RevatureAboutMe.css';
import axios from 'axios'


const RevatureAboutMe = () => {
    // Model show and hide
    //*********************************************/
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [editShow, setEditShow] = useState(false);
    const handleEditShow = () => setEditShow(true);
    const handleEditClose = () => setEditShow(false)
    const [deleteShow, setDeleteShow] = useState(false)
    const handleDeleteShow = () => setDeleteShow(true)
    const handleDeleteClose = () => setDeleteShow(false)
    //***************************************************/

    // Tooltip for add and details buttons
    //***********************************************************************/
    const [addTooltipOpen, setAddTooltipOpen] = useState(false)
    const toggleAdd = () => setAddTooltipOpen(!addTooltipOpen)
    const [detailsTooltipOpen, setDetailsTooltipOpen] = useState(false)
    const toggleDetails = () => setDetailsTooltipOpen(!detailsTooltipOpen)
    const[editTooltipOpen, setEditToolTipOpen] = useState(false)
    const toggleEdit = () => setEditToolTipOpen(!editTooltipOpen)
    const [deleteToolTipOpen, setDeleteToolTipOpen] = useState(false)
    const toggleDelete = () => setDeleteToolTipOpen(!deleteToolTipOpen)
     //***********************************************************************/

    // Add about me state handling
    //***************************************************/
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [id, setID] = useState('')
    //***************************************************/


    const getButtons = () => {
        return(
            <Trash id="delete-aboutMe" onClick={handleDeleteShow}></Trash>
        )
    }

    //Render about me on page
    //*********************************************************************/
    const createAboutMe = (id: string, bio: string, email: string, phone: string) => {

        let aboutMe = document.querySelector('.about-me-content')
        let div = document.createElement('div')

        
            let bioHeader = document.createElement('p')
            let emailHeader = document.createElement('h6')
            let phoneHeader = document.createElement('h6')
            let icon = document.createElement('svg')
            
            
            setID(id)
            console.log(id)
            bioHeader.innerHTML = bio
            setBio(bio)
            console.log(bio)
            emailHeader.innerHTML = "Email: " + email
            setEmail(email)
            console.log(email)
            phoneHeader.innerHTML = "Phone: " + phone
            setPhone(phone)
            console.log(phone)
            
            // <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
            // <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
            // </svg>      

            bioHeader.style.whiteSpace = "pre-wrap"
            bioHeader.style.marginBottom = "50px"
            emailHeader.style.color = "grey"
            phoneHeader.style.color = "grey"
            icon.style.color = "#42a5f5"
            icon.setAttribute("class", "bi bi-pencil")
            icon.setAttribute("value", id)


            div.appendChild(bioHeader)
            div.appendChild(emailHeader)
            div.appendChild(phoneHeader)
            div.appendChild(icon)
            aboutMe?.appendChild(div) 

        
        div.style.padding = "5px"
        // div.style.border = "2px solid black"
        div.style.marginBottom = "10px"
    }
    //*********************************************************************/

    // Save data to database (update)
    //***************************************************/
    // const handleSave = () => {
    //     let exp: Array<string> = [
    //         bio,
    //         email,
    //         phone
    //     ]
    //     setShow(false)
    //     console.log(exp)
    // }

    // POST METHOD

    const handleUpdate = async () => {
        
        axios.post("http://3.236.213.150:8081/aboutMe", {bio, email, phone})
        .then(response => {
            console.log("success") 
            console.log(response.data)
            window.location.reload()
        })
        .catch(error => {
            console.log("error")
        })
        setShow(false)
        setEditShow(false)
    }

    const updateState = (bio:string, email: string, phone: string) => {
        setBio(bio);
        setEmail(email);
        setPhone(phone);
    }

    //GET METHOD

    const handleGet = async () =>{
        axios.get("http://3.236.213.150:8081/aboutMe")
        .then(response => {
            console.log("got the data")
            console.log(response.data)
            response.data.map((data: any) => {
                console.log(data)
                createAboutMe(data.id, data.bio, data.email, data.phone)
            })
        })
        .catch(error => {
            console.log("failure")
        })
    }

    useEffect(()=> {handleGet()},[]);

    // DELTE METHOD

    const handleDelete = (id: number) => {
        console.log("this is the id " + id)
        axios.delete("http://3.236.213.150:8081/aboutMe/${id}")
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log("delete failure")
        })
        setDeleteShow(false)
    }

    // Information meassage
    const message: string = "This section is used to focus on your personal story and career goals. \n\n How did you first get started with coding? \n What was your favorite project to see come to completion?"
    const editMessage: string = "this is the edit bio button"
    let rowLength = 5
    let columnLength = 47

    return (
        <div className="container">
            <Card id="card-container">
                <Card.Header id="header">
                    <h4>
                        About Me
                        <QuestionCircle id="card-info" onClick={() => (alert(message))} />
                        <PlusCircle id="add-aboutMe" onClick={handleShow} />
                        <Tooltip target="add-aboutMe" isOpen={addTooltipOpen} toggle={toggleAdd}>Add</Tooltip>
                        <Tooltip target="card-info" isOpen={detailsTooltipOpen} toggle={toggleDetails}>Details</Tooltip>
                    </h4>
                </Card.Header>

                {/* modal for add */}

                <Modal show={show} onHide={handleClose} backdrop="static" className="myModal">
                    <Modal.Header>
                        <Modal.Title>About Me</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modalBody">
                        <form method="post">
                            <h6>Bio</h6>
                            <textarea style={{width: "100%"}} name="bioName" rows={rowLength} onChange={e => setBio(e.target.value)}></textarea>
                            <h6>Email</h6>
                            <input type="email" name="fromDate" className="form-input" id="" onChange={e => setEmail(e.target.value)}/><br />
                            <h6>Phone #</h6>
                            <input type="text" name="toDate" className="form-input" id="" onChange={e => setPhone(e.target.value)}/><br />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => {handleUpdate();}}>Save</Button>
                    </Modal.Footer>
               
                </Modal>
                <Card.Body>
                    <Card.Text>
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                        </svg>
                        <span className="about-me-content"></span>
                        <Trash id="delete-aboutMe" onClick={handleDeleteShow}></Trash>
                        <Pencil id="edit-aboutMe" onClick={handleEditShow}></Pencil>
                        <Tooltip target="edit-aboutMe" isOpen={editTooltipOpen} toggle={toggleEdit}>Edit</Tooltip>
                        <Tooltip target="delete-aboutMe" isOpen={deleteToolTipOpen} toggle={toggleDelete}>Delete</Tooltip>

                        {/* Modal for Edit */}

                        <Modal show={editShow} onHide={handleEditClose} backdrop="static">
                            <Modal.Header>
                                <Modal.Title>About Me</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="modalBody">
                                <form method="post">
                                    <h6>Bio</h6>
                                    <textarea style={{width: "100%"}} name="bioName" rows={rowLength} value={bio} onChange={e => setBio(e.target.value)}></textarea>
                                    <h6>Email</h6>
                                    <input type="email" name="fromDate" className="form-input" id="" value={email} onChange={e => setEmail(e.target.value)}/><br />
                                    <h6>Phone #</h6>
                                    <input type="tel" name="toDate" className="form-input" id="" value={phone} onChange={e => setPhone(e.target.value)}/><br />
                                </form>
                            </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleEditClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={() => {handleUpdate();}}>Update</Button>
                                </Modal.Footer>
                        </Modal>

                        {/* modal for delete */}

                        <Modal show={deleteShow} onHide={handleDeleteClose} backdrop="static">
                            <Modal.Header>
                                <Modal.Title>Delete Warning</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="modalBody">
                                <h2>This will permanantly delete this info. Are you Sure?</h2>
                            </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="danger" onClick={() => {handleDelete(1);}}>Yes, Permanantly Delete</Button>
                                    <Button variant="secondary" onClick={handleDeleteClose}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                        </Modal>

                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default RevatureAboutMe