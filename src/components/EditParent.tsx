import React, { useEffect, useState } from 'react'
import Buttons from './Buttons'
import Input from './Input'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IParent } from '../modals/IParent';
import { geteditParents, posteditParent } from '../services/ServicesParent';
import toast from 'react-hot-toast';

type GenericModal = {
    id: number
    show: boolean
    handleClose: () => void
}
function EditParent(props: GenericModal) {

    const [editData, setEditData] = useState<IParent>(
        {
            id: props.id,
            fullname: '',
            image: '',
            cin: '',
            telephone: '',
            email: '',
            ville: '',
            codepostal: '',
            gender: ''
        }
    );
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            await posteditParent(props.id, editData!);
            toast.success('Parent updated Successfully!')
        } catch (error) {
            toast.error("Failed to update Parent!");
        }
    };
    function handleFullnameChange(e: React.FormEvent<HTMLFormElement>) {
        setEditData({
            ...editData,
            fullname: e.currentTarget.value
        });
    }
    function handleCinChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setEditData({
            ...editData,
            cin: e.currentTarget.value
        });
    }
    function handleTelephoneChange(e: React.FormEvent<HTMLFormElement>) {
        setEditData({
            ...editData,
            telephone: e.currentTarget.value
        });
    }
    function handleEmailChange(e: React.FormEvent<HTMLFormElement>) {
        setEditData({
            ...editData,
            email: e.currentTarget.value
        });
    }
    function handleVilleChange(e: React.FormEvent<HTMLFormElement>) {
        setEditData({
            ...editData,
            ville: e.currentTarget.value
        });
    }
    function handleCodePostalChange(e: React.FormEvent<HTMLFormElement>) {
        setEditData({
            ...editData,
            codepostal: e.currentTarget.value
        });
    }
    function handleGenderChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setEditData({
            ...editData,
            gender: e.currentTarget.value
        });
    }
    useEffect(() => {
        (async () => {
            try {
                const result = await geteditParents(props.id); // Make the API call
                setEditData(result);
            } catch (error: any) {
                console.error('Error fetching data:', error.message);
            }
        })();
    }, [props.id]);
    return (
        <>

            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Parent</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="formFile" className="form-label">Image</label>
                        <input className="form-control" type="file" id="formFile" />

                        <div className="mb-3">
                            <label className="form-label" htmlFor="basic-default-fullname">Full Name</label>
                            <Input value={editData.fullname} type="text" className="form-control" onChange={handleFullnameChange} id="basic-default-fullname" placeholder="Nadhem zini" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >Email</label>
                            <Input type="email" value={editData.email} className="form-control" onChange={handleEmailChange} id="basic-default-company" placeholder="mohame@example.com" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >Télephone</label>
                            <Input type="text" className="form-control" value={editData.telephone} onChange={handleTelephoneChange} id="basic-default-company" placeholder="55893214" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >CIN</label>
                            <Input type="number" className="form-control" value={editData.cin} onChange={handleCinChange} id="basic-default-company" placeholder="12345678" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >Gender</label>
                            <select className="form-select" aria-label="Default select example" onChange={handleGenderChange}>
                                {editData.gender === 'Homme' && (
                                    <>
                                        <option value="Homme">Homme</option>
                                        <option value="Femme">Femme</option>
                                    </>
                                )}
                                {editData.gender === 'Femme' && (
                                    <>
                                        <option value="Femme">Femme</option>
                                        <option value="Homme">Homme</option>
                                    </>
                                )}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >Code Postale</label>
                            <Input type="text" value={editData.codepostal} className="form-control" onChange={handleCodePostalChange} id="basic-default-company" placeholder="5012" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >Ville</label>
                            <Input type="text" value={editData.ville} className="form-control" onChange={handleVilleChange} id="basic-default-company" placeholder="Sahline" />
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

export default EditParent