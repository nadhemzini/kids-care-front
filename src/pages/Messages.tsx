import React, { useEffect, useState } from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBBtn,
    MDBTypography,
    MDBTextArea,
    MDBCardHeader,
} from "mdb-react-ui-kit";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IMessage } from "../modals/Imessage";
import Pusher from "pusher-js";

export default function Messages() {

    const [messages, setMessages] = useState<IMessage[]>([]);
    const [message, setMessage] = useState('');
    console.log(message);
    let allMessages: any = [];
    useEffect(() => {
        // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;

        const pusher = new Pusher('7fac0a92c0df57946b2e', {
            cluster: 'mt1'
        });

        const channel = pusher.subscribe('chat');
        channel.bind('message', function (data: any) {
            allMessages.push(data);
            setMessages(allMessages)
        });
    }, [])
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await fetch('http://127.0.0.1:8000/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'nadhem',
                message: message,
            })
        })
        setMessage('');
        console.log('dd');
    }
    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                {/* Menu */}
                <Menu />
                {/* / Menu */}
                {/* Layout container */}
                <div className="layout-page">
                    <div className="content-wrapper">
                        {/* Content */}
                        <Navbar />
                        <MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
                            <MDBRow>
                                <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
                                    <h5 className="font-weight-bold mb-3 text-center text-lg-start">
                                        Member
                                    </h5>

                                    <MDBCard>
                                        <MDBCardBody>
                                            <MDBTypography listUnStyled className="mb-0">
                                                <li
                                                    className="p-2 border-bottom"
                                                    style={{ backgroundColor: "#eee" }}
                                                >
                                                    <a href="#!" className="d-flex justify-content-between">
                                                        <div className="d-flex flex-row">
                                                            <img
                                                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"
                                                                alt="avatar"
                                                                className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                                                width="60"
                                                            />
                                                            <div className="pt-1">
                                                                <p className="fw-bold mb-0">John Doe</p>
                                                                <p className="small text-muted">
                                                                    Hello, Are you there?
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="pt-1">
                                                            <p className="small text-muted mb-1">Just now</p>
                                                            <span className="badge bg-danger float-end">1</span>
                                                        </div>
                                                    </a>
                                                </li>
                                                <li className="p-2 border-bottom">
                                                    <a href="#!" className="d-flex justify-content-between">
                                                        <div className="d-flex flex-row">
                                                            <img
                                                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp"
                                                                alt="avatar"
                                                                className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                                                width="60"
                                                            />
                                                            <div className="pt-1">
                                                                <p className="fw-bold mb-0">Danny Smith</p>
                                                                <p className="small text-muted">
                                                                    Lorem ipsum dolor sit.
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="pt-1">
                                                            <p className="small text-muted mb-1">5 mins ago</p>
                                                        </div>
                                                    </a>
                                                </li>
                                            </MDBTypography>
                                        </MDBCardBody>
                                    </MDBCard>
                                </MDBCol>

                                <MDBCol md="6" lg="7" xl="8">
                                    <MDBTypography listUnStyled>
                                        {messages.map(message => (
                                            <li className="d-flex justify-content-between mb-4">
                                                <MDBCard className="w-100">
                                                    <MDBCardHeader className="d-flex justify-content-between p-3">
                                                        <p className="fw-bold mb-0">Lara Croft</p>
                                                        <p className="text-muted small mb-0">
                                                            <MDBIcon far icon="clock" /> 13 mins ago
                                                        </p>
                                                    </MDBCardHeader>
                                                    <MDBCardBody>
                                                        <p className="mb-0">
                                                            {message.message}
                                                        </p>
                                                    </MDBCardBody>
                                                </MDBCard>
                                                <img
                                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                                                    alt="avatar"
                                                    className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                                                    width="60"
                                                />
                                            </li>
                                        ))}

                                        <li className="d-flex justify-content-between mb-4">
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                                alt="avatar"
                                                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                                width="60"
                                            />
                                            <MDBCard>
                                                <MDBCardHeader className="d-flex justify-content-between p-3">
                                                    <p className="fw-bold mb-0">Brad Pitt</p>
                                                    <p className="text-muted small mb-0">
                                                        <MDBIcon far icon="clock" /> 10 mins ago
                                                    </p>
                                                </MDBCardHeader>
                                                <MDBCardBody>
                                                    <p className="mb-0">
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                                        do eiusmod tempor incididunt ut labore et dolore magna
                                                        aliqua.
                                                    </p>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </li>
                                        <form onSubmit={handleSubmit}>
                                            <li className="bg-white mb-3">
                                                <MDBTextArea label="Message" onChange={e => setMessage(e.target.value)} value={message} placeholder="write a message" id="textAreaExample" rows={4} />
                                            </li>
                                            <MDBBtn color="info" name="submit" type="submit" rounded className="float-end">
                                                Send
                                            </MDBBtn>
                                        </form>
                                    </MDBTypography>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                        <Footer />

                    </div>
                </div>
                {/* / Layout page */}
            </div>
            {/* Overlay */}
            <div className="layout-overlay layout-menu-toggle" />
        </div>
    );
}