type subscriberDatType = {
    month: string, 
    count: number 
  }

export const fetchSubscriberCount = async (): Promise<subscriberDatType[]> => {
    const token = localStorage.getItem("token");
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  
    const res = await fetch(`${API_BASE_URL}/api/analytics`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Add token for authorization
        "Content-Type": "application/json", 
      },
    });
  
    const response = await res.json();
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || res.statusText);
    }
  
   const c:subscriberDatType[] = response.data.last7months;
  
    return c;
  };