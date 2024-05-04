import React, { useState } from 'react'
import Input from './Input'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IClass } from '../modals/IClass';
import { AddClass } from '../services/ServicesClass';
import toast from 'react-hot-toast';

type GenericModal = {
    show: boolean
    handleClose: () => void
}

function ModalClass(props: GenericModal) {
    const [AddClassData, setAddClassData] = useState<IClass>(
        {
            id: 0,
            nom_de_class: '',
            emploi_de_temps: ''
        }
    );

    const handleNomClassChange = ((e: React.FormEvent<HTMLFormElement>) => {
        setAddClassData({ ...AddClassData, nom_de_class: e.currentTarget.value })
    });
    const handleEmploiChange = ((e: React.FormEvent<HTMLInputElement>) => {
        setAddClassData({ ...AddClassData, emploi_de_temps: e.currentTarget.value })
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await AddClass(AddClassData);
            toast.success('Class added Successfully!');
            window.location.reload();
        } catch (error) {
            toast.error("Failed to add Class!");
        }
    };
    return (
        <>

            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Enfant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="basic-default-fullname">Nom de Class</label>
                            <Input onChange={handleNomClassChange} type="text" className="form-control" id="basic-default-fullname" placeholder="Nadhem zini" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">L'Emploi de temps</label>
                            <input onChange={handleEmploiChange} className="form-control" type="file" id="formFile" />
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

export default ModalClass