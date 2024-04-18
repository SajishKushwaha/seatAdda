import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import LoginModal from '../Components/LoginModal';

const ProtectedRoute = ({children}) => {
    
    const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
    const [isModalOpen, setIsModalOpen] = useState(!isLoggedIn); // Open modal initially if not logged in

    const handleCloseModal = () => {
        setIsModalOpen(false);

    };

    let location = useLocation();
    if (!isLoggedIn) {
        return (
            <>
                <LoginModal
                    setIsModalOpen={setIsModalOpen}
                    onClose={handleCloseModal}
                />
            </>
        )
    }
    return children;
}

export default ProtectedRoute