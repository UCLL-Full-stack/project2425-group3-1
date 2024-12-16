import { useState } from "react";
import BmiService from "@/services/BmiService";

const UpdateBmiForm: React.FC = () => {
  const [bmiValue, setBmiValue] = useState<number | "">("");
  const [updatedBmi, setUpdatedBmi] = useState<number | null>(null);

  const handleBmiUpdate = async (newBmiValue: number) => {
    const token = sessionStorage.getItem("jwtToken");

    if (!token) {
      alert("User is not authenticated. Please log in again.");
      return;
    }

    const userId = parseInt(sessionStorage.getItem("userId") || "");

    if (!userId) {
      alert("User ID is missing.");
      return;
    }

    try {
      const response = await BmiService.updateBMI(userId, newBmiValue, token);
      setUpdatedBmi(response.bmi.bmiValue);
      alert("BMI successfully updated!");
    } catch (error) {
      alert("Failed to update BMI. Please try again.");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Updated BMI:
          <input
            type="number"
            value={bmiValue}
            onChange={(e) => setBmiValue(Number(e.target.value))}
            required
          />
        </label>
      </div>
      <button type="submit">Update BMI</button>
    </form>
  );
};

export default UpdateBmiForm;
