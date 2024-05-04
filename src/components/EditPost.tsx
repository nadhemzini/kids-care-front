import React, { ChangeEvent, useEffect, useState } from 'react'
import Buttons from './Buttons'
import Input from './Input'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import toast from 'react-hot-toast';
import { IPost } from '../modals/IPost';
import { geteditPosts, posteditPost } from '../services/ServicesPost';

type GenericModal = {
    id: number
    show: boolean
    handleClose: () => void
}
function EditPost(props: GenericModal) {

    const [editData, setEditData] = useState<IPost>(
        {
            id: props.id,
            title: '',
            image: null,
            description: ''
        }
    );

    function handleTitleChange(e: React.FormEvent<HTMLFormElement>) {
        setEditData({
            ...editData,
            title: e.currentTarget.value
        });
    }
    const handleImageChange = ((e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setEditData({ ...editData, image: file })
        } else {
            toast.error('Please select an image') // Add error toast message
        }
    });
    function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setEditData({
            ...editData,
            description: e.currentTarget.value
        });
    }

    useEffect(() => {
        (async () => {
            try {
                const result = await geteditPosts(props.id); // Make the API call
                setEditData(result);
            } catch (error: any) {
                console.error('Error fetching data:', error.message);
            }
        })();
    }, [props.id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior

        const formData = new FormData();
        formData.append('title', editData.title);
        formData.append('description', editData.description);
        console.log(editData.image);
        if (editData.image) {
            formData.append('image', editData.image);
        }

        try {
            await posteditPost(props.id, formData);
            toast.success('Post updated Successfully!')
        } catch (error) {
            toast.error("Failed to update Post!");
        }
    };
    return (
        <>

            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} >

                        <img className="card-img-top" src={`http://localhost:8000/images/${editData.image}`} alt="" />
                        <label htmlFor="formFile" className="form-label">Image</label>
                        <input onChange={handleImageChange} className="form-control" type="file" id="formFile" />

                        <div className="mb-3">
                            <label className="form-label" htmlFor="basic-default-fullname">Title</label>
                            <Input value={editData.title} type="text" className="form-control" onChange={handleTitleChange} id="basic-default-fullname" placeholder="Nadhem zini" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >description</label>
                            <textarea value={editData.description} className="form-control" onChange={handleDescriptionChange} id="basic-default-company" placeholder="mohame@example.com" />
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

export default EditPost