import React, { useContext, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import styles from "./style.module.css"
import { useNavigate } from 'react-router-dom';
import { axiosReq, 
    // saveImgToCloud
 } from '../../../helpers'
import { PopupContext } from '../../../App'



const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
    password: '',
    confirmPassword: ''
};

const RegisterPage = () => {
    const [formData, setFormData] = useState(initialFormData);
    const { setPopUpContent } = useContext(PopupContext)
    const navTo = useNavigate()
    const formFields = [
        { label: 'Email Address', name: 'email', type: 'email', required: true },
        { label: 'First Name', name: 'firstName', type: 'text', required: true, minLength: 2 },
        { label: 'Last Name', name: 'lastName', type: 'text', required: true, minLength: 2 },
        { label: 'Password', name: 'password', type: 'password', required: true },
        // { label: 'Confirm Password', name: 'confirmPassword', type: 'password', required: true },
        // { label: 'Select an image', name: 'avatar', type: 'file' },
    ];

    // const body = {
    //     fullName: formData.firstName + ' ' + formData.lastName,
    //     email: formData.email,
    //     password: formData.password,
    //     avatar: 'https://www.w3schools.com/howto/img_avatar.png'
    // }

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData(prevState => ({
    //         ...prevState,
    //         [name]: value
    //     }));
    //     console.log(formData);
    // };



    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("🚀 ~ handleChange ~ value:", value)
        
        if (name === 'avatar') {
            const file = e.target.files[0];
            console.log("🚀 ~ handleChange ~ file:", file)
            const reader = new FileReader();

            // reader.onload = (event) => {
            //     const base64Data = event.target.result; // Convert file to base64
            //     setFormData(prevState => ({
            //         ...prevState,
            //         avatar: base64Data, // Update formData with base64Data
            //     }));
            // };
    
            reader.readAsDataURL(file); 

            reader.onloadend = () => {
                console.log(reader.result);
                setFormData(prevState => ({
                            ...prevState,
                            avatar: reader.result, 
                        }));
            }
        } else {
          
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }

        console.log(formData);
    };


    // const handleGetURL = async (e) => {

    // }
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        const body = formData;
        // if(formData.avatar){
        //     let img
        //     img = await saveImgToCloud(formData.avatar);
        //     console.log("🚀 ~ handleSubmit ~ img :", img )
        //     body.avatar = img;
        // }
        // if(formData.avatar){
        //     let img
        //     img = await saveImgToCloud(formData.avatar);
        //     console.log("🚀 ~ handleSubmit ~ img :", img )
        //     body.avatar = img;
        // }
        // if(formData.avatar){
        //     let img
        //     img = await saveImgToCloud(formData.avatar);
        //     console.log("🚀 ~ handleSubmit ~ img :", img )
        //     body.avatar = img;
        // }





        console.log("🚀 ~ handleSubmit ~ body :", body )

        // if(formData.password!=formData.confirmPassword){
        //     setPopUpContent(<div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}><h2 >הסיסמאות אינן תואמות</h2></div>)
        //     return
        // }
        try {
            const { _id } = await axiosReq({
                method: 'POST',
                url: 'auth/register',
                body
            })
            // alert(_id);
            setPopUpContent(<div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}><h2 >{_id ? "נרשמת בהצלחה" : "הרישום נכשל "}</h2></div>)
            navTo("/login")

        } catch (e) {
            console.error("Failed to register: " + e.message);
        }
    }


    const handleClearImage = () => {
        const imageInput = document.getElementById('imageFile');
        imageInput.value = ''; // Clear selection
      };
      





    return (
        <div className={styles.main}>
            <div className={styles.form}>
                <div className={styles.top}><h3>Mailbox - communicate full-world</h3></div>
                <h2>Welcome to Mailbox</h2>
                <form onSubmit={handleSubmit} className={styles.inputs}>
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
                            <span style={{color: "red"}}> *</span>
                        </div>
                    ))}
                     <input type="file" id='imageFile' name="avatar" accept="image/*" placeholder="Select an image"  onChange={handleChange}/>
                    <p className={styles.button}>
                        <button type='submit'>Register</button>
                    </p>
                </form>
                <p className={styles.text}>Already have an account? <a href="/login">Login Here</a></p>
                <br />
                <p className={styles.text}>By registering, you agree to our <a href="/terms">Terms of Use</a>.</p>
            </div>
            <div className={styles.background}>
                <img className={styles.backgroundImg} src='./src/assets/send-mail.svg' alt="" />
                </div>
        </div>
    );
};

export default RegisterPage;
