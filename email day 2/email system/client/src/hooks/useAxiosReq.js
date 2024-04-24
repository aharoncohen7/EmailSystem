import { useEffect, useState } from 'react'
import { axiosReq } from '../helpers'

export default function useAxiosReq({ defaultVal, method, url, body }) {

    const [data, setData] = useState(defaultVal)
    // טעינה בעת המתנה למידע
    const [loading, setLoading] = useState(false)
    // שגיאה
    const [error, setError] = useState('')

    // בקשת מידע
    const fetchData = async () => {
        // התחלת אפקט טעינה
        setLoading(true)
        try {
            const result = await axiosReq({ method, url, body })
            setData(result)
        } catch (e) {
            setError(e)
        } finally {

            // הפסקת אפקט טעינה
            setLoading(false)

        }
    }

    // הפעלת קריאה
    useEffect(() => {
        setTimeout(() => {
            fetchData()
        }, [1000])
    }, [])

    return { data, loading, error, fetchData }
}
