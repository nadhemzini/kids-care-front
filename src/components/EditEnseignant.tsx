import React from 'react'
import Buttons from './Buttons'
import Input from './Input'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type GenericModal = {
    show: boolean
    handleClose: () => void
}
function EditEnseignant(props: GenericModal) {
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Enseignant</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form>
                        <label htmlFor="formFile" className="form-label">le photo d'Enseignant</label>
                        <input className="form-control" type="file" id="formFile" />

                        <div className="mb-3">
                            <label className="form-label" htmlFor="basic-default-fullname">Full Name</label>
                            <Input type="text" className="form-control" id="basic-default-fullname" placeholder="Nadhem zini" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >Matières d'enseignement</label>
                            <Input type="text" className="form-control" id="basic-default-company" placeholder="math" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >Gender</label>
                            <Input type="text" className="form-control" id="basic-default-company" placeholder=">mra" />
                        </div>
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditEnseignant