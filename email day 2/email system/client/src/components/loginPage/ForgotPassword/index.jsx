import React, { useContext, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import styles from "./style.module.css"
import { useNavigate } from 'react-router-dom';
import { axiosReq } from '../../../helpers'
import { PopupContext } from '../../../App';

import { CiLock } from "react-icons/ci";
import { UserContext } from '../../../layouts/MainLayout';


const initialFormData = {
    email: '',
    password: '',
};

const ForgotPassword = () => {
    const [formData, setFormData] = useState(initialFormData);
    const { setPopUpContent } = useContext(PopupContext)
    const { setUser } = useContext(UserContext)
    const navTo = useNavigate()
    const formFields = [
        { label: '@ Email Address', name: 'email', type: 'email', required: true },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const user = await axiosReq({
                method: 'POST',
                url: 'auth/login',
                body: formData
            })
            // console.log(user);
            setPopUpContent(<div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}><h2 >{user?.fullName ? "התחברת בהצלחה" : "החיבור נכשל "}</h2></div>)
            setUser(user)
            localStorage.token = user.token
            navTo("/chats/inbox")

        } catch (e) {
            console.error("Failed to login: " + e.message);
        }
    }





    return (
        <div className={styles.main}>
            <div className={styles.form}>
                <div className={styles.top}><h3>Mailbox - communicate full-world</h3></div>
                <h2>Forgot Password</h2>
                <p className={styles.instructions}>
                    Enter your email address and we'll send you a link to reset your password.
                </p>
                <form onSubmit={handleSubmit} className={styles.inputs}>
                    {formFields.map(field => (
                        <input
                            key={field.name}
                            className={styles.inputField}
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            required={field.required}
                            minLength={field.minLength}
                            placeholder={field.label}
                        />
                    ))}
    
                    <p className={styles.button}>

                        <button className={styles.text} type='submit'>Send reset link</button>
                    </p>
                </form>
                {/* <p>Already have an account? <a href="/login">Login Here</a></p> */}
                <p className={styles.text}>Don't have an account? <a href="/login">Back to Login</a></p>
            </div>
            <div className={styles.background}><img className={styles.backgroundImg} src='./src/assets/send-mail.svg' alt="" /></div>
        </div>
    );
};

export default ForgotPassword;
