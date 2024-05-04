import React, { useEffect, useState } from 'react'
import Buttons from './Buttons'
import Input from './Input'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { geteditAdmin, posteditAdmin } from "../services/ServicesAdmin";
import { IAdmin } from '../modals/IAdmin';
import toast from 'react-hot-toast';
type GenericModal = {
    show: boolean
    handleClose: () => void
    id: number
}

function EditAdmin(props: GenericModal) {


    const [editData, setEditData] = useState<IAdmin>(
        {
            id: props.id,
            fullname: '',
            image: null,
            role: '',
            gender: '',
            telephone: '',
            email: ''
        }
    );


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            await posteditAdmin(props.id, editData!);
            toast.success('Admin updated Successfully!')
        } catch (error) {
            toast.error("Failed to update admin!");
        }
    };

    function handleFullnameChange(e: React.FormEvent<HTMLFormElement>) {
        setEditData({
            ...editData,
            fullname: e.currentTarget.value
        });
    }
    function handleEmailChange(e: React.FormEvent<HTMLFormElement>) {
        setEditData({
            ...editData,
            email: e.currentTarget.value
        });
    }
    function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setEditData({
            ...editData,
            role: e.currentTarget.value
        });
    }
    function handleGenderChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setEditData({
            ...editData,
            gender: e.currentTarget.value
        });
    }
    function handleTelephoneChange(e: React.FormEvent<HTMLFormElement>) {
        setEditData({
            ...editData,
            telephone: e.currentTarget.value
        });
    }

    useEffect(() => {
        (async () => {
            try {
                const result = await geteditAdmin(props.id); // Make the API call
                setEditData(result);
            } catch (error: any) {
                console.error('Error fetching data:', error.message);
            }
        })();
    }, [props.id]);

    console.log(editData);
    console.log(editData?.fullname);




    return (

        <>

            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>EditAdmin</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <form onSubmit={handleSubmit}>

                        <label htmlFor="formFile" className="form-label">le photo d'éleve</label>
                        <input className="form-control" type="file" id="formFile" />

                        <div className="mb-3">
                            <label className="form-label" htmlFor="basic-default-fullname">Full Name</label>
                            <Input type="text" value={editData?.fullname} onChange={(handleFullnameChange)} className="form-control" id="basic-default-fullname" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" >Email</label>
                            <Input type="email" value={editData?.email} onChange={handleEmailChange} className="form-control" id="basic-default-company" placeholder="zini159@example.com" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >Role</label>
                            <select value={editData?.role} className="form-select" aria-label="Default select example" onChange={handleRoleChange}>
                                {editData.role === 'Admin' && (
                                    <>
                                        <option value="Admin">Admin</option>
                                        <option value="SuperAdmin">SuperAdmin</option>
                                    </>
                                )}
                                {editData.role === 'SuperAdmin' && (
                                    <>
                                        <option value="SuperAdmin">SuperAdmin</option>
                                        <option value="Admin">Admin</option>
                                    </>
                                )}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >Gender</label>
                            <select value={editData?.gender} className="form-select" aria-label="Default select example" onChange={handleGenderChange}>
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
                            <label className="form-label" htmlFor="basic-default-phone">Phone No</label>
                            <Input type="text" value={editData?.telephone} onChange={handleTelephoneChange} id="basic-default-phone" className="form-control phone-mask" placeholder="658 799 8941" />
                        </div>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={props.handleClose}>
                                Close
                            </Button>
                            <Button type='submit' onClick={props.handleClose} variant="primary" >
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </form>

                </Modal.Body>

            </Modal>

        </>
    )
}

export default EditAdmin