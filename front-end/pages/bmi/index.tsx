import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "@/styles/bmi.module.css";
import BmiForm from "@/components/bmi/BmiForm";
import Header from "@/components/header";
import BmiService from "@/services/BmiService";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const BMICalculator: React.FC = () => {
  const { t } = useTranslation();
  const [bmi, setBMI] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");
  const [recommendedLevel, setRecommendedLevel] = useState<number | null>(null);
  const [updatedBmi, setUpdatedBmi] = useState<number | null>(null); 

  const handleBmiCalculated = (bmiValue: number, bmiCategory: string, recommendedLevelValue: number) => {
    setBMI(bmiValue);
    setCategory(bmiCategory);
    setRecommendedLevel(recommendedLevelValue);
  };

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
      setBMI(response.bmi.bmiValue);
      alert("BMI successfully updated!");
    } catch (error) {
      alert("Failed to update BMI. Please try again.");
    }
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

        <div className={styles.updateBmi}>
          <h2>Update your own profile's BMI</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const updatedBmiValue = updatedBmi ?? 0;
              if (updatedBmiValue > 0) {
                handleBmiUpdate(updatedBmiValue);
              } else {
                alert("Please enter a valid BMI value.");
              }
            }}
          >
            <div>
              <label>
                Updated BMI:
                <input
                  type="number"
                  value={updatedBmi ?? ""}
                  onChange={(e) => setUpdatedBmi(Number(e.target.value))}
                  required
                  min="0"
                  className={styles.input}
                />
              </label>
            </div>
            <button type="submit" className={styles.button}>
              Update BMI
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};


export default BMICalculator;
