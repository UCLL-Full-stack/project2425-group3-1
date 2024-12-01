const addBMI = (length: number, weight: number) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/bmi`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ length, weight }),
    });
  };
  
  const BmiService = {
    addBMI,
  };
  
  export default BmiService;
  