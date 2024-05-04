import React, { ChangeEvent, useEffect, useState } from 'react'
import Buttons from './Buttons'
import Input from './Input'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getAllClass } from '../services/ServicesClass';
import { IClass } from '../modals/IClass';
import { getAllParent } from '../services/ServicesParent';
import { IParent } from '../modals/IParent';
import { IEnfant } from '../modals/IEnfant';
import toast from 'react-hot-toast';
import { AddEnfant } from '../services/ServiceEnfant';

type GenericModal = {
    show: boolean
    handleClose: () => void
}

function ModalEnfant(props: GenericModal) {


    const [AddEnfantData, setAddEnfantData] = useState<IEnfant>(
        {
            id: 0,
            fullname: '',
            image: null,
            gender: '',
            parent_id: 0,
            class_id: 0,
            parents: {} as IParent,
            classes: {} as IClass,
        }
    );
    const handlefullNameChange = ((e: React.FormEvent<HTMLFormElement>) => {
        setAddEnfantData({ ...AddEnfantData, fullname: e.currentTarget.value })
    });
    const handleImageChange = ((e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setAddEnfantData({ ...AddEnfantData, image: file })
        } else {
            toast.error('Please select an image') // Add error toast message
        }
    });
    const handleGenderChange = ((e: React.ChangeEvent<HTMLSelectElement>) => {
        setAddEnfantData({ ...AddEnfantData, gender: e.currentTarget.value })
    });

    const handleParentChange = ((e: React.ChangeEvent<HTMLSelectElement>) => {
        setAddEnfantData({ ...AddEnfantData, parent_id: +(e.currentTarget.value) })
    });

    const handleClassChange = ((e: React.ChangeEvent<HTMLSelectElement>) => {
        setAddEnfantData({ ...AddEnfantData, class_id: +(e.currentTarget.value) })
    });
    console.log(AddEnfantData.class_id);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('fullname', AddEnfantData.fullname);
        formData.append('gender', AddEnfantData.gender);
        formData.append('parent_id', AddEnfantData.parent_id.toString());
        formData.append('class_id', AddEnfantData.class_id.toString());
        console.log(AddEnfantData.image);
        if (AddEnfantData.image) {
            formData.append('image', AddEnfantData.image);
        }
        try {
            await AddEnfant(formData);
            console.log(AddEnfantData);
            toast.success('enfant added Successfully!');

            window.location.reload();
        } catch (error) {
            toast.error("Failed to add enfant!");
        }
    };
    const [data, setData] = useState<IClass[]>();
    const [parent, setParent] = useState<IParent[]>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllClass();
            setData(response.data.data);
        }
        fetchData();

    }, []);
    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllParent();
            setParent(response.data.data);
        }
        fetchData();
    }, []);
    console.log(AddEnfantData);

    return (
        <>

            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Enfant</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="formFile" className="form-label">le photo d'éleve</label>
                        <input onChange={handleImageChange} className="form-control" type="file" id="formFile" />

                        <div className="mb-3">
                            <label className="form-label" htmlFor="basic-default-fullname">Full Name</label>
                            <Input onChange={handlefullNameChange} type="text" className="form-control" id="basic-default-fullname" placeholder="Nadhem zini" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="basic-default-fullname">gender</label>
                            <select onChange={handleGenderChange} className="form-select" aria-label="Default select example" >
                                <option >select </option>
                                <option value="Fille">Fille </option>
                                <option value="Garçon">Garçon</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >Class</label>
                            <select onChange={handleClassChange} className="form-select" aria-label="Default select example">
                                <option> select class ...</option>
                                {data?.map((classed) => (
                                    <option key={classed.id} value={classed.id}>
                                        {classed.nom_de_class}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >parent</label>
                            <select onChange={handleParentChange} className="form-select" aria-label="Default select example">
                                <option> select class ...</option>
                                {parent?.map((parent) => (
                                    <option key={parent.id} value={parent.id}>
                                        <p> {parent.fullname}</p>
                                        <p> {parent.cin}</p>
                                    </option>
                                ))}
                            </select>
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
            </Modal >
        </>
    )
}

export default ModalEnfant