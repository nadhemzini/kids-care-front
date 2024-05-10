import React, { ChangeEvent, useEffect, useState } from 'react'
import Input from './Input'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IMatiere } from '../modals/IMatiere';
import { IClass } from '../modals/IClass';
import { getAllClass } from '../services/ServicesClass';
import { getAllMatiere } from '../services/ServicesMatiere';
import { IEnseignant } from '../modals/IEnseignant';
import toast from 'react-hot-toast';
import { addEnseignant } from '../services/ServiceEnseignant';



type GenericModal = {
    show: boolean
    handleClose: () => void
}
function ModalEnseignants(props: GenericModal) {

    const [matiere, setMatiere] = useState<IMatiere[]>([]);
    const [classes, setClasses] = useState<IClass[]>([]);

    const [AddEnseignantData, setAddEnseignantData] = useState<IEnseignant>(
        {
            id: 0,
            fullname: '',
            image: null,
            telephone: '',
            gender: '',
            email: ''
        }
    );
    const handlefullNameChange = ((e: React.FormEvent<HTMLFormElement>) => {
        setAddEnseignantData({ ...AddEnseignantData, fullname: e.currentTarget.value })
    });
    const handleImageChange = ((e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setAddEnseignantData({ ...AddEnseignantData, image: file })
        } else {
            toast.error('Please select an image') // Add error toast message
        }
    });
    const handleEmailChange = ((e: React.FormEvent<HTMLFormElement>) => {
        setAddEnseignantData({ ...AddEnseignantData, email: e.currentTarget.value })
    });

    const handleGenderChange = ((e: React.ChangeEvent<HTMLSelectElement>) => {
        setAddEnseignantData({ ...AddEnseignantData, gender: e.currentTarget.value })
    });
    const handleTelephoneChange = ((e: React.FormEvent<HTMLFormElement>) => {
        setAddEnseignantData({ ...AddEnseignantData, telephone: e.currentTarget.value })
    });
    console.log(AddEnseignantData);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (selectedClassIds.length <= 0 && selectedMatiereIds.length <= 0) {
            // Handle form submission
            toast.error('At least one checkbox must be checked to submit.');
            return;
        }
        const formData = new FormData();
        formData.append('fullname', AddEnseignantData.fullname);
        formData.append('email', AddEnseignantData.email);
        formData.append('gender', AddEnseignantData.gender);
        formData.append('telephone', AddEnseignantData.telephone);
        console.log(AddEnseignantData.image);
        if (AddEnseignantData.image) {
            formData.append('image', AddEnseignantData.image);
        }

        selectedClassIds.forEach(classId => {
            formData.append('classes_ids[]', String(classId));
        });

        selectedMatiereIds.forEach(matierId => {
            formData.append('matiere_ids[]', String(matierId));
        });


        try {
            // Convert FormData to Ienseignant
            console.log(formData);
            await addEnseignant(formData);
            // props.addOneenseignant(AddEnsData);
            toast.success('enseignant added Successfully!');

            window.location.reload();
        } catch (error) {
            console.log(error);
            toast.error('Failed to add enseignant!' + error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllClass();
            setClasses(response.data.data);
        }
        fetchData();
    }, []
    );
    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllMatiere();
            setMatiere(response.data.data);
        }
        fetchData();
    }, []
    );
    const [selectedClassIds, setSelectedClassIds] = useState<number[]>([]);

    const handleClassCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, classId: number) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setSelectedClassIds(prevIds => [...prevIds, classId]);
        } else {
            setSelectedClassIds(prevIds => prevIds.filter(id => id !== classId));
        }
    };
    console.log(selectedClassIds);

    const [selectedMatiereIds, setSelectedMatiereIds] = useState<number[]>([]);
    const handleMatiereCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, classId: number) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setSelectedMatiereIds(prevIds => [...prevIds, classId]);
        } else {
            setSelectedMatiereIds(prevIds => prevIds.filter(id => id !== classId));
        }
    };
    console.log(selectedMatiereIds);

    return (
        <>
            <Modal size="lg" show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Enseignant</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="formFile" className="form-label">le photo d'Enseignant</label>
                        <input onChange={handleImageChange} className="form-control" type="file" id="formFile" />

                        <div className="mb-3">
                            <label className="form-label" htmlFor="basic-default-fullname">Full Name</label>
                            <Input onChange={handlefullNameChange} type="text" className="form-control" id="basic-default-fullname" placeholder="Nadhem zini" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >email</label>
                            <Input onChange={handleEmailChange} type="text" className="form-control" id="basic-default-company" placeholder="example@gmail.com" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >telephone</label>
                            <Input onChange={handleTelephoneChange} type="text" className="form-control" id="basic-default-company" placeholder="50390625" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >Gender</label>
                            <select onChange={handleGenderChange} className="form-select" aria-label="Default select example" >
                                <option >select... </option>
                                <option value="Femme">Femme </option>
                                <option value="Homme">Homme</option>
                            </select>
                        </div>
                        <label className="form-label" >classes</label>
                        <div className="mb-3">
                            <div className="btn-group d-flex flex-wrap" role="group" aria-label="Basic checkbox toggle button group">
                            <div className="row">
    {classes.map((classItem, index) => (
        <div key={classItem.id} className="col-md-2 mb-2">
            <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id={`checkbox1-${classItem.id}`}
                    value={classItem.id}
                    onChange={(e) => handleClassCheckboxChange(e, classItem.id)}
                />
                <label className="form-check-label btn btn-outline-primary" htmlFor={`checkbox1-${classItem.id}`}>
                    {classItem.nom_de_class}
                </label>
            </div>
        </div>
    ))}
</div>

                            </div>
                        </div>
                        <label className="form-label" >matieres</label>
                        <div className="mb-3">
    <div className="btn-group d-flex flex-wrap" role="group" aria-label="Basic checkbox toggle button group">
    <div className="row">
    {matiere.map((matiere, index) => (
        <div key={matiere.id} className="col-md-3 mb-2">
            <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id={`checkbox-${matiere.id}`}
                    value={matiere.id}
                    onChange={(e) => handleMatiereCheckboxChange(e, matiere.id)}
                />
                <label className="form-check-label btn btn-outline-primary" htmlFor={`checkbox-${matiere.id}`}>
                    {matiere.nommatiere}
                </label>
            </div>
        </div>
    ))}
</div>
    </div>
</div>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={props.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit" onClick={props.handleClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalEnseignants