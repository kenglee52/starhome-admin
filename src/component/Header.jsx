import React from 'react';
import { Navbar, Container, Row, Col } from 'react-bootstrap';

const Header = ({ toggleSidebar }) => {
  const today = new Date().toLocaleDateString('en-GB'); // 27/07/2025

  return (
    <Navbar bg="white" expand="lg" className="shadow-lg py-3 px-4 mb-2 border border-4">
      <Container fluid>
        <Row className="w-100 align-items-center">
          <Col xs={6} className="d-flex align-items-center gap-3">
            {/* Toggle Button for Mobile */}
            <button
              className="btn btn-outline-danger d-md-none"
              onClick={toggleSidebar}
            >
              <i className="fas fa-bars"></i>
            </button>
            <p className="fw-bold text-danger mb-0">ວັນທີ: {today}</p>
          </Col>
          <Col xs={6} className="d-flex justify-content-end gap-3">
            <i className="fas fa-user-circle fa-lg text-secondary" style={{ cursor: 'pointer' }}></i>
            <i className="fas fa-ellipsis-v fa-lg text-secondary" style={{ cursor: 'pointer' }}></i>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Header;
