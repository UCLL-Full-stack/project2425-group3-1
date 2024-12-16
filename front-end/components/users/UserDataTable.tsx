import { User } from "@/types";
import { table } from "console";
import { UNDERSCORE_NOT_FOUND_ROUTE } from "next/dist/shared/lib/constants";
import { useRouter } from "next/router";
import styles from "../../styles/users.module.css";

type Props = {
  users: Array<User>;
};

const UserDataTable: React.FC<Props> = ({ users }: Props) => {
  const router = useRouter();
  return (
    <>
      <h1 className={styles.h1}>All Users</h1>
      {users && (
        <table className={styles.userDataTable}>
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td> {user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserDataTable;
