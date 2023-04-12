import React from "react";
import { Button, Row, Col, Container } from "reactstrap";
import{
    faXmark
  
  }from "@fortawesome/free-solid-svg-icons"
import "./Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal =({setOpenModal, sidebarIsOpen, title, text, onModalCont})=> {
  return (
    <div className={sidebarIsOpen ? "openModalBackground":"modalBackground"}>
      <Container className="modalContainer">
        <Row>
            <Col/>
            <Col xs='1'>
                <Button
                    onClick={() => {
                    setOpenModal(false);
                    }}
                >
                    <FontAwesomeIcon icon={faXmark}/>
                </Button>
          </Col>
        </Row>
        <Row className="text-center mb-2">
          <h3>{title}</h3>
        </Row>
        <Row className="text-center mb-3">
          <p>{text}</p>
        </Row>
        <Row>
            <Col/>
            <Col>
                <Button
                onClick={() => {
                setOpenModal(false);
                }}
            >
            Cancel
            </Button>
            </Col>
            <Col>
                <Button onClick={() => {
                onModalCont();
                setOpenModal(false);
                }}>Continue</Button>
            </Col>
            <Col/>
          
        </Row>
      </Container>
    </div>
  );
}

export default Modal;