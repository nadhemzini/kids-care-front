import React, { ChangeEvent, useState } from 'react'
import Buttons from './Buttons'
import Input from './Input'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateReclamation } from '../services/ServiceReclamation';
import toast from 'react-hot-toast';

type GenericModal = {
    id?: number
    show: boolean
    handleClose: () => void
}
function ModalReclamation(props: GenericModal) {
    const [response, setResponse] = useState<string>('');
    console.log(response);
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setResponse(e.target.value);
    };
    console.log(response);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await updateReclamation(props.id!, response);
            toast.success('response ajoute');
            //window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Response</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label" >Response</label>
                            <textarea onChange={handleChange} className="form-control" id="basic-default-company" />
                        </div>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={props.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type='submit' onClick={props.handleClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </form>

                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalReclamation