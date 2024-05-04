import Navbar from '../components/Navbar'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import { getUserFromLocalStorage } from '../services/GetAdmin';
import { useEffect, useState } from 'react';
import { IClass } from '../modals/IClass';
import { getAllClass } from '../services/ServicesClass';
import { getAllParent } from '../services/ServicesParent';
import { IParent } from '../modals/IParent';
import { IEnseignant } from '../modals/IEnseignant';
import { getAllEnseignant } from '../services/ServiceEnseignant';
import { IEvenement } from '../modals/IEvenement';
import { getAllEvenement } from '../services/ServiceEvenement';
import { getAllMatiere } from '../services/ServicesMatiere';
import { IMatiere } from '../modals/IMatiere';
import { IPost } from '../modals/IPost';
import { getAllPosts } from '../services/ServicesPost';
import { IReclamation } from '../modals/IReclamation';
import { getAllReclamations } from '../services/ServiceReclamation';
import { IAdmin } from '../modals/IAdmin';
import { getAllAdmin } from '../services/ServiceAdmin';

function Dashboard() {

  const [dataReclamation, setDataReclamation] = useState<IReclamation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllReclamations();
      setDataReclamation(response.data.data);
    }
    fetchData();

  }, []);
  const [dataPost, setDataPost] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllPosts();
      setDataPost(response.data.data);
    }
    fetchData();

  }, []);
  const [dataMatiere, setDataMatiere] = useState<IMatiere[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllMatiere();
      setDataMatiere(response.data.data);
    }
    fetchData();

  }, []);
  const [dataEvenement, setDataEvenement] = useState<IEvenement[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllEvenement();
      setDataEvenement(response.data.data);
    }
    fetchData();

  }, []);
  const [dataClass, setDataClass] = useState<IClass[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllClass();
      setDataClass(response.data.data);
    }
    fetchData();

  }, []);
  const [dataParent, setDataParent] = useState<IParent[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllParent();
      setDataParent(response.data.data);
    }
    fetchData();

  }, []);
  const [dataEnseignat, setDataEnseignat] = useState<IEnseignant[]>([]);
  useEffect(() => {
    const fetchdata = async () => {
      const response = await getAllEnseignant();
      setDataEnseignat(response.data.data);
    }
    fetchdata();
  }, []);
  const userData = getUserFromLocalStorage();

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
            {/* Content wrapper */}
            <div className="content-wrapper">
              {/* Content */}
              <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row">
                  <div className="col-lg-8 mb-4 order-lg-0 order-1">
                    <div className="card">
                      <div className="d-flex align-items-end row">
                        <div className="col-sm-7">
                          <div className="card-body">
                            <h5 className="card-title text-primary">Welcome {userData?.role}! 🎉</h5>
                          </div>
                        </div>
                        <div className="col-sm-5 text-center text-sm-left">
                          <div className="card-body pb-0 px-0 px-md-4">
                            <img src="../assets/img/illustrations/man-with-laptop-light.png" height={140} alt="View Badge User" data-app-dark-img="illustrations/man-with-laptop-dark.png" data-app-light-img="illustrations/man-with-laptop-light.png" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-8 order-lg-1 order-md-2 order-0">
                    <div className="row">
                      <div className="col-lg-6 col-md-12 col-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <img src="../assets/img/icons/unicons/chart-success.png" alt="chart success" className="rounded" />
                              </div>

                            </div>
                            <span className="fw-semibold d-block mb-1">classes</span>
                            <h3 className="card-title mb-2">{dataClass.length}</h3>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <img src="../assets/img/icons/unicons/chart-success.png" alt="chart success" className="rounded" />
                              </div>

                            </div>
                            <span className="fw-semibold d-block mb-1">Parents</span>
                            <h3 className="card-title mb-2">{dataParent.length}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-8 order-lg-1 order-md-2 order-0">
                    <div className="row">
                      <div className="col-lg-6 col-md-12 col-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <img src="../assets/img/icons/unicons/chart-success.png" alt="chart success" className="rounded" />
                              </div>

                            </div>
                            <span className="fw-semibold d-block mb-1">Matieres</span>
                            <h3 className="card-title mb-2">{dataMatiere.length}</h3>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <img src="../assets/img/icons/unicons/chart-success.png" alt="chart success" className="rounded" />
                              </div>

                            </div>
                            <span className="fw-semibold d-block mb-1">Posts</span>
                            <h3 className="card-title mb-2">{dataPost.length}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-8 order-lg-1 order-md-2 order-0">
                    <div className="row">
                      <div className="col-lg-6 col-md-12 col-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <img src="../assets/img/icons/unicons/chart-success.png" alt="chart success" className="rounded" />
                              </div>

                            </div>
                            <span className="fw-semibold d-block mb-1">Réclamations</span>
                            <h3 className="card-title mb-2">{dataReclamation.length}</h3>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4 order-lg-2 order-md-1 order-2">
                    <div className="row">
                      <div className="col-lg-6 col-md-12 col-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <img src="../assets/img/icons/unicons/paypal.png" alt="Credit Card" className="rounded" />
                              </div>

                            </div>
                            <span className="d-block mb-1">Enseignant</span>
                            <h3 className="card-title text-nowrap mb-2">{dataEnseignat.length}</h3>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="d-flex justify-content-between flex-sm-row flex-column gap-3">
                              <div className="d-flex flex-sm-column flex-row align-items-start justify-content-between">
                                <div className="card-title">
                                  <div className="card-title d-flex align-items-start justify-content-between">
                                    <div className="avatar flex-shrink-0">
                                      <img src="../assets/img/icons/unicons/paypal.png" alt="Credit Card" className="rounded" />
                                    </div>

                                  </div>
                                  <h5 className="text-nowrap mb-2">Evenement</h5>
                                  <h3 className="card-title text-nowrap mb-2" >{dataEvenement.length}</h3>
                                </div>

                              </div>
                              <div id="profileReportChart" />
                            </div>
                          </div>
                        </div>
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

    </div>
  )
}

export default Dashboard


