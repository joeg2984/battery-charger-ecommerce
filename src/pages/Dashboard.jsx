import { Form } from 'react-router-dom';

export const action = async (req, res) => {
    const formData = await Request.formData();
    const apiUrl = `${import.meta.env.VITE_API_URL}/products/add`;

    const data = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('sb-access-token')}`,
        }
        
