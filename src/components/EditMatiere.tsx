import React, { useEffect, useState } from 'react'
import Buttons from './Buttons'
import Input from './Input'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IMatiere } from '../modals/IMatiere';
import { geteditMatiere, posteditMatiere } from '../services/ServicesMatiere';
import toast from 'react-hot-toast';

type GenericModal = {
    id: number
    show: boolean
    handleClose: () => void
}
function EditMatiere(props: GenericModal) {
    const [editData, setEditData] = useState<IMatiere>(
        {
            id: props.id,
            codematiere: '',
            nommatiere: ''

        }
    );
    const handleCodeChange = (e: React.FormEvent<HTMLFormElement>) => {
        setEditData({
            ...editData,
            codematiere: e.currentTarget.value
        });
    }
    const handleNomChange = (e: React.FormEvent<HTMLFormElement>) => {
        setEditData({
            ...editData,
            nommatiere: e.currentTarget.value
        });
    }
    const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await posteditMatiere(props.id, editData!);
            toast.success('Matiere updated Successfully!')
        } catch (error) {
            toast.error("Failed to update Matiere!");
        }
    }
    useEffect(() => {
        (async () => {
            try {
                const result = await geteditMatiere(props.id); // Make the API call
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
                    <Modal.Title>Edit Matiere</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handlesubmit}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="basic-default-fullname">code de matiére</label>
                            <Input type="text" onChange={handleCodeChange} value={editData.codematiere} className="form-control" id="basic-default-fullname" placeholder="xs12" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >nom de matiére</label>
                            <Input type="text" value={editData.nommatiere} onChange={handleNomChange} className="form-control" id="basic-default-company" placeholder="math" />
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

export default EditMatiere