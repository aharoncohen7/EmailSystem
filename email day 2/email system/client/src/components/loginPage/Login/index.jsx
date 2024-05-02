import React, { useContext, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import styles from "./style.module.css"
import { useNavigate } from 'react-router-dom';
import { axiosReq } from '../../../helpers'
import { PopupContext } from '../../../App';
import { UserContext } from '../../../App';

const initialFormData = {
    email: '',
    password: '',
};

const LoginPage = () => {
    const [formData, setFormData] = useState(initialFormData);
    const { setPopUpContent } = useContext(PopupContext)
    const { setUser } = useContext(UserContext)
    const navTo = useNavigate()
    const formFields = [
        { label: 'Email Address', name: 'email', type: 'email', required: true },
        { label: 'Password', name: 'password', type: 'password', required: true },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        // console.log(formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const user = await axiosReq({
                method: 'POST',
                url: 'auth/login',
                body: formData
            })
            // alert(_id);
            setPopUpContent(<div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}><h2 >{user?.fullName ? "התחברת בהצלחה" : "החיבור נכשל "}</h2></div>)
            setUser(user)
            localStorage.token = user.token
            navTo("/")
           
        } catch (e) {
            console.error("Failed to register: " + e.message);
        }
    }





    return (
        <form onSubmit={handleSubmit} >
            {formFields.map(field => (
                <div key={field.name} className={styles.inputField}>
                    {/* <label htmlFor={field.name}>
                        {field.label} {field.required && <FaStar className={styles.req} />}
                    </label> */}
                    <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required={field.required}
                        minLength={field.minLength}
                        placeholder={field.label}
                    />
                </div>
            ))}
            <button type='submit'>Login</button>
        </form>
    );
};

export default LoginPage;
