import React, { ChangeEvent, useState } from 'react'
import Buttons from './Buttons'
import Input from './Input'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IPost } from '../modals/IPost';
import { AddPost } from '../services/ServicesPost';
import toast from 'react-hot-toast';
import { Console } from 'console';
import { co } from '@fullcalendar/core/internal-common';

type GenericModal = {
    show: boolean
    handleClose: () => void
    //  addOnePost: (postToAdd: IPost) => void
}
function ModalPost(props: GenericModal) {

    const [AddPostData, setAddPostData] = useState<IPost>(
        {
            id: 0,
            title: '',
            image: null,
            description: '',

        }
    );
    const handleTitleChange = ((e: React.FormEvent<HTMLInputElement>) => {
        setAddPostData({ ...AddPostData, title: e.currentTarget.value })
    });
    const handleImageChange = ((e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setAddPostData({ ...AddPostData, image: file })
        } else {
            toast.error('Please select an image') // Add error toast message
        }
    });
    const handleDescriptionChange = ((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAddPostData({ ...AddPostData, description: e.currentTarget.value })
    });
    console.log(AddPostData);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', AddPostData.title);
        formData.append('description', AddPostData.description);
        console.log(AddPostData.image);
        if (AddPostData.image) {
            formData.append('image', AddPostData.image);
        }

        try {
            // Convert FormData to IPost

            console.log(formData)
            await AddPost(formData);
            // props.addOnePost(AddPostData);
            toast.success('Post added Successfully!');

            window.location.reload();
        } catch (error) {
            toast.error('Failed to add Post!' + error);
        }
    };
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="formFile" className="form-label">le photo de post</label>
                        <input onChange={handleImageChange} className="form-control" name='image' type="file" id="formFile" />

                        <div className="mb-3">
                            <label className="form-label" htmlFor="basic-default-fullname">Le Titre de Post</label>
                            <Input onChange={handleTitleChange} type="text" name='title' className="form-control" id="basic-default-fullname" placeholder="title" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >Description de post</label>
                            <textarea onChange={handleDescriptionChange} name='description' className="form-control" id="basic-default-company" placeholder="description" />
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

export default ModalPost