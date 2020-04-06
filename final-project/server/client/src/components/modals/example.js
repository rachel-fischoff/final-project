  
import React, { Component, Fragment, useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import {render} from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import twitter from '../sample_data'


function Example() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Enter Text</Modal.Title>
          </Modal.Header>
            <Modal.Body>{}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  render(<Example />);