import React, { FC, useState, useEffect } from "react";
import styles from "./Main.module.css";
import { useNavigate } from "react-router-dom";
import { IResult } from "../types/types";

export const MainFunctional: FC = () => {
  const [result, setResult] = useState<IResult[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  const getContacts = () => {
    fetch("https://6238cbfb00ed1dbc5ab780f6.mockapi.io/user")
      .then((response) => response.json())
      .then(
        (result) => {
          setResult(result);
        },
        (error) => {
          setError(error);
        }
      );
  };

  useEffect(() => {
    getContacts();
  }, []);

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    let idToDelete = (event.target as Element).id;
    if (idToDelete) {
      fetch(`https://6238cbfb00ed1dbc5ab780f6.mockapi.io/user/${idToDelete}`, {
        method: "DELETE",
      })
        .then(() => {
          alert(`Contact with id: ${idToDelete} is deleted`);
        })
        .then(() => {
          setResult(result.filter((elem) => elem.id !== idToDelete));
        });
    }
  };

  const handleToEditTable = () => {
    navigate("/edittable");
  };

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else {
    return (
      <main className={styles.main} onClick={handleDelete}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Phone</th>
              <th>Delete a contact</th>
            </tr>
          </thead>
          {result.map((contact) => (
            <tbody key={contact.id}>
              <tr>
                <td className={styles.td}>{contact.FirstName}</td>
                <td className={styles.td}>{contact.LastName}</td>
                <td className={styles.td}>{contact.Phone}</td>
                <td className={styles.td}>
                  <button id={contact.id}>Delete a contact</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <button onClick={handleToEditTable}>Edit Table</button>
      </main>
    );
  }
};
