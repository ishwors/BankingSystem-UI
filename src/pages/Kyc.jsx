import React from 'react';
import KycForm from '../components/kycform'; // Import the KycForm component

const KycPage = () => {
    return (
        <div>
            <h1>KYC Document Submission Page</h1>
            <KycForm /> {/* Render the KycForm component */}
        </div>
    );
};

export default KycPage;
