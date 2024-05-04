import React, { useState } from 'react'
import Input from './Input'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IEvenement } from '../modals/IEvenement';
import toast from 'react-hot-toast';
import { AddEvenement } from '../services/ServiceEvenement';

type GenericModal = {
    show: boolean
    handleClose: () => void
}
function ModalEvenement(props: GenericModal) {
    const [AddEvenementData, setAddEvenementData] = useState<IEvenement>(
        {
            id: 0,
            title: '',
            description: '',
            start: new Date(),
            end: new Date()
        }
    );
    const handleTitleChange = ((e: React.FormEvent<HTMLFormElement>) => {
        setAddEvenementData({ ...AddEvenementData, title: e.currentTarget.value })
    });
    const handleDescriptionChange = ((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAddEvenementData({ ...AddEvenementData, description: e.currentTarget.value })
    });
    const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const startDate = new Date(e.target.value);
        setAddEvenementData({ ...AddEvenementData, start: startDate });
    };
    const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const endDate = new Date(e.target.value);
        setAddEvenementData({ ...AddEvenementData, end: endDate });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Validate end date
        if (AddEvenementData.end < AddEvenementData.start) {
            toast.error('End date cannot be earlier than start date');
            return;
        }
        try {
            await AddEvenement(AddEvenementData);
            toast.success('Evenement added Successfully!');
            window.location.reload();
        } catch (error) {
            toast.error("Failed to add Evenement!");
        }
    };
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Evenement</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="basic-default-fullname">Title</label>
                            <Input onChange={handleTitleChange} type="text" className="form-control" id="basic-default-fullname" placeholder="TITLE" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >description</label>
                            <textarea onChange={handleDescriptionChange} className="form-control" id="basic-default-company" placeholder='description' />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >Date(start)</label>
                            <Input onChange={handleStartChange} type="datetime-local" className="form-control" id="basic-default-company" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >Date(end)</label>
                            <Input onChange={handleEndChange} type="datetime-local" className="form-control" id="basic-default-company" />
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

export default ModalEvenement