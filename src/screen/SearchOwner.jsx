import React, { useState, useEffect } from 'react';
import { Container, Card, FormControl, Button, Row, FormGroup, FormLabel, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../component/Header';
import Sidebar from '../component/Sidebar';
import Swal from 'sweetalert2';

const SearchOwner = () => {
    const [Owners, setOwners] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);
    const [Districts, setDistricts] = useState([]);
    const [Provinces, setProvicnces] = useState([]);
    const [ProductTypes, setProductTypes] = useState([]);

    const toggleSidebar = () => setShowSidebar(!showSidebar);
    const closeSidebar = () => setShowSidebar(false);


    const LoadProvince = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/provinces`);
            if (response.status === 200) {
                const data = await response.json();
                setProvicnces(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const LoadDistrict = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/districts`);
            if (response.status === 200) {
                const data = await response.json();
                setDistricts(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const LoadProductType = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/producttypes`);
            if (response.status === 200) {
                const data = await response.json();
                setProductTypes(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getAllOwners = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/owners`);
            if (response.status === 200) {
                const responseData = await response.json();
                setOwners(responseData);
            }
        } catch (error) {
            alert(error);
        }
    };

    const ProductAutoId = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/products/autoid`);
            if (response.status === 200) {
                const responseData = await response.json();
                document.getElementById('AutoId').value = responseData.newId;
            }
        } catch (error) {
            alert(error);
        }
    };

    const saveProduct = async (productID, productName, ownerID, productTypeID, village, districtID, status, size, price, images, videos, tel, description) => {
        try {
            if (!productID || !productName || !ownerID || !productTypeID || !districtID || !status || !price) {
                throw new Error('ກະລຸນາປ້ອນຂໍ້ມູນທີ່ຈຳເປັນໃຫ້ຄົບຖ້ວນ');
            }
            const formData = new FormData();
            formData.append('productID', productID);
            formData.append('productName', productName);
            formData.append('ownerID', ownerID); // ✅ append ownerID
            formData.append('productTypeID', productTypeID);
            formData.append('village', village || '');
            formData.append('districtID', districtID);
            formData.append('status', status);
            formData.append('size', size || '');
            formData.append('price', price);
            formData.append('tel', tel || '');
            formData.append('description', description || '');

            if (images && images.length > 0) {
                for (let i = 0; i < images.length; i++) {
                    formData.append('image', images[i]);
                }
            }
            if (videos && videos.length > 0) {
                for (let i = 0; i < videos.length; i++) {
                    formData.append('video', videos[i]);
                }
            }

            const response = await fetch(`${process.env.REACT_APP_API_URL}/products/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`ການບັນທຶກຂໍ້ມູນລົ້ມເຫລວ: ${errorData.message || response.statusText}`);
            }

            const responseData = await response.json();
            console.log('Server response:', responseData);
            return responseData;
        } catch (error) {
            console.error('Error in saveProduct:', error);
            throw error;
        }
    };
    const deleteOwner = async (ownerID) => {
        Swal.fire({
            title: 'ຢືນຢັນການລົບ?',
            text: "ເຈົ້າຕ້ອງການລົບຂໍ້ມູນນີ້ຫຼືບໍ?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'ຕົກລົງ',
            cancelButtonText: 'ຍົກເລີກ',
            didOpen: () => {
                document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/owners/${ownerID}`, {
                        method: "DELETE"
                    });
                    if (response.status === 200) {
                        getAllOwners();
                        Swal.fire({
                            title: 'ລົບສຳເລັດ',
                            icon: 'success',
                            text: 'ລົບຂໍ້ມູນເຈົ້າຂອງຊັບສິນສຳເລັດ',
                            confirmButtonText: 'ຕົກລົງ',
                            didOpen: () => {
                                document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
                            }
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: 'ມີຂໍ້ຜິດພາດ',
                        icon: 'error',
                        text: error.message,
                        confirmButtonText: 'ຕົກລົງ',
                        didOpen: () => {
                            document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
                        }
                    });
                }
            }
        });
    };

    // ✅ popup form
    const PopUpSave = (ownerID) => {
        Swal.fire({
            title: 'ຟອມເພີ່ມຂໍ້ມູນ',
            width: '100%',
            confirmButtonText: 'ປິດຟອມ',
            html: `
        <div class="card-body">
          <form id="productForm" enctype="multipart/form-data">
            <h5 class="text-danger">ຂໍ້ມູນຊັບສິນ (Product)</h5>
            <div class="row g-3 mb-3">
              <div class="col-md-6">
                <label class="form-label">ຊື່ຊັບສິນ</label>
                <input type="text" name="productName" class="form-control" required>
              </div>
              <div class="col-md-6">
                <label class="form-label">ປະເພດຊັບສິນ</label>
                <select name="productTypeID" id="productTypeSelect" class="form-control" required>
                  <option value="">-- ເລືອກປະເພດ --</option>
                </select>
              </div>
            </div>

            <div class="row g-3 mb-3">
              <div class="col-md-4">
                <label class="form-label">ແຂວງ</label>
                <select id="provinceSelect" class="form-control" required></select>
              </div>
              <div class="col-md-4">
                <label class="form-label">ເມືອງ</label>
                <select id="districtSelect" name="districtID" class="form-control" required></select>
              </div>
              <div class="col-md-4">
                <label class="form-label">ບ້ານ</label>
                <input type="text" name="village" class="form-control">
              </div>
            </div>

            <div class="row g-3 mb-3">
              <div class="col-md-4">
                <label class="form-label">ສະຖານະ</label>
                <select name="status" class="form-control" required>
                  <option value="">-- ເລືອກ --</option>
                  <option value="ເຊົ່າ">ເຊົ່າ</option>
                  <option value="ຂາຍ">ຂາຍ</option>
                </select>
              </div>
              <div class="col-md-4">
                <label class="form-label">ຂະໜາດ (m²)</label>
                <input type="text" name="size" class="form-control">
              </div>
              <div class="col-md-4">
                <label class="form-label">ລາຄາ (ກີບ)</label>
                <input type="number" name="price" class="form-control" required>
              </div>
            </div>

            <div class="row g-3 mb-3">
              <div class="col-md-6">
                <label class="form-label">ຮູບພາບ</label>
                <input type="file" name="image" class="form-control" accept="image/*" multiple>
              </div>
              <div class="col-md-6">
                <label class="form-label">ວີດີໂອ</label>
                <input type="file" name="video" class="form-control" accept="video/*" multiple>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">ລາຍລະອຽດ</label>
              <textarea name="description" class="form-control" rows="3"></textarea>
            </div>

            <div class="text-end">
              <button class="btn btn-success">
                <i class="fa fa-save me-1"></i> ບັນທຶກ
              </button>
            </div>
          </form>
        </div>
      `,
            didOpen: () => {
                document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";

                const provinceSelect = document.getElementById('provinceSelect');
                const districtSelect = document.getElementById('districtSelect');
                const productTypeSelect = document.getElementById('productTypeSelect');

                // ດຶງຂໍ້ມູນແຂວງ
                provinceSelect.innerHTML = '<option value="">-- ເລືອກແຂວງ --</option>';
                Provinces.forEach(p => {
                    const option = document.createElement('option');
                    option.value = p.provinceID;
                    option.textContent = p.provinceName;
                    provinceSelect.appendChild(option);
                });

                // ດຶງເມືອງ
                districtSelect.innerHTML = '<option value="">-- ເລືອກເມືອງ --</option>';
                Districts.forEach(d => {
                    const option = document.createElement('option');
                    option.value = d.districtID;
                    option.textContent = d.districtName;
                    districtSelect.appendChild(option);
                });

                // ດຶງປະເພດ
                ProductTypes.forEach(p => {
                    const option = document.createElement('option');
                    option.value = p.productTypeID;
                    option.textContent = p.productTypeName;
                    productTypeSelect.appendChild(option);
                });

                // auto filter district by province
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

                // auto select province by district
                districtSelect.addEventListener('change', () => {
                    const districtID = districtSelect.value;
                    const district = Districts.find(d => d.districtID == districtID);
                    if (district) provinceSelect.value = district.provinceID;
                });

                // handle submit
                const form = document.getElementById('productForm');
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const formData = new FormData(form);
                    const product = document.getElementById('AutoId').value;

                    Swal.fire({
                        title: 'ກຳລັງບັນທຶກ',
                        text: 'ກະລຸນາລໍຖ້າ...',
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading();
                            document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
                        }
                    });

                    try {
                        const imageFiles = form.querySelector('input[name="image"]').files;
                        const videoFiles = form.querySelector('input[name="video"]').files;

                        if (!imageFiles || imageFiles.length === 0) {
                            throw new Error('ກະລຸນາເລືອກຮູບພາບຢ່າງໜ້ອຍ 1 ຮູບ');
                        }
                        if (!videoFiles || videoFiles.length === 0) {
                            throw new Error('ກະລຸນາເລືອກວິດີໂອຢ່າງໜ້ອຍ 1 ໄຟລ໌');
                        }

                        await saveProduct(
                            product,
                            formData.get('productName'),
                            ownerID,
                            formData.get('productTypeID'),
                            formData.get('village'),
                            formData.get('districtID'),
                            formData.get('status'),
                            formData.get('size'),
                            formData.get('price'),
                            imageFiles,
                            videoFiles,
                            '',
                            formData.get('description')
                        );

                        await Swal.fire({
                            icon: 'success',
                            title: 'ບັນທຶກສຳເລັດ',
                            text: 'ການບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ',
                            confirmButtonText: 'ຕົກລົງ',
                            didOpen: () => {
                                document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
                            }
                        });
                    } catch (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'ຜິດພາດ',
                            text: error.message || error.toString(),
                            confirmButtonText: 'ຕົກລົງ',
                            didOpen: () => {
                                document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
                            }
                        });
                    }
                });
            }
        });
    };
    const PopUpEdit = (owner) => {
        Swal.fire({
            title: 'ແກ້ໄຂຂໍ້ມູນເຈົ້າຂອງຊັບສິນ',
            confirmButtonText: 'ປິດຟອມ',
            width: '50%',
            html: `
      <div class="card-body">
        <form id="OwnerForm" enctype="multipart/form-data">
          <h5 class="text-danger">ຂໍ້ມູນເຈົ້າຂອງຊັບສິນ</h5>
          <div class="row g-3 mb-3">
            <div class="col-md-4">
              <label class="form-label">ຊື່ ແລະ ນາມສະກຸນ</label>
              <input type="text" name="Name" class="form-control" required value="${owner.ownerName}">
            </div>
            <div class="col-md-4">
              <label class="form-label">ເພດ</label>
              <select name="Gender" id="Gender" class="form-control" required>
                <option value="">-- ເລືອກເພດ --</option>
                <option value="ຊາຍ">ຊາຍ</option>
                <option value="ຍິງ">ຍິງ</option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label">ເບໂທລະສັບ</label>
              <input type="text" name="Tel" class="form-control" required value="${owner.ownerTel}">
            </div>
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-success btn-update">
              <i class="fa fa-save me-1"></i> ບັນທຶກ
            </button>
          </div>
        </form>
      </div>
    `,
            didOpen: () => {
                document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
                document.getElementById("Gender").value = owner.ownerGender;

                // ຈັບ event submit ຟອມ
                const form = document.getElementById("OwnerForm");
                form.addEventListener("submit", async (e) => {
                    e.preventDefault();

                    const updatedOwner = {
                        ownerName: form.Name.value,
                        ownerGender: form.Gender.value,
                        ownerTel: form.Tel.value,
                    };

                    try {
                        const res = await fetch(`${process.env.REACT_APP_API_URL}/owners/${owner.ownerID}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(updatedOwner),
                        });

                        if (res.ok) {
                            Swal.fire({
                                icon: "success",
                                title: "ສຳເລັດ!",
                                text: "ແກ້ໄຂຂໍ້ມູນແລ້ວ",
                                timer: 1500,
                                showConfirmButton: false,
                                didOpen: () => {
                                    document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
                                }
                            }).then(() => {
                                getAllOwners();
                            });
                        } else {
                            Swal.fire("Error", "ບໍ່ສາມາດແກ້ໄຂໄດ້", "error");
                        }
                    } catch (err) {
                        Swal.fire("Error", "ມີຂໍ້ຜິດພາດ!", "error");
                        alert(err);
                    }
                });
            },
        });
    };
    useEffect(() => {
        getAllOwners();
        LoadDistrict();
        LoadProvince();
        ProductAutoId();
        LoadProductType();
    }, []);
    useEffect(() => {
        const searchInput = document.getElementById('searchInput');

        const handleSearch = () => {
            const filter = searchInput.value.toLowerCase();
            const rows = document.querySelectorAll('tbody tr');

            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                const matches = Array.from(cells).some(cell =>
                    cell.textContent.toLowerCase().includes(filter)
                );
                row.style.display = matches ? '' : 'none';
            });
        };

        searchInput.addEventListener('input', handleSearch);

        return () => {
            searchInput.removeEventListener('input', handleSearch);
        };
    }, [Owners]);


    return (
        <div>
            <div className="d-flex" style={{ fontFamily: 'Noto Sans Lao' }}>
                <Sidebar show={showSidebar} handleClose={closeSidebar} />
                <div className="flex-grow-1">
                    <Header toggleSidebar={toggleSidebar} />
                    <Container fluid className="py-3">
                        <Card className='shadow-lg'>
                            <Card.Body>
                                <h3 className="text-center fw-bold text-danger mt-2">ຂໍ້ມູນເຈົ້າຂອງຊັບສິນ</h3>
                                <Container>
                                    <Row className='mt-2 mb-2'>
                                        <FormGroup>
                                            <FormLabel>ຄົ້ນຫາເຈົ້າຂອງຊັບສິນ</FormLabel>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <i className="fas fa-search"></i>
                                                </span>
                                                <FormControl id='searchInput' placeholder='ຄົ້ນຫາຊື່ ຫຼື ເບີໂທລະສັບ'></FormControl>
                                            </div>
                                        </FormGroup>
                                        <FormControl id='AutoId' type='hidden'></FormControl>
                                    </Row>
                                </Container>
                            </Card.Body>
                            <Card.Footer>
                               <div className="table-responsive" style={{ fontFamily: "'Noto Sans Lao', sans-serif" ,maxHeight: '700px', overflowY: 'auto'}}>
                                        <Table className='table table-striped text-center table-hover' style={{ fontSize: "clamp(12px, 2vw, 16px)" }}>
                                            <thead className='table-light' style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                                                <tr>
                                                    <th>ລະຫັດ</th>
                                                    <th>ຊື່ ແລະ ນາມສະກຸນ</th>
                                                    <th>ເພດ</th>
                                                    <th>ເບີໂທລະສັບ</th>
                                                    <th>ປຸ່ມຈັດການ</th>
                                                </tr>
                                            </thead>
                                            <tbody style={{ cursor: 'pointer' }}>
                                                {Owners.map(owner => (
                                                    <tr key={owner.ownerID}>
                                                        <td>{owner.ownerID}</td>
                                                        <td>{owner.ownerName}</td>
                                                        <td>{owner.ownerGender}</td>
                                                        <td>{owner.ownerTel}</td>
                                                        <td>
                                                            <div className="d-flex flex-wrap gap-2 justify-content-center">
                                                                <Button className='btn btn-success' size="sm" onClick={() => PopUpSave(owner.ownerID)}>
                                                                    <i className="fas fa-add">&nbsp;</i>ເພີ່ມຊັບສິນ
                                                                </Button>
                                                                <Button className='btn btn-warning' size="sm" onClick={() => PopUpEdit(owner)}>
                                                                    <i className="fas fa-edit"></i>ແກ້ໄຂ
                                                                </Button>
                                                                <Button className='btn btn-danger' size="sm" onClick={() => deleteOwner(owner.ownerID)}>
                                                                    <i className="fas fa-trash">&nbsp;</i>ລົບ
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                            </Card.Footer>
                        </Card>
                    </Container>
                </div>
            </div>
        </div>
    );
}
export default SearchOwner;
