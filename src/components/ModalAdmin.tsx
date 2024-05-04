import React, { ChangeEvent, useState } from 'react'
import Buttons from './Buttons'
import Input from './Input'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IAdmin } from '../modals/IAdmin';
import { AddAdmin } from '../services/ServicesAdmin';
import toast from 'react-hot-toast';

type GenericModal = {
  show: boolean
  handleClose: () => void
  //addOneAdmin: (adminToAdd: IAdmin) => void
}




function ModalAdmin(props: GenericModal) {
  const [AddAdminData, setAddAdminData] = useState<IAdmin>(
    {
      id: 0,
      fullname: '',
      image: null,
      telephone: '',
      role: '',
      gender: '',
      email: ''
    }
  );

  const handlefullNameChange = ((e: React.FormEvent<HTMLFormElement>) => {
    setAddAdminData({ ...AddAdminData, fullname: e.currentTarget.value })
  });
  const handleImageChange = ((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAddAdminData({ ...AddAdminData, image: file })
    } else {
      toast.error('Please select an image') // Add error toast message
    }
  });
  const handleEmailChange = ((e: React.FormEvent<HTMLFormElement>) => {
    setAddAdminData({ ...AddAdminData, email: e.currentTarget.value })
  });
  const handleRoleChange = ((e: React.ChangeEvent<HTMLSelectElement>) => {
    setAddAdminData({ ...AddAdminData, role: e.currentTarget.value })
  });
  const handleGenderChange = ((e: React.ChangeEvent<HTMLSelectElement>) => {
    setAddAdminData({ ...AddAdminData, gender: e.currentTarget.value })
  });
  const handleTelephoneChange = ((e: React.FormEvent<HTMLFormElement>) => {
    setAddAdminData({ ...AddAdminData, telephone: e.currentTarget.value })
  });
  console.log(AddAdminData);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullname', AddAdminData.fullname);
    formData.append('email', AddAdminData.email);
    formData.append('role', AddAdminData.role);
    formData.append('gender', AddAdminData.gender);
    formData.append('telephone', AddAdminData.telephone);
    console.log(AddAdminData.image);
    if (AddAdminData.image) {
      formData.append('image', AddAdminData.image);
    }
    try {
      console.log(formData);
      await AddAdmin(formData);

      toast.success('Admin added Successfully!')



      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Failed to add admin!");
    }
  };
  return (
    <>

      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form onSubmit={handleSubmit}>
            <label htmlFor="formFile" className="form-label">le photo d'éleve</label>
            <input className="form-control" onChange={handleImageChange} type="file" id="formFile" />

            <div className="mb-3">
              <label className="form-label" htmlFor="basic-default-fullname">Full Name</label>
              <Input type="text" onChange={handlefullNameChange} className="form-control" id="basic-default-fullname" placeholder="Nadhem zini" />
            </div>
            <div className="mb-3">
              <label className="form-label" >Email</label>
              <Input type="email" onChange={handleEmailChange} className="form-control" id="basic-default-company" placeholder="zini159@example.com" />
            </div>
            <div className="mb-3">
              <label className="form-label" >Role</label>
              <select className="form-select" aria-label="Default select example" onChange={handleRoleChange}>
                <option >select... </option>
                <option value="SuperAdmin">SuperAdmin </option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label" >Gender</label>
              <select className="form-select" aria-label="Default select example" onChange={handleGenderChange}>
                <option >select... </option>
                <option value="Femme">Femme </option>
                <option value="Homme">Homme</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="basic-default-phone">Phone No</label>
              <Input type="text" onChange={handleTelephoneChange} id="basic-default-phone" className="form-control phone-mask" placeholder="658 799 8941" />
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

export default ModalAdmin