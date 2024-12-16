import { Bmi } from "@/types";
import { table } from "console";
import styles from "../../styles/users.module.css";

type Props = {
  bmis: Array<Bmi>;
};

const BmiDataTable: React.FC<Props> = ({ bmis }: Props) => {
  return (
    <>
      <h1 className={styles.h1}>All BMI's</h1>
      {bmis && (
        <table className={styles.userDataTable}>
          <thead>
            <tr>
              <th scope="col">Lenght</th>
              <th scope="col">Weight</th>
              <th scope="col">BmiValue</th>
            </tr>
          </thead>
          <tbody>
            {bmis.map((bmi) => (
              <tr key={bmi.id}>
                <td>{bmi.length}</td>
                <td>{bmi.weight}</td>
                <td>{bmi.bmiValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default BmiDataTable;
