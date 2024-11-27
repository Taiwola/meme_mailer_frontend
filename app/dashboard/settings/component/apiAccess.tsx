import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';


export default function ApiAccess() {
  const [apiKey, setApiKey] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch the API key from the backend
  const fetchApiKey = async () => {
    setLoading(true);
    setError(null);
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_BASE_URL}/api/apiKey`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
        throw new Error('Failed to fetch API key');
      }

      setApiKey(data.apiKey); // Assuming the response contains the API key
      localStorage.setItem("apiKey",data.apiKey);
    } catch (error) {
      setError('Error fetching API key');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the API key when the component mounts or when needed
  useEffect(() => {
    setLoading(true);
    const apiKey = localStorage.getItem('apiKey');
    if (!apiKey) {
    fetchApiKey();
    setLoading(false)
  }
  setApiKey(apiKey);
  setLoading(false)
  }, [apiKey]);

  // Function to copy the API key to the clipboard
  const copyToClipboard = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey).then(() => {
       toast.success("Copied!")
      }).catch((error) => {
        toast.error('Failed to copy API key');
        console.error(error);
      });
    }
  };

  return (
    <div className="bg-[#f7f7f7] p-6 rounded-lg w-full border max-w-2xl mx-auto my-8 shadow-lg">
      <h1 className="text-3xl text-center mb-6 text-[#831743]">API Access</h1>

      {loading ? (
        <p className="text-center">Loading API key...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : apiKey ? (
        <div>
          <p className="text-[#831743] text-xl font-bold mb-2">Your API Key:</p>
          <div className="bg-[#E5E1DA] p-4 rounded-md mb-4 flex items-center space-x-4 break-all">
          <small className="flex-1 whitespace-pre">
  {apiKey.length > 50 ? `${apiKey.slice(0, 50)}...` : apiKey}
</small>
            <Button
              onClick={copyToClipboard}
              className=" text-white py-2 px-4 rounded-md transition-colors"
            >
              Copy to Clipboard
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-center">No API key available. Please try again later.</p>
      )}

      {/* Generate API Key Button */}
      <div className="text-center mt-6">
        <Button
          onClick={fetchApiKey}
          className=" text-white py-3 px-6 rounded-md transition-colors"
        >
          Generate API Key
        </Button>
      </div>
    </div>
  );
}
