import React, { useContext, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import styles from "./style.module.css"
import { useNavigate } from 'react-router-dom';
import { axiosReq } from '../../../helpers'
import { PopupContext } from '../../../App';

import { CiLock } from "react-icons/ci";


const initialFormData = {
    email: '',
    password: '',
};

const LoginPage = () => {
    const [formData, setFormData] = useState(initialFormData);
    const { setPopUpContent } = useContext(PopupContext)
    const navTo = useNavigate()

    const formFields = [
        { label: '@ Email Address', name: 'email', type: 'email', required: true },
        { label: '🔒 Password', name: 'password', type: 'password', required: true },
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
            setPopUpContent(<div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}><h2 >{user?.fullName ? "התחברת בהצלחה" : "החיבור נכשל "}</h2></div>)
            // setUser(user)
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
                <h2>Welcome to Mailbox</h2>
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
                     <span className={styles.text}><a href="/forgot">Forgot password ?</a></span>
                    <p className={styles.button}>
                        <button  type='submit'>Sign in</button>
                    </p>
                </form>
                {/* <p>Already have an account? <a href="/login">Login Here</a></p> */}
                <p className={styles.text}>Don't have an account? <a href="/register">Register Here</a></p>
            </div>
            <div className={styles.background}><img className={styles.backgroundImg} src='./src/assets/send-mail.svg' alt="" /></div>
        </div>
    );
};

export default LoginPage;
