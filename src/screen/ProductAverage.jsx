import React from 'react';
import Header from '../component/Header';
import Sidebar from '../component/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState } from 'react';
const ProductAverage = () => {
      const [showSidebar, setShowSidebar] = useState(false);
      const toggleSidebar = () => setShowSidebar(!showSidebar);
      const closeSidebar = () => setShowSidebar(false);
    return (
        <div>
            <div>
            <div className="d-flex" style={{ fontFamily: 'Noto Sans Lao' }}>
                <Sidebar show={showSidebar} handleClose={closeSidebar} />
                <div className="flex-grow-1">
                    <Header toggleSidebar={toggleSidebar} />                    
                </div>
            </div>
        </div>
        </div>
    );
}

export default ProductAverage;
