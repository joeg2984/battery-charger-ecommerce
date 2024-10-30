import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { insertOrUpdateUserData } from '../userHelpers';

const Logout = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            setError(error.message);
        } else {
            navigate('/login');
        }
    };

    return (
        <div>
            <Helmet>
                <title>Logout</title>
            </Helmet>
            <h1>Logout</h1>
            {error && <p>{error}</p>}
            <button onClick={handleLogout}>Logout</button>
            <Link to="/profile">Cancel</Link>
        </div>
    );
};

export default Logout;
