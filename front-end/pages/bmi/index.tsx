import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "@/styles/bmi.module.css";
import BmiForm from "@/components/bmi/BmiForm";
import Header from "@/components/header";

const BMICalculator: React.FC = () => {
  const [bmi, setBMI] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");
  const [recommendedLevel, setRecommendedLevel] = useState<number | null>(null);


  const handleBmiCalculated = (bmiValue: number, bmiCategory: string, recommendedLevelValue: number) => {
    setBMI(bmiValue);
    setCategory(bmiCategory);
    setRecommendedLevel(recommendedLevelValue);
  };

  useEffect(() => {
    const storedBMI = sessionStorage.getItem("bmi");
    const storedCategory = sessionStorage.getItem("bmiCategory");
    if (storedBMI) setBMI(parseFloat(storedBMI));
    if (storedCategory) setCategory(storedCategory);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>BMI Calculator</title>
        <meta name="description" content="Calculate your BMI" />
      </Head>
      <Header />

      <main className={styles.centeredMain}>
        <h1>BMI Calculator</h1>

        <BmiForm onBmiCalculated={handleBmiCalculated} />

        {bmi && (
          <div className={styles.result}>
            <p>Your BMI: {bmi}</p>
            <p>Category: {category}</p>
            {recommendedLevel && (
              <p>Recommended workout level: {recommendedLevel} (1-5)</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default BMICalculator;
