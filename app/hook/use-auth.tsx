import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAppContext } from "../utils/providers";
import { TAuthcredentialsValidator } from "@/lib/validators/account-credentials";
import axios, { AxiosError } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useAuth = () => {
    const router = useRouter();
    const { setAuthState } = useAppContext();

    const signOut = async () => {
        try {
            // Uncomment and modify the following when implementing backend sign-out
            // const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, {
            //     method: 'POST',
            //     credentials: 'include',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     }
            // });

            // if (!res.ok) {
            //     throw new Error();
            // }

            // Clear the authentication state
            setAuthState({ user: null, isAuthenticated: false });
            localStorage.removeItem('token');
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('userId');
            localStorage.removeItem('username');
            localStorage.removeItem('useremail');
            

            // Show success message
            toast.success("Signed out successfully");

            // Redirect to sign-in page
            router.push('/sign-in');
            router.refresh(); // Optionally refresh the page
        } catch (error) {
            toast.error("Couldn't sign out, please try again.");
            console.log(error);
        }
    };

     const registerUser = async (data: TAuthcredentialsValidator) => {
        const options = {
          name: data.name,
          email: data.email,
          password: data.password,
        };
      
        // Basic validation
        if (!options.name) {
          throw new Error('Name is required'); // Throw an error for useMutation to handle
        }
        if (!options.email) {
          throw new Error('Email is required');
        }
        if (!options.password) {
          throw new Error('Password is required');
        }
      
        try {
          // Make the registration API call
          const response = await axios.post(`${API_BASE_URL}/api/auth/register`, options);
      
          // Check if the status indicates success
          if (response.status === 201) {
            return response.data; // Return data for useMutation's `onSuccess`
          } else {
            throw new Error('Registration failed, please try again'); // Force an error for unexpected status codes
          }
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            // Handle AxiosError specifically
            if (error.response) {
              throw new Error(error.response.data?.message || "Login failed");
            } else if (error.request) {
              throw new Error("Network error, please try again");
            }
          } else if (error instanceof Error) {
            // Handle generic errors
            throw new Error(error.message || "An error occurred during login");
          } else {
            // Handle unexpected errors
            throw new Error("An unknown error occurred");
          }
        }
      };


       const loginIn = async (data: TAuthcredentialsValidator) => {
        const options = {
          email: data.email,
          password: data.password,
        };
      
        // Basic validation
        if (!options.email) {
          throw new Error('Email is required'); // Throw error for missing email
        }
        if (!options.password) {
          throw new Error('Password is required'); // Throw error for missing password
        }
      
        try {
          // Make the login API call
          const response = await axios.post(`${API_BASE_URL}/api/auth/login`, options);
      
          // Handle successful login
          if (response.status === 200) {
            console.log("User logged in successfully", response.data);
            return response.data; // Return response data for useMutation's onSuccess
          } else {
            // Handle unexpected success statuses
            throw new Error("Login failed, please check your credentials");
          }
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            // Handle AxiosError specifically
            if (error.response) {
              throw new Error(error.response.data?.message || "Login failed");
            } else if (error.request) {
              throw new Error("Network error, please try again");
            }
          } else if (error instanceof Error) {
            // Handle generic errors
            throw new Error(error.message || "An error occurred during login");
          } else {
            // Handle unexpected errors
            throw new Error("An unknown error occurred");
          }
        }
      };


      const getEmails = async () => {
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

    const getAllSubscriber = async () => {
      const token = localStorage.getItem("token");
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    
      const res = await fetch(`${API_BASE_URL}/api/subscriber`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || res.statusText);
      }
    
      return data.subscriber;
    };

    return { signOut, registerUser, loginIn, getEmails, getAllSubscriber };
};
