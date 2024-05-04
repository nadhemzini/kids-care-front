import React, { useEffect, useState } from 'react'
import Buttons from './Buttons'
import Input from './Input'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IClass } from '../modals/IClass';
import { geteditClass, posteditClass } from '../services/ServicesClass';
import toast from 'react-hot-toast';

type GenericModal = {
    show: boolean
    handleClose: () => void
    id: number
}
function EditClass(props: GenericModal) {
    const [editData, setEditData] = useState<IClass>(
        {
            id: 0,
            nom_de_class: '',
            emploi_de_temps: ''
        }
    );
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            await posteditClass(props.id, editData);
            toast.success('class updated Successfully!')
        } catch (error) {
            toast.error("Failed to update class!");
        }
    };

    function handleNomClassChange(e: React.FormEvent<HTMLFormElement>) {
        setEditData({
            ...editData,
            nom_de_class: e.currentTarget.value
        });
    }
    useEffect(() => {
        (async () => {
            try {
                const result = await geteditClass(props.id); // Make the API call
                console.log(result);
                setEditData(result);
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
                            <label className="form-label" htmlFor="basic-default-fullname">Nom de Class</label>
                            <Input value={editData.nom_de_class} onChange={handleNomClassChange} type="text" className="form-control" id="basic-default-fullname" placeholder="Nadhem zini" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">Emploi de temps</label>
                            <input className="form-control" type="file" id="formFile" />
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