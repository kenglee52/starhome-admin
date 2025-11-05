import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from '../component/Header';
import Sidebar from '../component/Sidebar';
import { Container, Card, Row, FormGroup, FormControl, FormLabel, Col, Button, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
const ProductType = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const toggleSidebar = () => setShowSidebar(!showSidebar);
    const closeSidebar = () => setShowSidebar(false);
    const [ProductTypes, setProductTypes] = useState([]);
    const [productTypeName, setProductTypeName] = useState("");
    const getData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/producttypes`, {
                method: 'GET'
            });
            if (response.status === 200) {
                const responseData = await response.json();
                setProductTypes(responseData)
            }
        } catch (error) {
            alert(error)
        }
    }
    const saveData = async () => {
        if (!productTypeName) {
            Swal.fire({
                icon: "warning",
                title: "ກະລຸນາປ້ອນຂໍ້ມູນ",
                timer: 1500
            });
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/producttypes`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ productTypeName })
            });
            if (response.status === 400) {
                Swal.fire({
                    icon: 'warning',
                    title: 'ຂໍ້ມູນຊໍ້າ',
                    text: 'ກະລຸນາປ້ອນໃໝ່ອີກຄັ້ງ',
                    confirmButtonText: 'ຕົກລົງ'
                });
                return;
            }
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "ບັນທຶກສຳເລັດ",
                    text: 'ບັນທຶກຂໍ້ມູນສຳເລັດ',
                    timer: 1500
                });
                setProductTypeName("");
                getData();
            }
        } catch (error) {
            alert(error);
        }
    };
    const deleteData = async (productTypeID) => {
        const result = Swal.fire({
            title: 'ຢືນຢັນການລຶບ',
            text: "ທ່ານຕ້ອງການລົບແທ້ຫຼືບໍ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'ລຶບ',
            cancelButtonText: 'ຍົກເລີກ'
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/producttypes/${productTypeID}`, {
                    method: 'DELETE',
                });
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'ລຶບສຳເລັດ',
                        timer: 1500
                    });
                    getData();
                }
            } catch (error) {
                alert(error);
            }
        }
    };
    const updateData = (x) => {
        Swal.fire({
            title: "ຟອມແກ້ໄຂຂໍ້ມູນ",
            confirmButtonText: "ປິດຟອມ",
            html: `
         <div class="mb-3 mt-3">
           <input class="form-control" id="productType" value="${x.productTypeName}"/>
           <div class="container mt-3 text-end">
              <button class="btn btn-success btn-save"><i class="fas fa-save">&nbsp;</i>ບັນທຶກ</button>
           </div>
         </div>
        `,
            didOpen: () => {
                const input = document.getElementById("productType");
                const btnSave = document.querySelector(".btn-save");

                btnSave.addEventListener("click", async () => {
                    const updatedName = input.value.trim();
                    if (!updatedName) {
                        Swal.showValidationMessage("ກະລຸນາປ້ອນຂໍ້ມູນ");
                        return;
                    }

                    try {
                        const response = await fetch(`${process.env.REACT_APP_API_URL}/producttypes/${x.productTypeID}`, {
                            method: 'PUT',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ productTypeName: updatedName })
                        });
                        if (response.status === 400) {
                            Swal.fire({
                                icon: 'warning',
                                title: 'ຂໍ້ມູນຊໍ້າ',
                                text: 'ກະລຸນາປ້ອນໃໝ່ອີກຄັ້ງ',
                                confirmButtonText: 'ຕົກລົງ'
                            });
                            return;
                        }
                        if (response.status === 200) {
                            Swal.fire({
                                icon: 'success',
                                title: 'ແກ້ໄຂສຳເລັດ',
                                timer: 1500
                            });
                            getData(); // refresh table
                        }
                    } catch (error) {
                        alert(error);
                    }
                });
            },
        });
    };

    useEffect(() => {
        getData();
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
                                ຟອມຈັດການປະເພດຊັບສິນ
                            </h3>
                            <Container>
                                <Row className="mb-2">
                                    <Col md={12}>
                                        <FormGroup style={{ maxWidth: '50%' }}>
                                            <FormLabel>ປະເພດຊັບສິນ</FormLabel>
                                            <FormControl
                                                placeholder='ປ້ອນປະເພດຊັບສິນ'
                                                value={productTypeName}
                                                onChange={(e) => setProductTypeName(e.target.value)}
                                            ></FormControl>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className='mb-3'>
                                    <Container>
                                        <Button className='btn btn-danger' onClick={saveData}><i className="fas fa-save">&nbsp;</i>ບັນທຶກ</Button>
                                    </Container>
                                </Row>
                            </Container>
                            <Card.Footer>
                                <Table className='table table-striped text-center'>
                                    <thead className='table table-dark'>
                                        <tr>
                                            <td>ລະຫັດ</td>
                                            <td>ປະເພດຊັບສິນ</td>
                                            <td>ປຸ່ມຈັດການ</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ProductTypes.map((x) => (
                                            <tr key={x.productTypeID}>
                                                <td>{x.productTypeID}</td>
                                                <td>{x.productTypeName}</td>
                                                <td>
                                                    <Button className='btn btn-primary'><i className="fas fa-edit" onClick={() => updateData(x)}></i></Button>&nbsp;
                                                    <Button className='btn btn-danger'><i className="fas fa-trash" onClick={() => deleteData(x.productTypeID)}></i></Button>
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

export default ProductType;
