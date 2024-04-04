import React, { useContext, useEffect, useState } from 'react'
import EmailLi from '../EmailLi'
import InputSearch from '../InputSearch'
import styles from './style.module.css'
import { NavLink, useParams } from 'react-router-dom'




const emailList = [
    {
        email: {
            _id: "660a977c19b3b4f72409aef8",
            subject: "מה נשמע ?",
            msg: [
                "660a977c19b3b4f72409aef6"
            ],
            "lastDate": "2024-04-01T11:16:12.875Z",
            "__v": 0
        },
        isRead: false,
        isSent: false,
        isRecieved: true,
        isFavorite: false,
        isDeleted: false,
        _id: "660a977d19b3b4f72409af02"
    },
    {
        email: {
            _id: "660a97ed19b3b4f72409af09",
            subject: "בקשר למודעה?",
            msg: [
                "660a97ec19b3b4f72409af07"
            ],
            lastDate: "2024-04-01T11:18:05.101Z",
            __v: 0
        },
        isRead: false,
        isSent: false,
        isRecieved: true,
        isFavorite: false,
        isDeleted: false,
        _id: "660a97ed19b3b4f72409af14"
    },
    {
        email: {
            _id: "660a981f19b3b4f72409af1c",
            subject: "שלום וברכה",
            msg: [
                "660a981f19b3b4f72409af1a",
                "660aa222f379a9780fcdb60e",
                "660aaa207701501757f31885",
                "660aaa427701501757f31899",
                "660aaa687701501757f318ad",
                "660aaac1972b81c8a9649c93",
                "660aaaeb53a2542cfc016047",
                "660aab5730e174bc738c5d81",
                "660aabf7e98f0973e6ed1f34",
                "660aac46d212dff9c04dd6f2",
                "660aacead212dff9c04dd710"
            ],
            lastDate: "2024-04-01T11:18:55.572Z",
            __v: 10
        },
        isRead: false,
        isSent: true,
        isRecieved: true,
        isFavorite: false,
        isDeleted: false,
        _id: "660a9819786f19b3b4f72409af28"
    },
    {
        email: {
            _id: "660a981f19b3b4f72409af1c",
            subject: "שלום וברכה",
            msg: [
                "660a981f19b3b4f72409af1a",
                "660aa222f379a9780fcdb60e",
                "660aaa207701501757f31885",
                "660aaa427701501757f31899",
                "660aaa687701501757f318ad",
                "660aaac1972b81c8a9649c93",
                "660aaaeb53a2542cfc016047",
                "660aab5730e174bc738c5d81",
                "660aabf7e98f0973e6ed1f34",
                "660aac46d212dff9c04dd6f2",
                "660aacead212dff9c04dd710"
            ],
            lastDate: "2024-04-01T11:18:55.572Z",
            __v: 10
        },
        "isRead": false,
        "isSent": true,
        "isRecieved": false,
        "isFavorite": true,
        isDeleted: false,
        _id: "6a981f19b3b4f72409af28"
    },
    {
        email: {
            _id: "660a981f19b3b4f72409af1c",
            subject: "This is a comment",
            msg: [
                "660a981f19b3b4f72409af1a",
                "660aa222f379a9780fcdb60e",
                "660aaa207701501757f31885",
                "660aaa427701501757f31899",
                "660aaa687701501757f318ad",
                "660aaac1972b81c8a9649c93",
                "660aaaeb53a2542cfc016047",
                "660aab5730e174bc738c5d81",
                "660aabf7e98f0973e6ed1f34",
                "660aac46d212dff9c04dd6f2",
                "660aacead212dff9c04dd710"
            ],
            lastDate: "2024-04-01T11:18:55.572Z",
            __v: 10
        },
        "isRead": true,
        "isSent": true,
        "isRecieved": false,
        "isFavorite": false,
        "isDeleted": false,
        "_id": "660a1f19b3b4f72409af28"
    },
    {
        email: {
            _id: "660a981f19b3b4f724091c",
            subject: "שלום וברכה",
            msg: [
                "660a981f19b3b4f72409af1a",
                "660aa222f379a9780fcdb60e",
                "660aaa207701501757f31885",
                "660aaa427701501757f31899",
                "660aaa687701501757f318ad",
                "660aaac1972b81c8a9649c93",
                "660aaaeb53a2542cfc016047",
                "660aab5730e174bc738c5d81",
                "660aabf7e98f0973e6ed1f34",
                "660aac46d212dff9c04dd6f2",
                "660aacead212dff9c04dd710"
            ],
            lastDate: "2024-04-01T11:18:55.572Z",
            __v: 10
        },
        "isRead": false,
        "isSent": true,
        "isRecieved": true,
        "isFavorite": false,
        "isDeleted": false,
        "_id": "660a981fb3b4f72409af28"
    },
    {
        email: {
            _id: "660a981f19b3b4f72409af1c",
            "subject": "שלום ורכה",
            msg: [
                "660a981f19b3b4f72409af1a",
                "660aa222f379a9780fcdb60e",
                "660aaa207701501757f31885",
                "660aaa427701501757f31899",
                "660aaa687701501757f318ad",
                "660aaac1972b81c8a9649c93",
                "660aaaeb53a2542cfc016047",
                "660aab5730e174bc738c5d81",
                "660aabf7e98f0973e6ed1f34",
                "660aac46d212dff9c04dd6f2",
                "660aacead212dff9c04dd710"
            ],
            lastDate: "2024-04-01T11:18:55.572Z",
            __v: 10
        },
        "isRead": true,
        "isSent": true,
        "isRecieved": true,
        "isFavorite": true,
        "isDeleted": false,
        "_id": "660a981f19b3b4f709af28"
    }
]


const EmailLIst = () => {

    const [input, setInput] = useState('')
    const [filteredEmailList1, setFilteredEmailList1] = React.useState(emailList);

    const { emailType } = useParams()
    let filter;
    if (emailType == "inbox") {
        ;
        filter = "isRecieved"
    }
    if (emailType == "sent emails") {
        filter = "isSent"
    }
    if (emailType == "favorite") {
        filter = "isFavorite"
    }
    if (emailType == "deleted") {
        filter = "isDeleted"
    }


    




    // const [filteredEmailList2, setFilteredEmailList2] = React.useState(filteredEmailList1);

    // const searchFilter = (input) => {
    //     // if(!input){
    //     //     setFilteredEmailList1(filteredEmailList1)
    //     // }
    //     const newEmailList = filteredEmailList1.filter((item) => {
    //         return item.email.subject.toLowerCase().includes(input.toLowerCase())
    //     })
    //     setFilteredEmailList2(newEmailList)
    // }


    useEffect(() => {
        const basicFilter = () => {
            const newEmailList = emailList.filter((item) => {
                return item[filter] && item.email.subject.toLowerCase().includes(input.toLowerCase());
            })
            setFilteredEmailList1(newEmailList)
        }
        basicFilter()
    }, [emailType, input])





    // useEffect(() => {
    //     const basicFilter2 = ()=>{ 
    //         const newEmailList = filteredEmailList1.filter((item) => {
    //             return item.email.subject.toLowerCase().includes(input.toLowerCase())
    //         })
    //         setFilteredEmailList1(newEmailList)
    //     }
    //     basicFilter2()
    // },[input])
























    return (
        <div className={styles.mainContainer}>

            <div className={styles.main}>
                <div className={styles.header}>
                    <InputSearch sendInput={setInput} />

                </div>

                {
                    filteredEmailList1.map((item, index) => {
                        return (
                            <NavLink
                                key={item._id}
                                to={`${item._id}`}
                                className={({ isActive }) =>
                                    `${isActive ? styles.active : ""} ${styles.box}`
                                }
                                style={({ isActive }) => isActive ? { boxShadow: "0px 3px 6px rgb(212, 210, 210)" } : {}}

                            >


                                <EmailLi item={item} />
                            </NavLink>

                        )
                    })
                }

            </div>


        </div>
    )
}

export default EmailLIst
