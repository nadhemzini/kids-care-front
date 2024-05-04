import React, { ChangeEvent, useState } from 'react'
import Footer from '../components/Footer'
import Menu from '../components/Menu'
import Input from '../components/Input'
import Selection from '../components/Selection'
import Buttons from '../components/Buttons'

function Form() {


  return (
    <div>
      <div>
        <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">
            <Menu />
            {/* Content */}
            <div className=" container-xxl container-p-y col-md-6 card mb-4">
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">le photo d'éleve</label>
                  <input className="form-control" type="file" id="formFile" />
                </div>
                <form>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="basic-default-fullname">Full Name</label>
                    <Input type="text" className="form-control" id="basic-default-fullname" placeholder="Nadhem zini" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" >Class</label>
                    <Input type="text" className="form-control" id="basic-default-company" placeholder="9éme b2" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" >Email</label>
                    <Input type="email" className="form-control" id="basic-default-company" placeholder="zini159@example.com" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" >Nom De parent</label>
                    <Input type="text" className="form-control" id="basic-default-company" placeholder="Mohamed" />
                  </div>


                  <div className="mb-3">
                    <label className="form-label" htmlFor="basic-default-phone">Phone No</label>
                    <Input type="text" id="basic-default-phone" className="form-control phone-mask" placeholder="658 799 8941" />
                  </div>


                  <Buttons type="submit" className="btn btn-primary">Send</Buttons>
                </form>
              </div>
            </div>



          </div>

        </div>

      </div>
      {/* Footer */}
      <Footer />
      {/* / Footer */}
    </div>

  )
}

export default Form