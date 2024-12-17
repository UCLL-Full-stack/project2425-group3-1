import { User } from "@/types";
import { table } from "console";
import { UNDERSCORE_NOT_FOUND_ROUTE } from "next/dist/shared/lib/constants";
import { useRouter } from "next/router";
import styles from "../../styles/users.module.css";

type Props = {
  users: User[] | null | undefined;
};

const UserDataTable: React.FC<Props> = ({ users }: Props) => {
  const router = useRouter();

  if (!users || !Array.isArray(users) || users.length === 0) {
    return <p className={styles.pError}>No users found</p>;
  }
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
            {users &&
              users.map((user) => (
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
