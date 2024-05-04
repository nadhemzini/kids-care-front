import React, { useState } from 'react'
import Buttons from './Buttons'
import Input from './Input'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IMatiere } from '../modals/IMatiere';
import { AddMatiere } from '../services/ServicesMatiere';
import toast from 'react-hot-toast';

type GenericModal = {
    show: boolean
    handleClose: () => void
};

function ModalMatiere(props: GenericModal) {
    const [AddMatiereData, setAddMatiereData] = useState<IMatiere>(
        {
            id: 0,
            codematiere: '',
            nommatiere: ''
        }
    );
    const handleCodeChange = ((e: React.FormEvent<HTMLFormElement>) => {
        setAddMatiereData({ ...AddMatiereData, codematiere: e.currentTarget.value })
    });
    const handleNomChange = ((e: React.FormEvent<HTMLInputElement>) => {
        setAddMatiereData({ ...AddMatiereData, nommatiere: e.currentTarget.value })
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await AddMatiere(AddMatiereData);
            toast.success('Matiere added Successfully!')
        } catch (error) {
            toast.error("Failed to add Matiere!");
        }
    };
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Matiere</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="basic-default-fullname">code de matiere</label>
                            <Input type="text" onChange={handleCodeChange} className="form-control" id="basic-default-fullname" placeholder="xs12" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >nom de matiére</label>
                            <Input type="text" onChange={handleNomChange} className="form-control" id="basic-default-company" placeholder="math" />
                        </div>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={props.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={props.handleClose} type='submit'>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalMatiere