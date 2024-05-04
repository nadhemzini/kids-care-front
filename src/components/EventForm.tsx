// AddEventModal.tsx

import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface AddEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (event: any) => void;
    event?: any; // Accept event as an optional prop
}

const EventForm: React.FC<AddEventModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    event, // Receive the event prop
}) => {
    const [title, setTitle] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    useEffect(() => {
        if (event) {
            setTitle(event.title);
            setStart(event.start);
            setEnd(event.end);
        }
    }, [event]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStart(e.target.value);
    };

    const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEnd(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit({ ...event, title, start, end }); // Pass updated event to parent component
        onClose();
    };

    return (
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{event ? 'Edit Event' : 'Add Event'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formStart">
                        <Form.Label>Start</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={start}
                            onChange={handleStartChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formEnd">
                        <Form.Label>End</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={end}
                            onChange={handleEndChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    {event ? 'Save Changes' : 'Add Event'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default EventForm;
