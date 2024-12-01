import { useState } from "react";
import BmiService from "@/services/BmiService";
import styles from "@/styles/bmi.module.css";

interface BmiFormProps {
  onBmiCalculated: (bmi: number, category: string, recommendedLevel: number) => void;
} //verwacht single function onBmiCalculated die de bmi info krijgt

const BmiForm: React.FC<BmiFormProps> = ({ onBmiCalculated }) => {
  const [height, setHeight] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">(""); //state die user's input voor height/weight bijhoudt

  const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi < 25) return "Healthy weight";
    if (bmi >= 25 && bmi < 30) return "Overweight";
    return "Obesity";
  };

  const getRecommendedLevel = (bmi: number): number => {
    if (bmi < 18.5) return 1;
    if (bmi >= 18.5 && bmi < 25) return 3;
    if (bmi >= 25 && bmi < 30) return 4;
    return 5;
  };

  const handleSubmit = async (e: React.FormEvent) => { //triggered wanneer user submit
    e.preventDefault(); //prevent normale form gedrag (zou pagina herladen).

    if (!height || !weight || height <= 0 || weight <= 0) {
      alert("Please enter valid values for height and weight.");
      return;
    }

    const calculatedBMI = (weight / (height / 100) ** 2).toFixed(1); //BEREKENT DE BMI!!
    const bmiValue = parseFloat(calculatedBMI);
    const category = getBMICategory(bmiValue);
    const recommendedLevel = getRecommendedLevel(bmiValue);

    onBmiCalculated(bmiValue, category, recommendedLevel);  //stuurt de data naar parent component

    sessionStorage.setItem("bmi", String(bmiValue));
    sessionStorage.setItem("bmiCategory", category); //behoudt deze 2 info's bij refreshen enzo

    try {
      await BmiService.addBMI(height, weight);
    } catch (error) {
      alert("Failed to save BMI data. Please try again.");
    } //savet de BMI data naar de backend
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label>
          Height (cm):
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            required
            className={styles.input}
          />
        </label>
      </div>
      <div>
        <label>
          Weight (kg):
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            required
            className={styles.input}
          />
        </label>
      </div>
      <button type="submit" className={styles.button}>
        Calculate BMI
      </button>
    </form>
  );
};

export default BmiForm;
