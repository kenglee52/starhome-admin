import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../component/Sidebar';
import Header from '../component/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Row, Col, Card, Container, Button, FormGroup, FormControl } from 'react-bootstrap';
import Swal from 'sweetalert2';
const Product = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const closeSidebar = () => setShowSidebar(false);

  const [Products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [Districts, setDistricts] = useState([]);
  const [Provinces, setProvicnces] = useState([]);
  const [ProductTypes, setProductTypes] = useState([]);
  const LoadData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products`, {
        method: 'GET'
      });
      if (response.status === 200) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const LoadOwnerId = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/owners/ownerID`, {
        method: 'GET',
      });
      if (response.status === 200) {
        const responseData = await response.json();
        document.getElementById('ownerID').value = responseData;
      }
    } catch (error) {
      alert(error)
    }
  }

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
  const LoadProductType = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/producttypes`, {
        method: 'GET'
      });
      if (response.status === 200) {
        const data = await response.json();
        setProductTypes(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const saveOwner = async (ownerName, ownerGender, ownerTel) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/owners`, {
        method: 'POST',
        body: JSON.stringify({
          ownerName, ownerGender, ownerTel
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.status === 400) {
        Swal.fire({
          title: 'ແຈ້ງເຕືອນ',
          icon: 'warning',
          text: 'ເບີໂທນີ້ມີໃນລະບົບແລ້ວ',
        });
        return;
      }
      if (response.status === 200) {
        console.log('Save owner success');
      }
    } catch (error) {
      alert(error);
    }
  }

  const ProductAutoId = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/autoid`, {
        method: 'GET'
      });
      if (response.status === 200) {
        const responseData = await response.json();
        document.getElementById('AutoId').value = responseData.newId;
      }
    } catch (error) {
      alert(error);
    }
  }

  const AddImageToProduct = async (productID) => {
    Swal.fire({
      title: 'ເລືອກຮູບພາບ',
      html: `<input class="form-control" id="addImage" type="file" accept="image/*"/>`,
      showCancelButton: true,
      confirmButtonText: 'ອັບໂຫຼດ',
      didOpen: () => {
        document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
      }

    }).then(async (result) => {
      if (result.isConfirmed) {
        const fileInput = document.getElementById("addImage");
        if (!fileInput.files.length) {
          Swal.fire({
            icon: "warning",
            text: "ກະລຸນາເລືອກຮູບ",
            didOpen: () => {
              document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
            }
          });
          return;
        }
        const formData = new FormData();
        formData.append("image", fileInput.files[0]);
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${productID}/add-image`, {
            method: "POST",
            body: formData
          });
          if (response.ok) {
            Swal.fire({
              icon: 'success',
              title: "ເພີ່ມສຳເລັດ",
              text: 'ເພີ່ມຮູບພາບສຳເລັດແລ້ວ',
              confirmButtonText: 'ຕົກລົງ',
              didOpen: () => {
                document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
              }
            }).then(() => {
              LoadData();
            });
          } else {
            Swal.fire({
              icon: "error", text: "ບໍ່ສາມາດອັບໂຫຼດຮູບໄດ້", didOpen: () => {
                document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
              }
            });
          }
        } catch (error) {
          console.error('AddImageToProduct error:', error);
          Swal.fire({ icon: "error", title: 'ຜິດພາດ', text: (error && error.message) ? error.message : 'ເກີດຂໍ້ຜິດພາດ' });
        }
      }
    });
  };
  const AddVideoToProduct = async (productID) => {
    Swal.fire({
      title: 'ເລືອກວີດີໂອ',
      html: `<input class="form-control" id="addVideo" type="file" accept="video/*"/>`,
      showCancelButton: true,
      confirmButtonText: 'ອັບໂຫຼດ',
      didOpen: () => {
        document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
      }

    }).then(async (result) => {
      if (result.isConfirmed) {
        const fileInput = document.getElementById("addVideo");
        if (!fileInput.files.length) {
          Swal.fire({
            icon: "warning",
            text: "ກະລຸນາເລືອກວີດີໂອ",
            didOpen: () => {
              document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
            }
          });
          return;
        }
        const formData = new FormData();
        formData.append("video", fileInput.files[0]);
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${productID}/add-video`, {
            method: "POST",
            body: formData
          });
          if (response.ok) {
            Swal.fire({
              icon: 'success',
              title: "ເພີ່ມສຳເລັດ",
              text: 'ເພີ່ມວີດີໂອສຳເລັດແລ້ວ',
              confirmButtonText: 'ຕົກລົງ',
              didOpen: () => {
                document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
              }
            }).then(() => {
              LoadData();
            });
          } else {
            Swal.fire({
              icon: "error", text: "ບໍ່ສາມາດອັບໂຫຼດວີດີໂອໄດ້", didOpen: () => {
                document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
              }
            });
          }
        } catch (error) {
          console.error('AddVideoToProduct error:', error);
          Swal.fire({ icon: "error", title: 'ຜິດພາດ', text: (error && error.message) ? error.message : 'ເກີດຂໍ້ຜິດພາດ' });
        }
      }
    });
  };

  const saveProduct = async (productID, productName, ownerID, productTypeID, village, districtID, status, size, price, images, videos, tel, description, currency) => {
    try {
      if (!productID || !productName || !ownerID || !productTypeID || !districtID || !status || !price || !currency) {
        throw new Error('ກະລຸນາປ້ອນຂໍ້ມູນທີ່ຈຳເປັນໃຫ້ຄົບຖ້ວນ');
      }
      const formData = new FormData();
      formData.append('productID', productID);
      formData.append('productName', productName);
      formData.append('ownerID', ownerID);
      formData.append('productTypeID', productTypeID);
      formData.append('village', village || '');
      formData.append('districtID', districtID);
      formData.append('status', status);
      formData.append('size', size || '');
      formData.append('price', price);
      formData.append('tel', tel || '');
      formData.append('description', description || '');
  // backend expects currencyID
  formData.append('currencyID', currency || '');
      // Handle multiple images
      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          formData.append('image', images[i]);
        }
      }

      // Handle multiple videos
      if (videos && videos.length > 0) {
        for (let i = 0; i < videos.length; i++) {
          formData.append('video', videos[i]);
        }
      }

      // ກວດສອບຂໍ້ມູນທີ່ຈະສົ່ງໄປຫາ server
      console.log('Sending product data:', {
        productID,
        productName,
        ownerID,
        productTypeID,
        village,
        districtID,
        status,
        size,
        price,
        tel,
        description,
        currency,
        imageCount: images ? images.length : 0,
        videoCount: videos ? videos.length : 0
      });

      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/upload`, {
        method: 'POST',
        body: formData,
      });

      // Check response from server and handle JSON or text errors gracefully
      if (!response.ok) {
        let errorMessage = response.statusText || 'Unknown error';
        try {
          // Try parse JSON error body first
          const errorData = await response.json();
          if (errorData) {
            // favor common message fields
            errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
          }
        } catch (parseErr) {
          // Not JSON - try plain text
          try {
            const text = await response.text();
            if (text) errorMessage = text;
          } catch (textErr) {
            // ignore
          }
        }
        throw new Error(`ການບັນທຶກຂໍ້ມູນລົ້ມເຫລວ: ${errorMessage}`);
      }

      const responseData = await response.json();
      console.log('Server response:', responseData);
    } catch (error) {
      console.error('Error in saveProduct:', error);
      // rethrow so caller (UI) can show friendly message
      throw error;
    }
  }
  useEffect(() => {
    LoadData();
    LoadDistrict();
    LoadProvince();
    LoadProductType();
    LoadOwnerId();
    ProductAutoId();
  }, []);

  useEffect(() => {
    setFilteredProducts(Products);
  }, [Products]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();

    const filtered = Products.filter((product) => {
      if (product.productID.toString().toLowerCase() === searchTerm) {
        return true;
      }

      // Check partial matches for other fields
      return (
        product.productID.toString().toLowerCase().includes(searchTerm) ||
        product.village?.toLowerCase().includes(searchTerm) ||
        product.District?.districtName?.toLowerCase().includes(searchTerm) ||
        product.District?.Province?.provinceName?.toLowerCase().includes(searchTerm) ||
        product.productName?.toLowerCase().includes(searchTerm) ||
        product.status?.toLowerCase().includes(searchTerm) ||
        product.price?.toString().includes(searchTerm)
      );
    });

    setFilteredProducts(filtered);
  };
  const PopUpSave = () => {
    Swal.fire({
      title: 'ຟອມເພີ່ມຂໍ້ມູນ',
      width: '100%',
      confirmButtonText: 'ປິດຟອມ',
      html: `
        <div class="card-body">
          <form id="productForm" enctype="multipart/form-data">
            <h5 class="text-danger">ຂໍ້ມູນເຈົ້າຂອງ (Owner)</h5>
            <div className="row mb-4">
              <div className="col-md-12 mb-4">
              <label class="form-label">ລະຫັດ</label>
                <input type="text" name="PRODUCTID" class="form-control" required>
              </div>
            </div>
            <div class="row g-3 mb-4">
              <div class="col-md-4">
                <label class="form-label">ຊື່ເຈົ້າຂອງ</label>
                <input type="text" name="ownerName" class="form-control" required>
              </div>
              <div class="col-md-4">
                <label class="form-label">ເພດ</label>
                <select name="ownerGender" class="form-control" required>
                  <option value="">-- ເລືອກ --</option>
                  <option value="ຊາຍ">ຊາຍ</option>
                  <option value="ຍິງ">ຍິງ</option>
                </select>
              </div>
              <div class="col-md-4">
                <label class="form-label">ເບີໂທ</label>
                <input 
  type="text" 
  name="ownerTel" 
  class="form-control" 
  required 
  maxlength="11"
  pattern="[0-9]{1,11}" 
  oninput="this.value = this.value.replace(/[^0-9]/g, '')"
/>
<span id="checkTel" class="text-danger"></span>

              </div>
            </div>

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
                <label class="form-label">ລາຄາ</label>
                <input type="number" name="price" class="form-control" required>
              </div>
            </div>

            <div class="row g-3 mb-3">
              <div class="col-md-4">
                <label class="form-label">ສະກຸນເງິນ</label>
                <select name="currency" class="form-control" required>
                  <option value="">-- ເລືອກ --</option>
                  <option value="0">ກີບ</option>
                  <option value="1">ໂດລາ</option>
                  <option value="2">ບາດ</option>
                </select>
              </div>
              <div class="col-md-4">
                <label class="form-label">ຮູບພາບ</label>
                <input type="file" name="image" class="form-control" accept="image/*" multiple>
              </div>
              <div class="col-md-4">
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

        // ເລືອກ province
        provinceSelect.innerHTML = '<option value="">-- ເລືອກແຂວງ --</option>';
        Provinces.forEach(p => {
          const option = document.createElement('option');
          option.value = p.provinceID;
          option.textContent = p.provinceName;
          provinceSelect.appendChild(option);
        });

        // ເລືອກ district ທັ້ງໝົດ
        districtSelect.innerHTML = '<option value="">-- ເລືອກເມືອງ --</option>';
        Districts.forEach(d => {
          const option = document.createElement('option');
          option.value = d.districtID;
          option.textContent = d.districtName;
          districtSelect.appendChild(option);
        });

        ProductTypes.forEach(p => {
          const option = document.createElement('option');
          option.value = p.productTypeID;
          option.textContent = p.productTypeName;
          productTypeSelect.appendChild(option);
        })


        // ເພີ່ມ event listener ສໍາລັບ auto filter district ຕາມ province
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

        // ເພີ່ມ event listener ສໍາລັບ auto select province ຕາມ district
        districtSelect.addEventListener('change', () => {
          const districtID = districtSelect.value;
          const district = Districts.find(d => d.districtID == districtID);
          if (district) provinceSelect.value = district.provinceID;
        });

        // Add form submission handler
        const form = document.getElementById('productForm');
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          const formData = new FormData(form);

          // ດຶງຂໍ້ມູນຈາກ Form
          const ownerData = {
            ownerName: formData.get('ownerName'),
            ownerGender: formData.get('ownerGender'),
            ownerTel: formData.get('ownerTel')
          };

          const ownerID = document.getElementById('ownerID').value;

          // ກວດສອບຂໍ້ມູນກ່ອນບັນທຶກ
          console.log('Product Data to save:', {
            productID: formData.get('PRODUCTID'),
            productName: formData.get('productName'),
            ownerID: ownerID,
            productTypeID: formData.get('productTypeID'),
            village: formData.get('village'),
            districtID: formData.get('districtID'),
            status: formData.get('status'),
            size: formData.get('size'),
            price: formData.get('price'),
            image: formData.get('image'),
            video: formData.get('video'),
            tel: ownerData.ownerTel,
            description: formData.get('description'),
            currency: formData.get('currency')
          });

          // Show loading Swal
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
            // Validate owner data
            if (!ownerData.ownerName || !ownerData.ownerGender || !ownerData.ownerTel) {
              throw new Error('ກະລຸນາປ້ອນຂໍ້ມູນເຈົ້າຂອງໃຫ້ຄົບຖ້ວນ');
            }
            await saveOwner(ownerData.ownerName, ownerData.ownerGender, ownerData.ownerTel);


            const imageFiles = form.querySelector('input[name="image"]').files;
            const videoFiles = form.querySelector('input[name="video"]').files;

            // // ກວດສອບວ່າມີການເລືອກຮູບພາບ ແລະ ວິດີໂອຫຼືບໍ່
            // if (!imageFiles || imageFiles.length === 0) {
            //   throw new Error('ກະລຸນາເລືອກຮູບພາບຢ່າງໜ້ອຍ 1 ຮູບ');
            // }
            // if (!videoFiles || videoFiles.length === 0) {
            //   throw new Error('ກະລຸນາເລືອກວິດີໂອຢ່າງໜ້ອຍ 1 ໄຟລ໌');
            // }
            await LoadOwnerId();
            const currentOwnerID = document.getElementById('ownerID').value;
            // Save product with current owner ID
            await saveProduct(
              formData.get('PRODUCTID'),
              formData.get('productName'),
              currentOwnerID,
              formData.get('productTypeID'),
              formData.get('village'),
              formData.get('districtID'),
              formData.get('status'),
              formData.get('size'),
              formData.get('price'),
              imageFiles,
              videoFiles,
              ownerData.ownerTel,
              formData.get('description'),
              formData.get('currency')
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
            await LoadData();
            Swal.close();
          } catch (error) {
            console.error('PopUpSave error:', error);
            Swal.fire({
              icon: 'error',
              title: 'ຜິດພາດ',
              text: (error && error.message) ? error.message : String(error),
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
  const deleteProduct = async (id) => {
    try {

      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
        method: 'DELETE'
      });
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'ລົບສຳເລັດ',
          text: `ລຶບຂໍ້ມູນລະຫັດ ${id} ສຳເລັດແລ້ວ`,
          confirmButtonText: 'ຕົກລົງ',
          didOpen: () => {
            document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
          }
        });
        await LoadData(); // refresh product list
      } else {
        Swal.fire({
          icon: 'error',
          title: 'ຜິດພາດ',
          text: 'ບໍ່ສາມາດລຶບໄດ້',
          confirmButtonText: 'ຕົກລົງ',
          didOpen: () => {
            document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
          }
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'ຜິດພາດ',
        text: 'ມີບັນຫາເວລາລົບ',
        confirmButtonText: 'ຕົກລົງ',
        didOpen: () => {
          document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
        }
      });
    }
  };
  const PopUpEdit = (product) => {
    Swal.fire({
      title: 'ຟອມແກ້ໄຂຂໍ້ມູນ',
      width: '100%',
      confirmButtonText: 'ປິດຟອມ',
      didOpen: () => {
        document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
      },
      html: `
      <div class="card-body">
        <form id="editProductForm" enctype="multipart/form-data">
          <h5 class="text-danger">ຂໍ້ມູນຊັບສິນ (Product)</h5>
          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <label class="form-label">ຊື່ຊັບສິນ</label>
              <input type="text" name="productName" class="form-control" value="${product.productName}" required>
            </div>
            <div class="col-md-6">
              <label class="form-label">ປະເພດຊັບສິນ</label>
              <select name="productTypeID" id="editProductTypeSelect" class="form-control" required>
                <option value="">-- ເລືອກປະເພດ --</option>
              </select>
            </div>
          </div>

          <div class="row g-3 mb-3">
            <div class="col-md-4">
              <label class="form-label">ແຂວງ</label>
              <select id="editProvinceSelect" class="form-control" required></select>
            </div>
            <div class="col-md-4">
              <label class="form-label">ເມືອງ</label>
              <select id="editDistrictSelect" name="districtID" class="form-control" required></select>
            </div>
            <div class="col-md-4">
              <label class="form-label">ບ້ານ</label>
              <input type="text" name="village" class="form-control" value="${product.village || ''}">
            </div>
          </div>

          <div class="row g-3 mb-3">
            <div class="col-md-3">
              <label class="form-label">ສະຖານະ</label>
              <select name="status" class="form-control" required>
                <option value="">-- ເລືອກ --</option>
                <option value="ເຊົ່າ" ${product.status === 'ເຊົ່າ' ? 'selected' : ''}>ເຊົ່າ</option>
                <option value="ຂາຍ" ${product.status === 'ຂາຍ' ? 'selected' : ''}>ຂາຍ</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">ຂະໜາດ (m²)</label>
              <input type="text" name="size" class="form-control" value="${product.size || ''}">
            </div>
            <div class="col-md-3">
              <label class="form-label">ລາຄາ (ກີບ)</label>
              <input type="number" name="price" class="form-control" value="${product.price}" required>
            </div>
             <div class="col-md-3">
              <label class="form-label">ສະກຸນເງິນ</label>
                <select name="currency" id="editCurrencySelect" class="form-control" required>
                  <option value="">-- ເລືອກ --</option>
                  <option value="0">ກີບ</option>
                  <option value="1">ໂດລາ</option>
                  <option value="2">ບາດ</option>
                </select>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">ລາຍລະອຽດ</label>
            <textarea name="description" class="form-control" rows="3">${product.description || ''}</textarea>
          </div>

          <div class="text-end">
            <button type="submit" class="btn btn-warning">
              <i class="fa fa-save me-1"></i> ບັນທຶກການແກ້ໄຂ
            </button>
          </div>
        </form>
      </div>
    `,
      didOpen: () => {
        document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";

        const provinceSelect = document.getElementById('editProvinceSelect');
        const districtSelect = document.getElementById('editDistrictSelect');
        const productTypeSelect = document.getElementById('editProductTypeSelect');

        // Fill province dropdown
        provinceSelect.innerHTML = '<option value="">-- ເລືອກແຂວງ --</option>';
        Provinces.forEach(p => {
          const option = document.createElement('option');
          option.value = p.provinceID;
          option.textContent = p.provinceName;
          if (product.District && p.provinceID === product.District.provinceID) {
            option.selected = true;
          }
          provinceSelect.appendChild(option);
        });

        // Fill district dropdown
        const updateDistrictOptions = (selectedProvinceID) => {
          districtSelect.innerHTML = '<option value="">-- ເລືອກເມືອງ --</option>';
          const filteredDistricts = selectedProvinceID ?
            Districts.filter(d => d.provinceID == selectedProvinceID) :
            Districts;

          filteredDistricts.forEach(d => {
            const option = document.createElement('option');
            option.value = d.districtID;
            option.textContent = d.districtName;
            if (d.districtID === product.districtID) {
              option.selected = true;
            }
            districtSelect.appendChild(option);
          });
        };

        // Initial district load
        updateDistrictOptions(product.District?.provinceID);

        // Fill product type dropdown
        ProductTypes.forEach(p => {
          const option = document.createElement('option');
          option.value = p.productTypeID;
          option.textContent = p.productTypeName;
          if (p.productTypeID === product.productTypeID) {
            option.selected = true;
          }
          productTypeSelect.appendChild(option);
        });

        // Province change handler
        provinceSelect.addEventListener('change', () => {
          updateDistrictOptions(provinceSelect.value);
        });

        // District change handler
        districtSelect.addEventListener('change', () => {
          const districtID = districtSelect.value;
          const district = Districts.find(d => d.districtID == districtID);
          if (district) provinceSelect.value = district.provinceID;
        });

        // Form submission handler
        const form = document.getElementById('editProductForm');
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          const formData = new FormData(form);

          Swal.fire({
            title: 'ກຳລັງບັນທຶກ',
            text: 'ກະລຸນາລໍຖ້າ...',
            allowOutsideClick: false,
            didOpen: () => {
              // ປ່ຽນ font
              document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
              // ໂຊວ໌ loading
              Swal.showLoading();
            }
          });
          try {
            const updateData = new FormData();
            updateData.append('productName', formData.get('productName'));
            updateData.append('productTypeID', formData.get('productTypeID'));
            updateData.append('village', formData.get('village'));
            updateData.append('districtID', formData.get('districtID'));
            updateData.append('status', formData.get('status'));
            updateData.append('size', formData.get('size'));
            updateData.append('price', formData.get('price'));
            updateData.append('description', formData.get('description'));
            updateData.append('currencyID', formData.get('currency'));
            const response = await fetch(`${process.env.REACT_APP_API_URL}/products/upload/${product.productID}`, {
              method: 'PUT',
              body: updateData
            });
            if (response.status === 400) {
              const errorData = await response.json();
              alert(errorData.error);
              return;
            }

            await Swal.fire({
              didOpen: () => {
                document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
              },
              icon: 'success',
              title: 'ອັບເດດສຳເລັດ',
              text: 'ການແກ້ໄຂຂໍ້ມູນສຳເລັດແລ້ວ',
              confirmButtonText: 'ຕົກລົງ'
            });

            await LoadData();
            Swal.close();
          } catch (error) {
            Swal.fire({
              didOpen: () => {
                document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
              },
              icon: 'error',
              title: 'ຜິດພາດ',
              text: error.message,
              confirmButtonText: 'ຕົກລົງ'
            });
          }
        });
        try {
          const currencySelect = document.getElementById('editCurrencySelect');
          let currencyValue = null;
          if (product.hasOwnProperty('currency') && product.currency !== undefined && product.currency !== null && product.currency !== '') {
            currencyValue = String(product.currency);
          } else if (product.hasOwnProperty('currencyID') && product.currencyID !== undefined && product.currencyID !== null) {
            currencyValue = String(product.currencyID);
          } else if (product.Currency && (product.Currency.currencyID !== undefined && product.Currency.currencyID !== null)) {
            currencyValue = String(product.Currency.currencyID);
          }
          // If we found a value and the option exists, set it
          if (currencyValue !== null) {
            // Some backends may store currency as 0/1/2 or as full id; try to match by value first
            const option = Array.from(currencySelect.options).find(o => o.value === currencyValue);
            if (option) {
              currencySelect.value = currencyValue;
            } else {
              // fallback: if currencyValue is numeric but options are 0/1/2, try to coerce
              const coerced = String(Number(currencyValue));
              const coercedOption = Array.from(currencySelect.options).find(o => o.value === coerced);
              if (coercedOption) currencySelect.value = coerced;
            }
          }
        } catch (err) {
          // Non-fatal - keep silent but log for debugging
          console.error('Unable to preselect currency in edit modal', err);
        }

      }
    });
  };

  const PopUpDelete = (id) => {
    Swal.fire({
      title: 'ຢືນຢັນການລົບ',
      icon: 'question',
      html: `ຕ້ອງການລົບລະຫັດນີ້ແທ້ ຫຼື ບໍ?<br>ລະຫັດ: <b>${id}</b>`,
      showCancelButton: true,
      cancelButtonText: 'ຍົກເລີກ',
      confirmButtonText: 'ຕົກລົງ',
      cancelButtonColor: 'red',
      confirmButtonColor: 'blue',
      didOpen: () => {
        document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
      }
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
      }
    });
  };
  const removeVideo = async (productID, index) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/remove-video`, {
        method: 'DELETE',
        body: JSON.stringify({
          productID,
          mediaType: "video",
          index
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "ລົບສຳເລັດ",
          text: 'ລົບວີດີໂອສຳເລັດ',
          confirmButtonText: 'ຕົກລົງ',
          didOpen: () => {
            document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
          }
        }).then(() => {
          LoadData();
        });
      }
    } catch (error) {
      alert(error);
    }
  }
  const removeImage = async (productID, imageIndex) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/remove-image`, {
        method: 'DELETE',
        body: JSON.stringify({ productID, imageIndex }),
        headers: { "Content-Type": "application/json" }
      });
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "ລົບສຳເລັດ",
          text: 'ລົບຮູບພາບສຳເລັດ',
          confirmButtonText: 'ຕົກລົງ',
          didOpen: () => {
            document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
          }
        }).then(() => {
          LoadData();
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", title: "ຜິດພາດ", text: "ລຶບຮູບພາບບໍ່ສຳເລັດ" });
    }
  };

  const showDetail = (product) => {
    // Images HTML
    let imagesHtml = '';
    if (Array.isArray(product.image)) {
      imagesHtml = product.image.map((img, index) => `
      <div class="col-6 col-md-4 col-lg-3">
        <div class="media-item card">
          <div class="position-relative">
            <span style="position:absolute; top:5px; left:5px; background:rgba(0,0,0,0.6); color:#fff; padding:2px 6px; border-radius:4px;">#${index + 1}</span>
            <img src="http://10.50.210.198:3000/${img.replace(/\\/g, '/')}" class="card-img-top media-preview" alt="Product Image" />
          </div>
          <div class="card-body p-2 text-end">
            <button class="btn btn-danger btn-sm btn-delete-image" data-index="${index}">
              <i class="fas fa-trash-alt"></i> ລຶບ
            </button>
          </div>
        </div>
      </div>
    `).join('');
    }

    // Videos HTML
    let videosHtml = '';
    if (Array.isArray(product.video)) {
      videosHtml = product.video.map((vid, index) => `
      <div class="col-6 col-md-4 col-lg-3">
        <div class="media-item card">
          <div class="position-relative">
            <span style="position:absolute; top:5px; left:5px; background:rgba(0,0,0,0.6); color:#fff; padding:2px 6px; border-radius:4px;">#${index + 1}</span>
            <video controls class="card-img-top media-preview">
              <source src="http://10.50.210.198:3000/${vid.replace(/\\/g, '/')}" type="video/mp4">
            </video>
          </div>
          <div class="card-body p-2 text-end">
            <button class="btn btn-danger btn-sm btn-delete-video" data-index="${index}">
              <i class="fas fa-trash-alt"></i> ລຶບ
            </button>
          </div>
        </div>
      </div>
    `).join('');
    }

    const htmlContent = `
    <style>
      .swal2-container-custom { font-family: 'Noto Sans Lao Looped', sans-serif; }
      .swal2-popup-custom { border-radius:12px !important; box-shadow:0 10px 20px rgba(0,0,0,0.1) !important; }
      .media-item { border:1px solid #ddd; border-radius:8px; overflow:hidden; transition: transform 0.3s, box-shadow 0.3s; }
      .media-item:hover { transform:translateY(-5px); box-shadow:0 8px 16px rgba(0,0,0,0.2); }
      .media-preview { width:100%; height:150px; object-fit:cover; display:block; }
      .media-item .card-body { background-color:#f8f9fa; border-top:1px solid #eee; }
      .card-title { border-bottom:2px solid #007bff; padding-bottom:5px; font-weight:600; color:#333; }
    </style>

    <div class="container-fluid product-detail-modal-single">
      <div class="row">
        <div class="col-12 mb-4">
          <div class="card shadow-sm p-4">
            <h4 class="card-title text-center mb-3"><strong>ຂໍ້ມູນສິນຄ້າ</strong></h4>
            <div class="row">
              <div class="col-md-6">
                <p><strong>ລະຫັດ:</strong> ${product.productID}</p>
                <p><strong>ບ້ານ:</strong> ${product.village}</p>
                <p><strong>ເມືອງ:</strong> ${product.District.districtName}</p>
              </div>
              <div class="col-md-6">
                <p><strong>ແຂວງ:</strong> ${product.District.Province.provinceName}</p>
                <p><strong>ລາຄາ:</strong> ${Number(product.price).toLocaleString()} ${product.Currency.currencyName}</p>
                <p><strong>ສະຖານະ:</strong> ${product.status}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <p><strong>ຊື່ເຈົ້າຂອງຊັບສິນ:</strong> ${product.Owner.ownerName}</p>
              </div>
              <div class="col-md-6">
                <p><strong>ເບີໂທເຈົ້າຂອງຊັບສິນ:</strong> ${product.Owner.ownerTel}</p>
              </div>
            </div>
            <div class="row">
             <p><strong>ລາຍລະອຽດ:</strong> ${product.description}</p>
            </div>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="card shadow-sm p-4">
            <h5 class="card-title">ຮູບພາບ</h5>
            <div class="row g-3">
              ${imagesHtml}
              <div class="col-12">
                <button class="btn btn-primary btn-lg mt-2 btn-add-image"><i class="fas fa-plus"></i> ເພີ່ມຮູບໃໝ່</button>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12">
          <div class="card shadow-sm p-4">
            <h5 class="card-title">ວີດີໂອ</h5>
            <div class="row g-3">
              ${videosHtml}
              <div class="col-12">
                <button class="btn btn-primary btn-lg mt-2 btn-add-video"><i class="fas fa-plus"></i> ເພີ່ມວີດີໂອໃໝ່</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

    Swal.fire({
      title: `<strong>${product.productName}</strong>`,
      html: htmlContent,
      width: '90%',
      showCloseButton: true,
      showConfirmButton: false,
      customClass: { container: 'swal2-container-custom', popup: 'swal2-popup-custom' },
      didOpen: () => {
        document.querySelector('.swal2-popup').style.fontFamily = "'Noto Sans Lao', sans-serif";
        document.querySelectorAll('.btn-delete-image').forEach(btn => {
          btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            removeImage(product.productID, index);
          });
        });
        document.querySelectorAll('.btn-delete-video').forEach(btn => {
          btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.index);
            removeVideo(product.productID, index);
            console.log("Remove video index", index);
          });
        });
        document.querySelectorAll(".btn-add-image").forEach(btn => {
          btn.addEventListener('click', () => {
            AddImageToProduct(product.productID);
          })
        });
        document.querySelectorAll(".btn-add-video").forEach(btn => {
          btn.addEventListener('click', () => {
            AddVideoToProduct(product.productID);
          })
        })
      }
    });
  };
  return (
    <div>
      <div className="d-flex" style={{ fontFamily: 'Noto Sans Lao' }}>
        <Sidebar show={showSidebar} handleClose={closeSidebar} />
        <div className="flex-grow-1 w-100">
          <Header toggleSidebar={toggleSidebar} />
          <div className="p-3">
            <Row className='mb-3'>
              <Card className='shadow-lg'>
                <Card.Body>
                  <h3 className='text-center fw-bold text-danger'>ຟອມຈັດການຂໍ້ມູນຊັບສິນ</h3>
                  <FormGroup>
                    <Container>
                      <label htmlFor="">ຄົ້ນຫາຊັບສິນ</label>
                      <div className="input-group mb-3">
                        <span className="input-group-text"><i className="fas fa-search"></i></span>
                        <FormControl
                          id='searchInput'
                          placeholder='ຄົ້ນຫາ'
                          onChange={handleSearch}
                        />
                      </div>
                      <FormControl id='ownerID' type='hidden'></FormControl>
                      <FormControl id='AutoId' type='hidden'></FormControl>
                      <Button className='btn btn-danger' onClick={PopUpSave}>
                        ເພີ່ມລາຍການຊັບສິນໃໝ່
                      </Button>&nbsp;
                      <Button className='btn btn-primary' onClick={() => navigate("/owner")}>
                        ຂໍ້ມູນເຈົ້າຂອງຊັບສິນ
                      </Button>
                    </Container>
                  </FormGroup>
                </Card.Body>
              </Card>
            </Row>
            <Row
              className="g-3 mt-2"
              style={{
                maxHeight: "67vh",
                overflowY: "auto",
                paddingRight: "5px",
              }}
            >
              {filteredProducts.map((product) => (
                <Col
                  key={product.productID}
                  xs={6}
                  sm={4}
                  md={3}
                >
                  <Card
                    className="h-100 shadow-lg border-0 text-center"
                    style={{ cursor: 'pointer', fontSize: "clamp(12px, 2vw, 16px)" }}
                  >
                    {/* 🔥 Responsive image */}
                    <Container className='mt-2'>
                      <Card.Img
                        variant="top"
                        src={
                          Array.isArray(product.image)
                            ? `http://10.50.210.198:3000/${product.image[0]?.replace(/\\/g, '/') || ''}`
                            : product.image
                              ? `http://10.50.210.198:3000/${product.image.replace(/\\/g, '/')}`
                              : ''
                        }
                        className="img-fluid w-100"
                        style={{ objectFit: 'cover', aspectRatio: "4/3", borderRadius: "8px" }}
                      />
                    </Container>

                    <Card.Header>
                      <h5 className="fw-bold text-primary" style={{ fontSize: "clamp(14px, 2vw, 18px)" }}>
                        ລະຫັດ: <span className="text-danger">{product.productID}</span>
                      </h5>
                      <Card.Title
                        className="fw-bold"
                        style={{ fontSize: "clamp(13px, 2vw, 17px)" }}
                      >
                        {product.productName}
                      </Card.Title>
                    </Card.Header>

                    <Card.Body>
                      <p style={{ fontSize: "clamp(12px, 1.8vw, 15px)" }}>
                        <span className='fw-bold'>ບ້ານ:</span> {product.village}<br />
                        <span className='fw-bold'>ເມືອງ:</span> {product.District?.districtName}<br />
                        <span className='fw-bold'>ແຂວງ:</span> {product.District?.Province?.provinceName}
                      </p>
                    </Card.Body>

                    <Card.Footer className="bg-white border-0 d-flex justify-content-between align-items-center">
                      <span className="fw-bold text-danger" style={{ fontSize: "clamp(12px, 2vw, 16px)" }}>
                        ລາຄາ: {Number(product.price).toLocaleString()} {product.Currency.currencyName}
                      </span>
                      <span className="fw-bold text-success" style={{ fontSize: "clamp(12px, 2vw, 16px)" }}>
                        {product.status}
                      </span>
                    </Card.Footer>
                    {/* 🔥 Responsive buttons */}
                    <Container className="mb-2">
                      <div className="d-flex flex-wrap gap-2">
                        <Button
                          variant="primary"
                          className="flex-grow-1 flex-sm-grow-0"
                          size="sm"
                          onClick={() => showDetail(product)}
                        >
                          <i className="fas fa-info-circle me-1"></i> ລາຍລະອຽດ
                        </Button>
                        <Button
                          variant="warning"
                          size="sm"
                          className="flex-grow-1 flex-sm-grow-0"
                          onClick={() => PopUpEdit(product)}
                        >
                          <i className="fas fa-edit"></i>
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          className="flex-grow-1 flex-sm-grow-0"
                          onClick={() => PopUpDelete(product.productID)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </div>
                    </Container>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
