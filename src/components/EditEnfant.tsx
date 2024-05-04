import React, { useEffect, useState } from 'react'
import Buttons from './Buttons'
import Input from './Input'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IEnfant } from '../modals/IEnfant';
import { getAllParent, geteditParents } from '../services/ServicesParent';
import { IParent } from '../modals/IParent';
import { getAllEnfant, geteditEnfant, posteditEnfant } from '../services/ServiceEnfant';
import toast from 'react-hot-toast';
import { IClass } from '../modals/IClass';
import { getAllClass, geteditClass } from '../services/ServicesClass';

type GenericModal = {
    id: number
    show: boolean
    handleClose: () => void
}
function EditEnfant(props: GenericModal) {


    const [editData, setEditData] = useState<IEnfant>(
        {
            id: props.id,
            fullname: '',
            image: null,
            gender: '',
            parent_id: 0,
            class_id: 0,
            parents: {} as IParent,
            classes: {} as IClass,
        }
    );
    const [parent, setParent] = useState<IParent[]>();
    const [newparent, setNewParent] = useState<IParent[]>();
    const [editParent, setEditParent] = useState<IParent>();

    const [classes, setClasses] = useState<IClass[]>();
    const [newclass, setNewClass] = useState<IClass[]>();
    const [editClass, setEditClass] = useState<IClass>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllParent();
            setParent(response.data.data);
            setNewParent(parent?.filter(parent => parent.id !== editData.parent_id));
        }
        fetchData();
    }, []);
    useEffect(() => {
        (async () => {
            try {
                const result = await geteditParents(editData.parent_id); // Make the API call
                setEditParent(result);

            } catch (error: any) {
                console.error('Error fetching data:', error.message);
            }
        })();
    }, [editData.parent_id]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllClass();
            setClasses(response.data.data);
            setNewClass(classes?.filter(classes => classes.id !== editData.class_id));
        }
        fetchData();
    }, []);
    useEffect(() => {
        (async () => {
            try {
                const result = await geteditClass(editData.class_id); // Make the API call
                setEditClass(result);

            } catch (error: any) {
                console.error('Error fetching data:', error.message);
            }
        })();
    }, [editData.class_id]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            await posteditEnfant(props.id, editData!);
            toast.success('Enfant updated Successfully!')
            window.location.reload();
        } catch (error) {
            toast.error("Failed to update enfant!");
        }
    };

    function handleFullnameChange(e: React.FormEvent<HTMLFormElement>) {
        setEditData({
            ...editData,
            fullname: e.currentTarget.value
        });
    }
    function handleImageChange(e: React.FormEvent<HTMLFormElement>) {
        setEditData({
            ...editData,
            image: e.currentTarget.value
        });
    }
    function handleGenderChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setEditData({
            ...editData,
            gender: e.currentTarget.value
        });
    }
    function handleParentChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setEditData({
            ...editData,
            parent_id: +(e.currentTarget.value)
        });
    }
    function handleClassChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setEditData({
            ...editData,
            class_id: +(e.currentTarget.value)
        });
    }



    useEffect(() => {
        (async () => {
            try {
                const result = await geteditEnfant(props.id); // Make the API call
                console.log(result);
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
                    <Modal.Title>Edit Enfant</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="formFile" className="form-label">le photo d'éleve</label>
                        <input className="form-control" type="file" id="formFile" />

                        <div className="mb-3">
                            <label className="form-label" htmlFor="basic-default-fullname">Full Name</label>
                            <Input value={editData.fullname} onChange={handleFullnameChange} type="text" className="form-control" id="basic-default-fullname" placeholder="Nadhem zini" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="basic-default-fullname">gender</label>
                            <select onChange={handleGenderChange} className="form-select" aria-label="Default select example" >
                                {editData.gender === 'Garçon' && (
                                    <>
                                        <option value="Garçon">Garçon</option>
                                        <option value="Fille">Fille</option>
                                    </>
                                )}
                                {editData.gender === 'Fille' && (
                                    <>
                                        <option value="Fille">Fille</option>
                                        <option value="Garçon">Garçon</option>
                                    </>
                                )}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >Class</label>
                            <select onChange={handleClassChange} className="form-select" aria-label="Default select example">
                                <option value={editClass?.id}> {editClass?.nom_de_class} </option>
                                {newclass?.map((classed) => (
                                    <option key={classed.id} value={classed.id}>
                                        {classed.nom_de_class}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >parent</label>
                            <select onChange={handleParentChange} className="form-select" aria-label="Default select example">
                                <option value={editParent?.id}><p>{editParent?.fullname}</p><p>{editParent?.cin}</p></option>

                                {newparent?.map((parent) => (
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
            </Modal>
        </>
    )
}

export default EditEnfant