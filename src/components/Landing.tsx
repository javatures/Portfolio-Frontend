import React, { useState } from 'react';
import AccountLogin from './AccountLogin';
import '../css/Landing.css';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AccountRegistration from './AccountRegistration';

const Landing = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="centering">
            <div className="container col-xxl-12 col-xxl-12">
                <div className="row align-items-center">
                    <Modal show={show} onHide={handleClose} backdrop="static">
                        <Modal.Header>
                            <Modal.Title>Account Registration</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AccountRegistration />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                    <div className="col-lg-5 text-center text-lg-start">
                        <h3 className="mb-4">Portfolio</h3>
                        <p className="col-lg-10 fs-4">Welcome to Portfolio. if this is your first time here please register. Otherwise login to view your portfolios.</p>
                        <button onClick={handleShow} className="btn btn-primary">Register</button>
                    </div>
                    <div className="col-md-10 col-lg-7">
                        <AccountLogin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;