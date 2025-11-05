import React from 'react';
import { Offcanvas, Nav, Accordion } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import LogoProfile from '../assets/images/Logo.jpeg';

const Sidebar = ({ show, handleClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
    handleClose();
  };
  const navItems = [
    { name: 'ໜ້າຫຼັກ', path: '/dashboard', icon: 'fa-home' },
    {
      name: 'ຈັດການຂໍ້ມູນພື້ນຖານ',
      icon: 'fa-database',
      subItems: [
        { name: 'ຈັດການຊັບສິນ', path: '/product' },
        { name: 'ຈັດການປະເພດຊັບສິນ', path: "/product/type" },
        { name: 'ຈັດການພະນັກງານ', path: '/employee'}
      ]
    },
    {
      name: 'ລາຍງານ',
      icon: 'fa-book',
      subItems: [
        { name: 'ລາຍງານຊັບສິນ', path: '/product/average' },
        { name: 'ລາຍງານພະນັກງານ' }
      ]
    },
    { name: 'ອອກຈາກລະບົບ', icon: 'fa-sign-out-alt', action: handleLogout }
  ];

  const handleNavigation = (item) => {
    if (item.action) {
      item.action();
    } else if (item.path) {
      navigate(item.path);
    }
    handleClose();
  };

  const renderNavItems = () => (
    <Accordion defaultActiveKey="" alwaysOpen className="bg-transparent">
      {navItems.map((item, idx) => (
        <div key={idx}>
          {!item.subItems ? (
            <Nav.Link onClick={() => handleNavigation(item)} className="text-white sidebar-link">
              <i className={`fas ${item.icon} me-2`}></i>{item.name}
            </Nav.Link>
          ) : (
            <Accordion.Item eventKey={idx.toString()} className="bg-transparent border-0">
              <Accordion.Header className="text-white bg-transparent">
                <i className={`fas ${item.icon} me-2`}></i>{item.name}
              </Accordion.Header>
              <Accordion.Body className="bg-transparent ps-4">
                {item.subItems.map((subItem, subIdx) => (
                  <Nav.Link key={subIdx} onClick={() => handleNavigation(subItem)} className="text-white sidebar-link">
                    <i className="fas fa-angle-right me-2"></i>{subItem.name}
                  </Nav.Link>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          )}
        </div>
      ))}
    </Accordion>
  );

  return (
    <div style={{ fontFamily: 'Noto Sans Lao' }}>
      <Offcanvas show={show} onHide={handleClose} responsive="md" className="bg-danger text-white sidebar-custom">
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>Star Home</Offcanvas.Title>
        </Offcanvas.Header>
        <div className="mb-2 row justify-content-center">
          <img src={LogoProfile} alt="Profile Logo" style={{ width: 100, height: 75, borderRadius: '50%' }} />
        </div>
        <hr />
        <Offcanvas.Body className="d-flex flex-column p-3">
          <Nav className="flex-column mb-auto">{renderNavItems()}</Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <div className="d-none d-md-block position-fixed top-0 start-0 vh-100 bg-danger text-white p-3 sidebar-custom" style={{ width: '250px' }}>
        <h4 className="fw-bold mb-3 text-center">Star Home</h4>
        <div className="mb-2 row justify-content-center">
          <img src={LogoProfile} alt="Profile Logo" style={{ width: 100, height: 75, borderRadius: '50%' }} />
        </div>
        <hr className="text-white" />
        <Nav className="flex-column mb-auto">{renderNavItems()}</Nav>
      </div>
    </div>
  );
};

export default Sidebar;
