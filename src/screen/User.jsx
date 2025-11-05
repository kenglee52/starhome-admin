import React from 'react';
import { useState, useEffect } from 'react';
import Sidebar from '../component/Sidebar';
import Header from '../component/Header';
import { Container, Row, Col, Card, Button, Table, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import Swal from 'sweetalert2';
const User = () => {
    const [Role, setRole] = useState([]);
    const [Users, setUsers] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);
    const toggleSidebar = () => setShowSidebar(!showSidebar);
    const closeSidebar = () => setShowSidebar(false);
    const getUsers = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
                method: 'GET'
            });
            if (response.status === 200) {
                const data = await response.json();
                setUsers(data)
            };
        } catch (error) {
            alert(error)
        }
    }

    const getRoles = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/roles`, {
                method: 'GET'
            });
            if (res.status === 200) {
                const data = await res.json();
                setRole(data);
            }
        } catch (error) {
            alert(error);
        }
    }
    const updateUser = async (id, roleID) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    roleID: roleID
                })
            });
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'ສຳເລັດ',
                    text: 'ແກ້ໄຂສຳເລັດແລ້ວ',
                    confirmButtonText: 'ຕົກລົງ'
                })
            }
        } catch (error) {
            alert(error);
        }
    }
    const popUpEdit = (user) => {
        Swal.fire({
            title: 'ແກ້ໄຂສິດທິຜູ້ໃຊ້',
            showConfirmButton: false,
            showCloseButton: true,
            html: `
      <select class="form-control mb-2" id="status">
        <option value="">--ກະລຸນາເລືອກ--</option>
      </select>
      <button class="btn btn-success w-100" id="btnSave">ແກ້ໄຂ</button>
    `,
            didOpen: () => {
                const roleSelect = document.getElementById("status");
                Role.forEach(r => {
                    const option = document.createElement("option");
                    option.value = r.roleID;
                    option.textContent = r.roleStatus;
                    if (r.roleID === user.roleID) {
                        option.selected = true;
                    }
                    roleSelect.appendChild(option);
                });

                document.getElementById("btnSave").addEventListener("click", async () => {
                    const selectedRoleID = roleSelect.value;
                    if (!selectedRoleID) {
                        Swal.showValidationMessage("ກະລຸນາເລືອກສິດທິ");
                        return;
                    }
                    await updateUser(user.userID, selectedRoleID);
                    getUsers();
                });
            }
        });
    };

    const deleteUser = async (id) => {
        const confirm = await Swal.fire({
            icon: 'question',
            title: 'ຢືນຢັນການລົບ',
            text: 'ທ່ານຕ້ອງການລົບແທ້ ຫຼື ບໍ',
            cancelButtonText: 'ຍົກເລີກ',
            showCancelButton: true,
            confirmButtonText: 'ລົບ'
        })
        if (confirm.isConfirmed) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
                    method: 'DELETE'
                });
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'ສຳເລັດ',
                        text: 'ລົບຂໍ້ມູນສຳເລັດ',
                        confirmButtonText: 'ຕົກລົງ'
                    });
                    getUsers();
                }
            } catch (error) {
                alert(error);
            }
        }
    }

    useEffect(() => {
        getUsers();
        getRoles();
    }, [])
    return (
        <div>
            <div className="d-flex" style={{ fontFamily: 'Noto Sans Lao' }}>
                <Sidebar show={showSidebar} handleClose={closeSidebar} />
                <div className="flex-grow-1">
                    <Header toggleSidebar={toggleSidebar} />
                    <Container fluid className="py-3">
                        <Card className='shadow-lg'>
                            <h3 className='text-center mt-3 text-danger fw-bold mb-2'>
                                ຟອມຈັດການຜູ້ໃຊ້
                            </h3>
                            <Row className='p-3'>
                                <FormGroup>
                                    <FormLabel>ຄົ້ນຫາຜູ້ໃຊ້</FormLabel>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="fas fa-search"></i></span>
                                        <FormControl id='myInput' placeholder='ຄົ້ນຫາຜູ້ໃຊ້'></FormControl>
                                    </div>
                                </FormGroup>
                            </Row>
                            <Card.Footer>
                                <Table className='table table-striped text-center'>
                                    <thead>
                                        <tr>
                                            <td>ຊື່ ແລະ ນາມສະກຸນ</td>
                                            <td>ເພດ</td>
                                            <td>ເບີໂທລະສັບ</td>
                                            <td>ສິດທິເຂົ້າໃຊ້ລະບົບ</td>
                                            <td>ປຸ່ມຈັດການ</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Users.map((user) => (
                                            <tr key={user.userID}>
                                                <td>{user.Employee.employeeName}</td>
                                                <td>{user.Employee.employeeGender}</td>
                                                <td>{user.Employee.employeeTel}</td>
                                                <td>{user.Role.roleStatus}</td>
                                                <td>
                                                    <div className="dropdown">
                                                        <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                                            <i className="fas fa-ellipsis-v"></i>
                                                        </button>
                                                        <ul className="dropdown-menu">
                                                            <li>
                                                                <Container>
                                                                    <Button className='btn btn-edit bg-primary w-100 mb-2' onClick={() => popUpEdit(user)}
                                                                    ><i className="fas fa-edit">&nbsp;</i>ແກ້ໄຂ</Button>
                                                                </Container>
                                                            </li>
                                                            <li>
                                                                <Container>
                                                                    <Button className='btn btn-edit bg-danger w-100 mb-2' onClick={()=>deleteUser(user.userID)}
                                                                    ><i className="fas fa-trash">&nbsp;</i>ລົບ</Button>
                                                                </Container>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Footer>
                        </Card>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default User;
