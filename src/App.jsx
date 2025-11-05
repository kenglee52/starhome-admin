import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form, Button, Container } from "react-bootstrap";
import { useRef, useState , useEffect} from "react";
import { ReactTyped } from 'react-typed';
import Logo from './assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
const App = () => {
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // State for displaying messages (errors/success)
  const [messageColor, setMessageColor] = useState("text-danger"); // State for message color
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState(0);
  const [lockTime, setLockTime] = useState(null);

  // ດຶງຂໍ້ມູນ attempts ແລະ lockTime ຈາກ localStorage ເມື່ອ refresh
  useEffect(() => {
    const savedAttempts = localStorage.getItem("loginAttempts");
    const savedLockTime = localStorage.getItem("loginLockTime");

    if (savedAttempts) setAttempts(parseInt(savedAttempts));
    if (savedLockTime) setLockTime(parseInt(savedLockTime));
  }, []);

  // ບັນທຶກ attempts ແລະ lockTime ທຸກຄັ້ງທີ່ປ່ຽນ
  useEffect(() => {
    localStorage.setItem("loginAttempts", attempts);
    if (lockTime) {
      localStorage.setItem("loginLockTime", lockTime);
    } else {
      localStorage.removeItem("loginLockTime");
    }
  }, [attempts, lockTime]);

  const LoginUser = async () => {
    setMessage("");
    setMessageColor("text-danger");

    // ກວດວ່າຍັງຖືກລັອກຢູ່ບໍ?
    if (lockTime && Date.now() < lockTime) {
      const waitSec = Math.ceil((lockTime - Date.now()) / 1000);
      setMessage(`ກະລຸນາລໍຖ້າ ${waitSec} ວິນາທີກ່ອນລອງໃໝ່`);
      return;
    }

    if (!tel || !password) {
      setMessage("ກະລຸນາປ້ອນໃຫ້ຄົບ");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tel, password })
      });

      const responseData = await response.json();

      if (response.status === 200) {
        localStorage.setItem("token", responseData.token);
        setMessage(responseData.message || "ເຂົ້າສູ່ລະບົບສຳເລັດ!");
        setMessageColor("text-success");

        // reset attempts ຫຼັງຈາກ login ສຳເລັດ
        setAttempts(0);
        setLockTime(null);

        navigate("/dashboard");
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (newAttempts >= 5) {
          const waitSeconds = 20 * (newAttempts - 4); // 20, 40, 60 ...
          const newLockTime = Date.now() + waitSeconds * 1000;
          setLockTime(newLockTime);
          setMessage(`ຜິດຫຼາຍເກີນໄປ. ກະລຸນາລໍຖ້າ ${waitSeconds} ວິນາທີ`);
        } else {
          setMessage(responseData.message || "ເບີ ຫຼື ລະຫັດບໍ່ຖືກຕ້ອງ.");
        }
        setMessageColor("text-danger");
      }
    } catch (error) {
      setMessage("ບໍ່ສາມາດເຊື່ອມຕໍ່ເຊີເວີໄດ້.");
      console.error("Login error:", error);
    }
  };
  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Noto Sans Lao, sans-serif', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      {/* Top 50% section with gradient and SVG curve */}
      <div style={{
        height: '45vh',
        minHeight: 420,
        backgroundImage: `
    linear-gradient(120deg, rgba(91, 5, 26, 0.7) 0%, rgba(255,0,0,0.7) 100%), url('https://res.cloudinary.com/rainforest-cruises/images/c_fill,g_auto/f_auto,q_auto/v1620075511/Best-Tourist-Attractions-Laos-to-See-Pha-That-Luang/Best-Tourist-Attractions-Laos-to-See-Pha-That-Luang.jpg')
  `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingBottom: '50px',
      }}>
        {/* Placeholder for content in the top section if any */}
        <h1 style={{ color: '#fff', fontWeight: 'bold', zIndex: 3 }}>
          <ReactTyped
            strings={[
              'ຍິນດີຕ້ອນຮັບ',
              'ເຂົ້າສູ່ລະບົບຈັດການ',
              'Star Home'
            ]}
            typeSpeed={60}
            backSpeed={30}
            loop
          />
        </h1>
        {/* SVG curve divider */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 250" /* Adjusted viewBox height for a more pronounced curve */
          style={{
            position: 'absolute',
            bottom: -1, // Adjust to cover the gap
            left: 0,
            width: '100%',
            height: 'auto', // Keep aspect ratio
            zIndex: 1,
            display: 'block',
          }}
        >
          <path
            fill="#fff" // Color of the bottom section
            fillOpacity="1"
            /* Modified SVG path for a smoother, more aesthetic curve */
            d="M0,192C360,255,1080,128,1440,192L1440,250L0,250Z"
          ></path>
        </svg>
      </div>

      {/* Bottom 50% section, white background, center form */}
      <div style={{
        flexGrow: 1, // Allows this section to take remaining height
        background: '#fff',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column', // Changed to column for footer
        alignItems: 'center',
        justifyContent: 'flex-start', // Align items to the top initially
        zIndex: 2,
        paddingTop: '10px', // Add padding to push content down from the curve
      }}>
        <Card className="shadow-lg border border-4" style={{
          width: 400,
          maxWidth: '90%', // Ensure responsiveness on smaller screens
          borderRadius: 50,
          /* Softened box-shadow for a more aesthetic look */
          boxShadow: '50px 10px 40px rgba(104, 11, 11, 0.9)',
          border: 'none',
          padding: '32px 28px 24px 28px',
          background: '#fff',
          marginTop: -180, // Move card higher up (adjust based on SVG curve)
          zIndex: 4,
        }}>
          <Card.Body>
            <div className="row justify-content-center mb-4">
              <img
                src={Logo}
                alt="Logo"
                style={{
                  width: "100%",   // ໃຫ້ມັນ responsive 
                  height: "auto",  // ຮັກສາສັດສ່ວນ
                  maxWidth: "250px" // ກຳນົດຂະໜາດສູງສຸດ (ປັບຕາມທີ່ຕ້ອງການ)
                }}
                className="img-fluid"
              />
            </div>

            <Form>
              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label style={{ color: '#d11534ff', fontWeight: 600 }}>ເບີໂທລະສັບ*</Form.Label>
                <Form.Control
                  id="tel"
                  type="number"
                  placeholder="020XXXXXXXX"
                  style={{ borderRadius: 10, borderColor: '#d11534ff' }}
                  value={tel}
                  onChange={e => setTel(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formPassword">
                <Form.Label style={{ color: '#d11534ff', fontWeight: 600 }}>ລະຫັດຜ່ານ*</Form.Label>
                <Form.Control
                  id="pass"
                  type="password"
                  placeholder="********"
                  style={{ borderRadius: 10, borderColor: '#d11534ff' }}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Form.Group>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Form.Check type="checkbox" label={<span style={{ fontSize: '0.95rem', color: '#888' }}>ຈົດຈຳຂ້ອຍ</span>} id="rememberMe" />
                <a href="#" style={{ color: '#d11534ff', fontSize: '0.95rem', textDecoration: 'none' }}>ລືມລະຫັດຜ່ານ</a>
              </div>
              <Button
                className="mb-2"
                onClick={LoginUser}
                style={{
                  width: '100%',
                  borderRadius: 10,
                  background: 'linear-gradient(90deg, #d11534ff 0%, #9a0a11ff 100%)',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: 18,
                  marginTop: 15
                }}
              ><i className="fas fa-sign-in">&nbsp;&nbsp;</i>
                ເຂົ້າສູ່ລະບົບ
              </Button>
              <p className="text-center">
                <span id="showError" className={messageColor}>
                  {message}
                </span>
              </p>
            </Form>
          </Card.Body>
        </Card>
        {/* Stylish Footer */}
        <footer style={{
          minHeight: '2vh',
          marginTop: 'auto', // Pushes footer to the bottom
          width: '100%',
          textAlign: 'center',
          padding: '10px 0',
          background: '#f8f8f8', // Light grey background for the footer
          color: '#666',
          fontSize: '0.9rem',
          borderTop: '1px solid #eee', // Subtle border at the top
        }}>
          <p>&copy; 2025 Star Home. All rights reserved.</p>
          <p>ອອກແບບດ້ວຍຄວາມຮັກໃນປະເທດລາວ</p> {/* Designed with love in Laos */}
        </footer>
      </div>
    </div>
  );
}

export default App;
