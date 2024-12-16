import React from "react";
import Image from "next/image";
import styles from "@/styles/workouts.module.css";

type Props = { image: string | null };

const SelectedMuscleImage: React.FC<Props> = ({ image }) => (
  <div className={styles.imageSection}>
    {image ? (
      <Image
        src={image}
        alt="Selected Muscle Group"
        className={styles.image}
        width={200}
        height={200}
      />
    ) : (
      <p>No muscle image selected</p>
    )}
  </div>
);

export default SelectedMuscleImage;
