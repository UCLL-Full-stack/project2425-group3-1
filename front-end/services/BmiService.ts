const addBMI = (length: number, weight: number) => {
  const token = sessionStorage.getItem("jwtToken");
  if (!token) {
    throw new Error("No authorization token found.");
  }

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/bmi`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ length, weight }),
  });
};

const updateBMI = (userId: number, bmiValue: number, token: string) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/bmi`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ bmiValue }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to update BMI. Response: " + response.statusText);
    }
    return response.json();
  });
};

const BmiService = {
  addBMI,
  updateBMI,
};

export default BmiService;
