
import { useAppContext } from "@/app/utils/providers";
import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL;


export const saveEmail = async ({ title, content }: { title: string; content: any }) => {
    const {authToken} = useAppContext();

    const options = {
        title: title,
        content: JSON.stringify(content)
    };

    const headers = {
        Authorization: `Bearer ${authToken}`, // Add token for authorization
        "Content-Type": "application/json", // Specify content type
    };

    try {
        const res = await axios.post(`${API_BASE_URL}/api/newsletter`, options, { headers });

        if (res.status === 201) {
            const responseData = res.data;
            if (!responseData || typeof responseData !== 'object') {
                throw new Error('Invalid response from server');
            }
            return responseData;
        } else {
            throw new Error(res.data.message || 'An unknown error occurred');
        }
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || error.message || 'An error occurred';
            throw new Error(message);
        } else {
            throw new Error('Unexpected error occurred');
        }
    }
}


export const getEmails = async () => {
    const token = localStorage.getItem("token");
    

    if (!token) {
        throw new Error("No valid token")
    }

   


    try {
        const res = await fetch(`http://localhost:5000/api/newsletter`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`, // Add token for authorization
                "Content-Type": "application/json", 
            }
        })
        const data = await res.json();
        console.log(data);
       if (!res.ok) {
        throw new Error("Something went wrong");
       }
       return data
    } catch (error) {
         if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || error.message || 'An error occurred';
            throw new Error(message);
        } else {
            throw new Error('Unexpected error occurred');
        }
    }
}


export const getOneEmail = async (Id: string) => {
    const token = localStorage.getItem("token");
    

    if (!token) {
        throw new Error("No valid token")
    }

   


    try {
        const res = await fetch(`http://localhost:5000/api/newsletter/${Id}`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`, // Add token for authorization
                "Content-Type": "application/json", 
            }
        })
        const data = await res.json();
        console.log(data);
       if (!res.ok) {
        throw new Error("Something went wrong");
       }
       return data
    } catch (error) {
         if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || error.message || 'An error occurred';
            throw new Error(message);
        } else {
            throw new Error('Unexpected error occurred');
        }
    }
}