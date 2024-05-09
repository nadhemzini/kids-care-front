import React, { ChangeEvent, useState } from 'react'
import Buttons from './Buttons'
import Input from './Input'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IParent } from '../modals/IParent';
import { AddParent } from '../services/ServicesParent';
import toast from 'react-hot-toast';

type GenericModal = {
    show: boolean
    handleClose: () => void
}
function ModalParent(props: GenericModal) {
    const [AddParentData, setAddParentData] = useState<IParent>(
        {
            id: 0,
            fullname: '',
            image: null,
            telephone: '',
            cin: '',
            ville: '',
            codepostal: '',
            gender: '',
            email: ''
        }
    );
    const handlefullNameChange = ((e: React.FormEvent<HTMLFormElement>) => {
        setAddParentData({ ...AddParentData, fullname: e.currentTarget.value })
    });
    const handleImageChange = ((e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setAddParentData({ ...AddParentData, image: file })
        } else {
            toast.error('Please select an image') // Add error toast message
        }
    });
    const handleEmailChange = ((e: React.FormEvent<HTMLFormElement>) => {
        setAddParentData({ ...AddParentData, email: e.currentTarget.value })
    });
    const handleVilleChange = ((e: React.FormEvent<HTMLFormElement>) => {
        setAddParentData({ ...AddParentData, ville: e.currentTarget.value })
    });
    const handleCinChange = ((e: React.FormEvent<HTMLFormElement>) => {
        setAddParentData({ ...AddParentData, cin: e.currentTarget.value })
    });
    const handleCodePostaleChange = ((e: React.FormEvent<HTMLFormElement>) => {
        setAddParentData({ ...AddParentData, codepostal: e.currentTarget.value })
    });
    const handleGenderChange = ((e: React.ChangeEvent<HTMLSelectElement>) => {
        setAddParentData({ ...AddParentData, gender: e.currentTarget.value })
    });
    const handleTelephoneChange = ((e: React.FormEvent<HTMLFormElement>) => {
        setAddParentData({ ...AddParentData, telephone: e.currentTarget.value })
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('cin', AddParentData.cin);
        formData.append('codepostal', AddParentData.codepostal);
        formData.append('email', AddParentData.email);
        formData.append('fullname', AddParentData.fullname);
        formData.append('gender', AddParentData.gender);
        formData.append('telephone', AddParentData.telephone);
        formData.append('ville', AddParentData.ville);
        console.log(AddParentData.image);
        if (AddParentData.image) {
            formData.append('image', AddParentData.image);
        }

        try {

            // Convert FormData to Iparent

            console.log(formData)
            await AddParent(formData);
            // props.addOneparent(AddParentData);
            toast.success('parent added Successfully!');

            window.location.reload();
        } catch (error) {
            toast.error('Failed to add parent!' + error);
        }
    };



    return (

        <>

            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Parent</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="formFile" className="form-label">Image</label>
                        <input className="form-control" onChange={handleImageChange} type="file" id="formFile" />

                        <div className="mb-3">
                            <label className="form-label" htmlFor="basic-default-fullname">Full Name</label>
                            <Input type="text" onChange={handlefullNameChange} className="form-control" id="basic-default-fullname" placeholder="Nadhem zini" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >Email</label>
                            <Input type="email" onChange={handleEmailChange} className="form-control" id="basic-default-company" placeholder="mohame@example.com" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >CIN</label>
                            <Input type="text" onChange={handleCinChange} className="form-control" id="basic-default-company" placeholder="12345678" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >Gender</label>
                            <select className="form-select" aria-label="Default select example" onChange={handleGenderChange}>
                                <option >select </option>
                                <option value="Femme">Femme </option>
                                <option value="Homme">Homme</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >Code Postale</label>
                            <Input type="text" onChange={handleCodePostaleChange} className="form-control" id="basic-default-company" placeholder="5012" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >Ville</label>
                            <Input type="text" className="form-control" onChange={handleVilleChange} id="basic-default-company" placeholder="Sahline" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="basic-default-phone">Phone No</label>
                            <Input type="text" id="basic-default-phone" onChange={handleTelephoneChange} className="form-control phone-mask" placeholder="658 799 8941" />
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

export default ModalParent