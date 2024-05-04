import React, { useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Menu from '../components/Menu'
import { getUserFromLocalStorage } from '../services/GetAdmin';
import { IAdmin } from '../modals/IAdmin';
import { posteditAdmin } from '../services/ServicesAdmin';
import Input from '../components/Input';

function Profil() {
    const userData = getUserFromLocalStorage();
    const [data, setData] = useState<IAdmin>(
        {
            id: 0,
            fullname: userData?.fullname && userData?.fullname || "none",
            image: null,
            role: userData?.role && userData?.role || "none",
            gender: userData?.gender && userData?.gender || "none",
            telephone: userData?.telephone && userData?.telephone || "none",
            email: userData?.email && userData?.email || "none"
        }
    );


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (userData?.id) {
            try {
                await posteditAdmin(userData.id, data!);
                alert('superadmin updated successfully');
            } catch (error: any) {
                alert(error);
            }
        };
    }


    function handleFullnameChange(e: React.FormEvent<HTMLInputElement>) {
        setData({
            ...data,
            fullname: e.currentTarget.value
        });
    }
    function handleEmailChange(e: React.FormEvent<HTMLInputElement>) {
        setData({
            ...data,
            email: e.currentTarget.value
        });
    }


    function handleGenderChange(e: React.FormEvent<HTMLSelectElement>) {
        setData({
            ...data,
            gender: e.currentTarget.value
        });
    }
    function handleTelephoneChange(e: React.FormEvent<HTMLInputElement>) {
        setData({
            ...data,
            telephone: e.currentTarget.value
        });
    }


    return (
        <div>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    {/* Menu */}
                    <Menu />
                    {/* / Menu */}
                    {/* Layout container */}
                    <div className="layout-page">
                        <Navbar />
                        {/* Content wrapper */}
                        <div className="p-4 content-wrapper">
                            {/* Content */}
                            <div className=" card mb-4">
                                <h5 className="card-header">Profile Details</h5>
                                {/* Account */}
                                <div className="card-body">
                                    <div className="d-flex align-items-start align-items-sm-center gap-4">
                                        <img src={`http://localhost:8000/images/${data.image}`} alt="user-avatar" className="d-block rounded" height={100} width={100} id="uploadedAvatar" />
                                        <div className="button-wrapper">
                                            <label htmlFor="upload" className="btn btn-primary me-2 mb-4" tabIndex={0}>
                                                <span className="d-none d-sm-block">Upload new photo</span>
                                                <i className="bx bx-upload d-block d-sm-none" />
                                                <input type="file" id="upload" className="account-file-input" hidden accept="image/png, image/jpeg" />
                                            </label>
                                            <button type="button" className="btn btn-outline-secondary account-image-reset mb-4">
                                                <i className="bx bx-reset d-block d-sm-none" />
                                                <span className="d-none d-sm-block">Reset</span>
                                            </button>
                                            <p className=" mb-0">Super Admin</p>
                                            <p className="text-muted mb-0">Allowed JPG, GIF or PNG. Max size of 800K</p>
                                        </div>
                                    </div>
                                </div>
                                <hr className="my-0" />
                                <div className="card-body">
                                    <form onSubmit={handleSubmit} >
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <label className="form-label">Full Name</label>
                                                <Input className="form-control" onChange={handleFullnameChange} type="text" id="firstName" name="firstName" value={data.fullname} />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="email" className="form-label">E-mail</label>
                                                <Input className="form-control" onChange={handleEmailChange} type="text" id="email" name="email" value={data?.email} />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="organization" className="form-label">Gender</label>
                                                <label className="form-label" >Gender</label>
                                                <select value={data?.gender} className="form-select" aria-label="Default select example" onChange={handleGenderChange}>
                                                    <option value="Femme">Femme </option>
                                                    <option value="Homme">Homme</option>
                                                </select>
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                                                <div className="input-group input-group-merge">
                                                    <span className="input-group-text">TN (+216)</span>
                                                    <input onChange={handleTelephoneChange} type="text" id="phoneNumber" name="phoneNumber" className="form-control" value={data?.telephone} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <button type="submit" className="btn btn-primary me-2">Save changes</button>
                                            <button type="reset" className="btn btn-outline-secondary">Cancel</button>
                                        </div>
                                    </form>
                                </div>
                                {/* /Account */}
                            </div>

                            {/* / Content */}
                            {/* Footer */}
                            <Footer />
                            {/* / Footer */}
                            <div className="content-backdrop fade" />
                        </div>
                        {/* Content wrapper */}
                    </div>
                    {/* / Layout page */}
                </div>
                {/* Overlay */}
                <div className="layout-overlay layout-menu-toggle" />
            </div>
        </div>
    )
}

export default Profil