import React, { useEffect, useState } from 'react'
import Menu from '../components/Menu'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import Footer from '../components/Footer'
import ModalPost from '../components/ModalPost'
import Navbar from '../components/Navbar'
import { IEvenement } from '../modals/IEvenement'
import { DeletePost, getAllPosts } from '../services/ServicesPost'
import toast from 'react-hot-toast'
import EditPost from '../components/EditPost'
import { getAllEvenement } from '../services/ServiceEvenement'
import ModalEvenement from '../components/ModalEvenemant'
import EditEvenement from '../components/EditEvenement'

function Evenement() {
  const [show, setShow] = useState<boolean>(false);
  const handleShow = () => setShow(true);
  const [edit, setEdit] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<number>(0);
  const [data, setData] = useState<IEvenement[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<IEvenement[]>([]);
  useEffect(() => {
    // Filter data based on searchQuery
    const filtered = data.filter((Evenement) =>
      Evenement.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, data]);
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleClose = () => { setShow(false); setEdit(false) };

  const handleEdit = (id: number) => { setEdit(true); setEditingItemId(id) };
  const handleDelete = async (id: number) => {
    await DeletePost(id)
    const newUser = data.filter(item => item.id !== id); //lhna lazmek ta3ml filter bech tableau mta3k ytbadel 5ater how ynajem ytfasa5 ama y93ed fi table haka 3leh lazmik ta3ml new array bech tfalter faha l id haka bil item.id!=id
    setData(newUser);
    toast.success('Evenement deleted succefully');

  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllEvenement();
      setData(response.data.data);
    }
    fetchData();

  }, []);


  return (


    <div>
      {/* Layout wrapper */}
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          {/* Menu */}
          <Menu />
          {/* / Menu */}
          {/* Layout container */}
          <div className="layout-page">
            <Navbar />
            <div className="navbar-nav align-items-center pt-3">
              <div className="nav-item d-flex align-items-center">
                {/* <i className="bx bx-search fs-4 lh-0" /> */}
                <InputGroup>
                  <FormControl
                    className="border-0 shadow-none"
                    placeholder="Search..."
                    aria-label="Search..."
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </InputGroup>
              </div>
            </div>
            {/* Content wrapper */}
            <div className="content-wrapper">
              {/* Content */}
              <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card">
                  <Button onClick={handleShow} className="position-absolute top-0 end-0 mt-3 me-3" variant="primary" >
                    <i className='bx bxs-plus-circle'></i>
                    Add Evenement
                  </Button>
                  <h5 className="card-header">Evenements</h5>
                  <div >
                    <div className='col-8'>
                    </div>
                    <div className='col-4'>
                    </div>
                    <div className="card-body ">
                      <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
                        {filteredData.map((evenement) => (
                          <div className="col">
                            <div className="card h-100">

                              <div className="card-body">
                                <h5 className="card-title">{evenement.title}</h5>
                                <p className="card-text">
                                  {evenement.description}
                                </p>
                                <p className="card-text">
                                  <p className='text-muted'>start :</p>
                                  {evenement.start.toString()}
                                </p>
                                <p className="card-text">
                                  <p className='text-muted'>end :</p>
                                  {evenement.end.toString()}
                                </p>
                              </div>

                              <div className="dropdown">
                                <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                  <i className="bx bx-dots-vertical-rounded" />
                                </button>
                                <div className="dropdown-menu">
                                  <a className="dropdown-item" href="javascript:void(0);" onClick={() => handleEdit(evenement.id)}  ><i className="bx bx-edit-alt me-1" /> Edit</a>
                                  <a className="dropdown-item text-decoration-none pointer" onClick={() => handleDelete(evenement.id)}   ><i className="bx bx-trash me-1" /> Delete</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>

                </div>

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
      {/* / Layout wrapper */}
      <ModalEvenement show={show} handleClose={handleClose}></ModalEvenement>
      <EditEvenement id={editingItemId} show={edit} handleClose={handleClose}></EditEvenement>

    </div>
  )
}

export default Evenement
