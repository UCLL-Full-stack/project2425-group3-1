const addBMI = (length: number, weight: number) => {
    const token = sessionStorage.getItem('jwtToken'); 
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/bmi`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ length, weight }),
    });
  };
  
  const BmiService = {
    addBMI,
  };
  
  export default BmiService;
  