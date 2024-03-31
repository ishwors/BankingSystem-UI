import  { useState } from 'react';
import axios from 'axios';

const KycForm = () => {
    const [formData, setFormData] = useState({
        UserId: '',
        FatherName: '',
        MotherName: '',
        GrandFatherName: '',
        PermanentAddress: '',
        UserImageFile: null,
        CitizenshipImageFile: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                if (formData[key] instanceof File) {
                    formDataToSend.append(key, formData[key]);
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            }
            const response = await axios.post('http://localhost:5224/api/kycdocument', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('KYC document added successfully:', response.data);
            // Reset form after successful submission
            setFormData({
                UserId: '',
                FatherName: '',
                MotherName: '',
                GrandFatherName: '',
                PermanentAddress: '',
                UserImageFile: null,
                CitizenshipImageFile: null
            });
        } catch (error) {
            console.error('Error adding KYC document:', error);
        }
    };

    return (
        <div>
            <h2>Add KYC Document</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>UserId:</label>
                    <input type="text" name="UserId" value={formData.UserId} onChange={handleChange} />
                </div>
                <div>
                    <label>Father Name:</label>
                    <input type="text" name="FatherName" value={formData.FatherName} onChange={handleChange} />
                </div>
                <div>
                    <label>Mother Name:</label>
                    <input type="text" name="MotherName" value={formData.MotherName} onChange={handleChange} />
                </div>
                <div>
                    <label>Grandfather Name:</label>
                    <input type="text" name="GrandFatherName" value={formData.GrandFatherName} onChange={handleChange} />
                </div>
                <div>
                    <label>Permanent Address:</label>
                    <input type="text" name="PermanentAddress" value={formData.PermanentAddress} onChange={handleChange} />
                </div>
                <div>
                    <label>User Image:</label>
                    <input type="file" name="UserImageFile" onChange={handleFileChange} />
                </div>
                <div>
                    <label>Citizenship Image:</label>
                    <input type="file" name="CitizenshipImageFile" onChange={handleFileChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default KycForm;
