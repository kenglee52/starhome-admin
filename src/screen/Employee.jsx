import React, { use } from 'react';
import { useState, useEffect } from 'react';
import Sidebar from '../component/Sidebar';
import Header from '../component/Header';
import { Container, Row, Col, Card, Button, Table, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const Employee = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const toggleSidebar = () => setShowSidebar(!showSidebar);
    const closeSidebar = () => setShowSidebar(false);
    const [Employees, setEmployees] = useState([]);
    const [Districts, setDistricts] = useState([]);
    const [Provinces, setProvicnces] = useState([]);
    const [Positions, setPositions] = useState([]);
    const [Role, setRole] = useState([]);
    const navigate = useNavigate();
    const getEmployee = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
                method: 'GET'
            });
            if (response.status === 200) {
                const responseData = await response.json();
                setEmployees(responseData)
            }
        } catch (error) {
            alert(error);
        }
    }
    const saveEmployee = async (data) => {
        const formData = new FormData();
        formData.append("employeeName", data.employeeName);
        formData.append("birth", data.birth);
        formData.append("employeeTel", data.employeeTel);
        formData.append("employeeVillage", data.employeeVillage);
        if (data.image) {
            formData.append("image", data.image);
        }
        formData.append("districtID", data.districtID);
        formData.append("salary", data.salary);
        formData.append("positionID", data.positionID);
        formData.append("employeeGender", data.employeeGender);

        const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/upload`, {
            method: "POST",
            body: formData,
        });

        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'ສຳເລັດ',
                text: 'ແກ້ໄຂສຳເລັດ',
                confirmButtonText: 'ຕົກລົງ',
                didOpen: () => {
                    document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
                }
            });
            getEmployee();
        }
    };
    const editEmployee = async (data, id) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'ສຳເລັດ',
                text: 'ແກ້ໄຂສຳເລັດ',
                confirmButtonText: 'ຕົກລົງ',
                didOpen: () => {
                    document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
                }
            });
            getEmployee();
        }
    };


    const LoadProvince = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/provinces`, {
                method: 'GET'
            });
            if (response.status === 200) {
                const data = await response.json();
                setProvicnces(data);
            }
        } catch (error) {
            console.error(error);
        }
    }
    const LoadDistrict = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/districts`,
                { method: 'GET' }
            );
            if (response.status === 200) {
                const data = await response.json();
                setDistricts(data);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const LoadPosition = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/positions`, {
                method: 'GET'
            });
            if (response.status === 200) {
                const data = await response.json();
                setPositions(data);
            }

        } catch (error) {
            alert(error)
        }
    }
    const createEmployee = async () => {
        Swal.fire({
            title: "ຟອມບັນທຶກພະນັກງານ",
            width: "80%",
            showCloseButton: true,
            showConfirmButton: false, // ปิดปุ่ม default
            html: `
      <form id="employeeForm" class="row g-3">
        <!-- ຊື່ພະນັກງານ -->
        <div class="col-md-6">
          <label class="form-label">ຊື່ພະນັກງານ</label>
          <input type="text" class="form-control" id="Name" placeholder="ປ້ອນຊື່ພະນັກງານ" required>
        </div>

        <!-- ວັນເກີດ -->
        <div class="col-md-6">
          <label class="form-label">ວັນເກີດ</label>
          <input type="date" class="form-control" id="Birth" required>
        </div>

        <!-- ເບີໂທ -->
        <div class="col-md-6">
          <label class="form-label">ເບີໂທ</label>
          <input type="text" class="form-control" id="Tel" placeholder="020xxxxxxx" required>
        </div>

        <!-- ບ້ານ -->
        <div class="col-md-6">
          <label class="form-label">ບ້ານ</label>
          <input type="text" class="form-control" id="Village" placeholder="ປ້ອນບ້ານ" required>
        </div>

        <!-- District / Province -->
        <div class="col-md-3">
          <label class="form-label">ເມືອງ</label>
          <select class="form-select" id="districtSelect" required>
            <option value="">-- ເລືອກເມືອງ --</option>
          </select>
        </div>
        <div class="col-md-3">
          <label class="form-label">ແຂວງ</label>
          <select class="form-select" id="provinceSelect" required>
            <option value="">-- ເລືອກແຂວງ --</option>
          </select>
        </div>

        <!-- Position -->
        <div class="col-md-6">
          <label class="form-label">ຕຳແໜ່ງ</label>
          <select class="form-select" id="positionSelect" required>
            <option value="">-- ເລືອກຕຳແໜ່ງ --</option>
          </select>
        </div>

        <!-- ເງິນເດືອນ -->
        <div class="col-md-6">
          <label class="form-label">ເງິນເດືອນ</label>
          <input type="number" class="form-control" id="Salary" placeholder="ປ້ອນເງິນເດືອນ" required>
        </div>

        <!-- ເພດ -->
        <div class="col-md-6">
          <label class="form-label">ເພດ</label>
          <select class="form-select" id="Gender" required>
            <option value="">ເລືອກເພດ</option>
            <option value="male">ຊາຍ</option>
            <option value="female">ຍິງ</option>
          </select>
        </div>

        <!-- CV -->
        <div class="col-12">
          <label class="form-label">CV</label>
          <input type="file" id="CV" class="form-control">
        </div>

        <!-- Buttons -->
        <div class="col-12 text-center">
          <button type="submit" class="btn btn-success px-4">💾 ບັນທຶກ</button>
        </div>
      </form>
    `,
            didOpen: () => {

                document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";

                const provinceSelect = document.getElementById('provinceSelect');
                const districtSelect = document.getElementById('districtSelect');
                const positionSelect = document.getElementById('positionSelect');

                // เติมตำแหน่ง
                Positions.forEach(p => {
                    const option = document.createElement('option');
                    option.value = p.positionID;
                    option.textContent = p.positionName;
                    positionSelect.appendChild(option);
                });

                // เติมจังหวัด
                Provinces.forEach(p => {
                    const option = document.createElement('option');
                    option.value = p.provinceID;
                    option.textContent = p.provinceName;
                    provinceSelect.appendChild(option);
                });

                // เติมอำเภอ
                Districts.forEach(d => {
                    const option = document.createElement('option');
                    option.value = d.districtID;
                    option.textContent = d.districtName;
                    districtSelect.appendChild(option);
                });

                // filter district by province
                provinceSelect.addEventListener('change', () => {
                    const selectedProvinceID = provinceSelect.value;
                    const filteredDistricts = Districts.filter(d => d.provinceID == selectedProvinceID);

                    districtSelect.innerHTML = '<option value="">-- ເລືອກເມືອງ --</option>';
                    filteredDistricts.forEach(d => {
                        const option = document.createElement('option');
                        option.value = d.districtID;
                        option.textContent = d.districtName;
                        districtSelect.appendChild(option);
                    });
                });

                // auto select province when district chosen
                districtSelect.addEventListener('change', () => {
                    const districtID = districtSelect.value;
                    const district = Districts.find(d => d.districtID == districtID);
                    if (district) provinceSelect.value = district.provinceID;
                });
                const form = document.getElementById("employeeForm");
                form.addEventListener("submit", async (e) => {
                    e.preventDefault();

                    const data = {
                        employeeName: document.getElementById("Name").value,
                        birth: document.getElementById("Birth").value,
                        employeeTel: document.getElementById("Tel").value,
                        employeeVillage: document.getElementById("Village").value,
                        image: document.getElementById("CV").files[0], // 🟢 ຮັບ file
                        districtID: document.getElementById("districtSelect").value,
                        salary: document.getElementById("Salary").value,
                        positionID: document.getElementById("positionSelect").value,
                        employeeGender: document.getElementById("Gender").value,
                    };

                    await saveEmployee(data);
                });

            }
        });
    }
    const updateEmployee = async (x) => {
        Swal.fire({
            title: "ຟອມບັນທຶກພະນັກງານ",
            width: "80%",
            showConfirmButton: false,
            showCloseButton: true,
            html: `
    <form id="employeeForm" class="row g-3">
      <div class="col-md-6">
        <label class="form-label">ຊື່ພະນັກງານ</label>
        <input type="text" class="form-control" id="Name" required value="${x.employeeName}">
      </div>
      <div class="col-md-6">
        <label class="form-label">ວັນເກີດ</label>
        <input type="date" class="form-control" id="Birth" required value="${new Date(x.birth).toISOString().split('T')[0]}">
      </div>
      <div class="col-md-6">
        <label class="form-label">ເບີໂທ</label>
        <input type="text" class="form-control" id="Tel" required value="${x.employeeTel}">
      </div>
      <div class="col-md-6">
        <label class="form-label">ບ້ານ</label>
        <input type="text" class="form-control" id="Village" required value="${x.employeeVillage}">
      </div>
      <div class="col-md-3">
        <label class="form-label">ເມືອງ</label>
        <select class="form-select" id="districtSelect" required></select>
      </div>
      <div class="col-md-3">
        <label class="form-label">ແຂວງ</label>
        <select class="form-select" id="provinceSelect" required></select>
      </div>
      <div class="col-md-6">
        <label class="form-label">ຕຳແໜ່ງ</label>
        <select class="form-select" id="positionSelect" required></select>
      </div>
      <div class="col-md-6">
        <label class="form-label">ເງິນເດືອນ</label>
        <input type="number" class="form-control" id="Salary" required value="${x.salary}">
      </div>
      <div class="col-md-6">
        <label class="form-label">ເພດ</label>
        <select class="form-select" id="Gender" required>
          <option value="">ເລືອກເພດ</option>
          <option value="male">ຊາຍ</option>
          <option value="female">ຍິງ</option>
        </select>
      </div>
      <div class="col-12 text-center">
        <button type="submit" class="btn btn-success px-4">💾 ບັນທຶກ</button>
      </div>
    </form>
    `,
            didOpen: () => {

                document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";

                const provinceSelect = document.getElementById('provinceSelect');
                const districtSelect = document.getElementById('districtSelect');
                const positionSelect = document.getElementById('positionSelect');
                const genderSelect = document.getElementById('Gender');

                // เติมตำแหน่ง
                Positions.forEach(p => {
                    const option = document.createElement('option');
                    option.value = p.positionID;
                    option.textContent = p.positionName;
                    if (p.positionID === x.positionID) option.selected = true;
                    positionSelect.appendChild(option);
                });

                // เติมจังหวัด
                Provinces.forEach(p => {
                    const option = document.createElement('option');
                    option.value = p.provinceID;
                    option.textContent = p.provinceName;
                    if (p.provinceID === x.district.provinceID) option.selected = true;
                    provinceSelect.appendChild(option);
                });

                // เติมอำเภอและ filter ตามจังหวัด
                const filteredDistricts = Districts.filter(d => d.provinceID == x.district.provinceID);
                districtSelect.innerHTML = '<option value="">-- ເລືອກເມືອງ --</option>';
                filteredDistricts.forEach(d => {
                    const option = document.createElement('option');
                    option.value = d.districtID;
                    option.textContent = d.districtName;
                    if (d.districtID === x.districtID) option.selected = true;
                    districtSelect.appendChild(option);
                });

                // filter district เมื่อเปลี่ยน province
                provinceSelect.addEventListener('change', () => {
                    const selectedProvinceID = provinceSelect.value;
                    const filtered = Districts.filter(d => d.provinceID == selectedProvinceID);
                    districtSelect.innerHTML = '<option value="">-- ເລືອກເມືອງ --</option>';
                    filtered.forEach(d => {
                        const option = document.createElement('option');
                        option.value = d.districtID;
                        option.textContent = d.districtName;
                        districtSelect.appendChild(option);
                    });
                });

                // auto select province เมื่อเลือก district
                districtSelect.addEventListener('change', () => {
                    const district = Districts.find(d => d.districtID == districtSelect.value);
                    if (district) provinceSelect.value = district.provinceID;
                });

                // set gender
                genderSelect.value = x.employeeGender;

                // submit form
                const form = document.getElementById("employeeForm");
                form.addEventListener("submit", async (e) => {
                    e.preventDefault();
                    const data = {
                        employeeName: document.getElementById("Name").value,
                        birth: document.getElementById("Birth").value,
                        employeeTel: document.getElementById("Tel").value,
                        employeeVillage: document.getElementById("Village").value,
                        districtID: document.getElementById("districtSelect").value,
                        salary: document.getElementById("Salary").value,
                        positionID: document.getElementById("positionSelect").value,
                        employeeGender: document.getElementById("Gender").value,
                    };
                    await editEmployee(data, x.employeeID);
                });
            }
        });
    }

    const deleteEmployee = async (id) => {
        const result = await Swal.fire({
            title: 'ຢືນຢັນການລຶບ',
            text: "ທ່ານຕ້ອງການລົບແທ້ ຫຼື ບໍ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'ລຶບ',
            cancelButtonText: 'ຍົກເລີກ',
            didOpen: () => {
                document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
            }
        });

        if (result.isConfirmed) {  // ✅ now result is resolved
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
                    method: 'DELETE'
                });
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'ສຳເລັດ',
                        text: 'ລົບສຳເລັດ',
                        didOpen: () => {
                            document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
                        },
                        confirmButtonText: 'ຕົກລົງ'
                    });
                    getEmployee(); // refresh table after delete
                }
            } catch (error) {
                alert(error);
            }
        }
    }
    const loadRole = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/roles`, {
                method: 'GET'
            });
            if (response.status === 200) {
                const data = await response.json();
                setRole(data);
            }
        } catch (error) {

        }
    }
    const createUser = (id) => {
        Swal.fire({
            title: 'ຟອມເພີ່ມຜູ້ໃຊ້',
            showConfirmButton: false,
            showCloseButton: true,
            html: `
            <select class="form-control mb-2" id="role">
               <option value="">--ເລືອກສິດທິ--</option>
            </select>
            <input type="text" id="password" class="swal2-input" placeholder="ລະຫັດຜ່ານ">
            <button id="saveUserBtn" class="swal2-confirm swal2-styled" style="display:inline-block;margin-top:10px;">💾 ບັນທຶກ</button>
        `,
            didOpen: () => {
                document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
                const role = document.getElementById('role');
                Role.forEach(p => {
                    const option = document.createElement('option');
                    option.value = p.roleID;   // ✅ ປ່ຽນມາໃຊ້ roleID
                    option.textContent = p.roleStatus;
                    role.appendChild(option);
                });

                const saveBtn = document.getElementById("saveUserBtn");
                saveBtn.addEventListener("click", async () => {
                    const roleID = document.getElementById("role").value;
                    const password = document.getElementById("password").value;

                    if (!roleID || !password) {
                        Swal.showValidationMessage("ກະລຸນາປ້ອນຂໍ້ມູນທັງຫມົດ");
                        return;
                    }

                    try {
                        const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ roleID, employeeID: id, password })
                        });

                        if (response.status === 200) {
                            Swal.fire({
                                icon: 'success',
                                title: 'ສຳເລັດ',
                                text: 'ບັນທຶກຜູ້ໃຊ້ສຳເລັດ',
                                timer: 1500,
                                showConfirmButton: false
                            });
                        } else {
                            const err = await response.text();
                            Swal.fire("ຜິດພາດ", err, "error");
                        }
                    } catch (error) {
                        Swal.fire("ຜິດພາດ", error.message, "error");
                    }
                });
            }
        });
    };

    useEffect(() => {
        getEmployee();
        LoadDistrict();
        LoadProvince();
        LoadPosition();
        loadRole();
    }, []);
    const search = () => {
        let input = document.getElementById("myInput");
        let filter = input.value.toUpperCase();
        let table = document.getElementById("myTable");
        let tr = table.getElementsByTagName("tr");

        for (let i = 0; i < tr.length; i++) {
            let tds = tr[i].getElementsByTagName("td");
            let rowMatch = false;

            for (let j = 0; j < tds.length; j++) {   // ✅ ວິ່ງທຸກ column
                let td = tds[j];
                if (td) {
                    let txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        rowMatch = true;
                        break;  // ພົບແລ້ວບໍ່ຕ້ອງເຊັກຄໍລຳອື່ນຕໍ່
                    }
                }
            }

            tr[i].style.display = rowMatch ? "" : "none";
        }
    }

    return (
        <div>
            <div className="d-flex" style={{ fontFamily: 'Noto Sans Lao' }}>
                <Sidebar show={showSidebar} handleClose={closeSidebar} />
                <div className="flex-grow-1">
                    <Header toggleSidebar={toggleSidebar} />
                    <Container fluid className="py-3">
                        <Card className='shadow-lg'>
                            <h3 className='text-center mt-3 text-danger fw-bold mb-2'>
                                ຟອມຈັດການພະນັກງານ
                            </h3>
                            <Row className='p-3'>
                                <FormGroup>
                                    <FormLabel>ຄົ້ນຫາພະນັກງານ</FormLabel>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="fas fa-search"></i></span>
                                        <FormControl onKeyUp={search} id='myInput' placeholder='ຄົ້ນຫາພະນັກງານ'></FormControl>
                                    </div>
                                </FormGroup>
                            </Row>
                            <Row className='mb-2 p-2'>
                                <Container>
                                    <Button onClick={createEmployee} className='btn btn-danger'><i className="fas fa-add">&nbsp;</i>ເພີ່ມພະນັກງານ</Button>&nbsp;
                                    <Button className='btn btn-primary' onClick={()=>{navigate("/user")}}><i className="fas fa-users">&nbsp;</i>ຜູ້ໃຊ້ໝົດ</Button>
                                </Container>
                            </Row>
                            <Card.Footer>
                                <Table className='table table-striped text-center' id='myTable'>
                                    <thead>
                                        <tr>
                                            <td>ຊື່ ແລະ ນາມສະກຸນ</td>
                                            <td>ເພດ</td>
                                            <td>ວັນເດືອນປີເກີດ</td>
                                            <td>ເບີໂທລະສັບ</td>
                                            <td>ບ້ານ</td>
                                            <td>ເມືອງ</td>
                                            <td>ແຂວງ</td>
                                            <td>ເງິນເດືອນ</td>
                                            <td>ຕຳແໜ່ງ</td>
                                            <td>ປຸ່ມຈັດການ</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Employees.map((x) => (
                                            <tr key={x.employeeID}>
                                                <td>{x.employeeName}</td>
                                                <td>{x.employeeGender}</td>
                                                <td>{new Date(x.birth).toLocaleDateString()}</td>
                                                <td>{x.employeeTel}</td>
                                                <td>{x.employeeVillage}</td>
                                                <td>{x.district.districtName}</td>
                                                <td>{x.district.province.provinceName}</td>
                                                <td>{x.salary}</td>
                                                <td>{x.position.positionName}</td>
                                                <td>
                                                    <div className="dropdown">
                                                        <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                                            <i className="fas fa-ellipsis-v"></i>
                                                        </button>
                                                        <ul className="dropdown-menu">
                                                            <li>
                                                                <Container>
                                                                    <Button onClick={() => updateEmployee(x)} className='btn btn-edit bg-primary w-100 mb-2'><i className="fas fa-edit">&nbsp;</i>ແກ້ໄຂ</Button>
                                                                </Container>
                                                            </li>
                                                            <li>
                                                                <Container>
                                                                    <Button onClick={() => deleteEmployee(x.employeeID)} className='btn btn-edit bg-danger w-100 mb-2'><i className="fas fa-trash">&nbsp;</i>ລົບ</Button>
                                                                </Container>
                                                            </li>
                                                            <li>
                                                                <Container>
                                                                    <Button className='btn btn-edit bg-success w-100 mb-2'><i className="fas fa-eye">&nbsp;</i> CV</Button>
                                                                </Container>
                                                            </li>
                                                            <li>
                                                                <Container>
                                                                    <Button onClick={() => createUser(x.employeeID)} className='btn btn-edit bg-info w-100 mb-2'><i className="fas fa-user">&nbsp;</i>ເພີ່ມຜູ້ໃຊ້</Button>
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

export default Employee;
