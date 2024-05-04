import { useEffect, useState } from 'react'
import Input from './Input'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IEnseignant } from '../modals/IEnseignant';
import { geteditEnseignants } from '../services/ServiceEnseignant';
import { getUserFromLocalStorage } from '../services/GetAdmin';
import { IHomework } from '../modals/IHomework';
import toast from 'react-hot-toast';
import { AddHomework } from '../services/ServiceHomework';

type GenericModal = {
    show: boolean
    handleClose: () => void
    //  addOnePost: (postToAdd: IPost) => void
}
function ModalHomeworks(props: GenericModal) {

    const userData = getUserFromLocalStorage();

    const [AddHomeworkData, setAddHomeworkData] = useState<IHomework>(
        {
            id: 0,
            title: '',
            description: '',
            enseignant_id: userData?.id,
        }
    );
    const handleTitleChange = ((e: React.FormEvent<HTMLFormElement>) => {
        setAddHomeworkData({ ...AddHomeworkData, title: e.currentTarget.value })
    });
    const handledescriptionChange = ((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAddHomeworkData({ ...AddHomeworkData, description: e.currentTarget.value })
    });


    const [selectedClassIds, setSelectedClassIds] = useState<number[]>([]);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, classId: number) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setSelectedClassIds(prevIds => [...prevIds, classId]);
        } else {
            setSelectedClassIds(prevIds => prevIds.filter(id => id !== classId));
        }
    };
    console.log(selectedClassIds);

    const [enseignant, setEnseignant] = useState<IEnseignant>();
    useEffect(() => {
        const fetchdata = async () => {
            if (userData) {
                const response = await geteditEnseignants(userData.id);
                setEnseignant(response);
            }

        }
        fetchdata();
    }, []);
    console.log(AddHomeworkData, selectedClassIds)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await AddHomework(AddHomeworkData, selectedClassIds);
            toast.success('Homework added Successfully!')

            window.location.reload();
        } catch (error) {
            toast.error("Failed to add Homework!");
        }
    };
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Homework</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="basic-default-fullname">Le Titre de Homework</label>
                            <Input onChange={handleTitleChange} type="text" name='title' className="form-control" id="basic-default-fullname" placeholder="title" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >Description de Homework</label>
                            <textarea onChange={handledescriptionChange} name='description' className="form-control" id="basic-default-company" placeholder="description" />
                        </div>
                        <label className="form-label" >les classes</label>
                        <div className="mb-3">
                            <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                                {enseignant?.classes?.map((classes) => (
                                    <div key={classes.id} className="form-check form-check-inline">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={`checkbox-${classes.id}`}
                                            value={classes.id}
                                            onChange={(e) => handleCheckboxChange(e, classes.id)}
                                        />
                                        <label className="form-check-label btn btn-outline-primary" htmlFor={`checkbox-${classes.id}`}>
                                            {classes.nom_de_class}
                                        </label>
                                    </div>
                                ))}
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
            </Modal >
        </>
    )
}

export default ModalHomeworks