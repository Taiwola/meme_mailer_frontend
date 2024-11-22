'use server';
import { TAuthcredentialsValidator } from "@/lib/validators/account-credentials";
import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL;

export const registerUser = async (data: TAuthcredentialsValidator) => {
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
  } catch (error: any) {
    // Handle errors (validation, network, or server-side issues)
    if (error.response) {
      // Server responded with an error status code
      throw new Error(error.response.data?.message || 'Registration failed'); // Throw error for useMutation to handle
    } else if (error.request) {
      // No response was received
      throw new Error('Network error, please try again'); // Throw error for network issues
    } else {
      // Unexpected error
      throw new Error(error.message || 'An error occurred during registration');
    }
  }
};



export const loginIn = async (data: TAuthcredentialsValidator) => {
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
  } catch (error: any) {
    // Handle errors (validation, network, or server-side issues)
    if (error.response) {
      // Server responded with an error status code
      throw new Error(error.response.data?.message || "Login failed"); // Throw server error
    } else if (error.request) {
      // No response was received
      throw new Error("Network error, please try again"); // Throw network error
    } else {
      // Unexpected error occurred during request setup
      throw new Error(error.message || "An error occurred during login"); // Throw general error
    }
  }
};
