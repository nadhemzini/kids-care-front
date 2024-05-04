import React, { useEffect, useState } from 'react'
import Buttons from './Buttons'
import Input from './Input'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IClass } from '../modals/IClass';
import { geteditClass, posteditClass } from '../services/ServicesClass';
import toast from 'react-hot-toast';
import { IEvenement } from '../modals/IEvenement';
import { geteditEvenement, posteditEvenement } from '../services/ServiceEvenement';

type GenericModal = {
    show: boolean
    handleClose: () => void
    id: number
}
function EditClass(props: GenericModal) {
    const [editData, setEditData] = useState<IEvenement>(
        {
            id: 0,
            title: '',
            description: '',
            start: new Date(),
            end: new Date()
        }
    );
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (editData.end < editData.start) {
            toast.error('End date cannot be earlier than start date');
            return;
        }
        try {
            await posteditEvenement(props.id, editData);
            toast.success('Evenement updated Successfully!')
            window.location.reload();
        } catch (error) {
            toast.error("Failed to update Evenement!");
        }
    };

    function handleTitleChange(e: React.FormEvent<HTMLFormElement>) {
        setEditData({
            ...editData,
            title: e.currentTarget.value
        });
    }
    function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setEditData({
            ...editData,
            description: e.currentTarget.value
        });
    }
    const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const startDate = new Date(e.target.value);
        setEditData({ ...editData, start: startDate });
    };
    const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const endDate = new Date(e.target.value);
        setEditData({ ...editData, end: endDate });
    };
    useEffect(() => {
        (async () => {
            try {
                const result = await geteditEvenement(props.id); // Make the API call
                console.log(result);
                setEditData(result.data.data);
            } catch (error: any) {
                console.error('Error fetching data:', error.message);
            }
        })();
    }, [props.id]);
    console.log(editData);

    return (
        <>

            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Class</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="basic-default-fullname">Title</label>
                            <Input value={editData.title} onChange={handleTitleChange} type="text" className="form-control" id="basic-default-fullname" placeholder="TITLE" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >description</label>
                            <textarea value={editData.description} onChange={handleDescriptionChange} className="form-control" id="basic-default-company" placeholder='description' />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >Date(start)</label>
                            <p className='font-weight-bold'>end:{editData.start.toString()}</p>
                            <Input type="datetime-local" onChange={handleStartChange} className="form-control" id="basic-default-company" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >Date(end)</label>
                            <p className='font-weight-bold'>end:{editData.end.toString()}</p>
                            <Input onChange={handleEndChange} type="datetime-local" className="form-control" id="basic-default-company" />
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

export default EditClass