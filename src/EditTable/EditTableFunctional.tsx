import React, { FC, useState, useEffect } from "react";
import styles from "./EditTable.module.css";
import { Link, useNavigate } from "react-router-dom";
import { IResult } from "../types/types";

export const EditTableFunctional: FC = () => {
  const [result, setResult] = useState<IResult[]>([]);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Phone, setPhone] = useState("");
  const [updateId, setupdateId] = useState("");
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

  const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case "FirstName":
        setFirstName(value);
        break;
      case "LastName":
        setLastName(value);
        break;
      case "Phone":
        setPhone(value);
        break;
      case "updateId":
        setupdateId(value);
        break;
      default:
        break;
    }
  };

  const submitUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (updateId) {
      if (result.map((v) => v.id).find((v) => Number(v) === Number(updateId))) {
        fetch(`https://6238cbfb00ed1dbc5ab780f6.mockapi.io/user/${updateId}`, {
          method: "PUT",
          body: JSON.stringify({
            FirstName: `${FirstName}`,
            LastName: `${LastName}`,
            Phone: `${Number(Phone)}`,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }).then(() => {
          navigate("/");
        });
      } else {
        alert("This post doesn't exist, try another id!");
      }
    } else {
      fetch(`https://6238cbfb00ed1dbc5ab780f6.mockapi.io/user/`, {
        method: "POST",
        body: JSON.stringify({
          FirstName: `${FirstName}`,
          LastName: `${LastName}`,
          Phone: `${Number(Phone)}`,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then(() => {
        navigate("/");
      });
    }
    setFirstName("");
    setLastName("");
    setPhone("");
    setupdateId("");
  };

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else {
    return (
      <form className={styles.form} onSubmit={submitUpdate}>
        <div>Create a new contact or update an existing one</div>
        <label htmlFor="updateId">
          Put contact id to update an existing contact, otherwise a new one will
          be created
        </label>
        <input
          id="updateId"
          name="updateId"
          type="text"
          value={updateId}
          placeholder="id to update a contact"
          onChange={handleUpdate}
        />
        <label htmlFor="FirstName">Enter your firstname</label>
        <input
          required
          id="FirstName"
          name="FirstName"
          type="text"
          value={FirstName}
          placeholder="Example: Ivan"
          onChange={handleUpdate}
        />
        <label htmlFor="LastName">Enter your lastname</label>
        <input
          required
          id="LastName"
          name="LastName"
          type="text"
          value={LastName}
          placeholder="Example: Ivanov"
          onChange={handleUpdate}
        />
        <label htmlFor="Phone">Enter your phone</label>
        <input
          required
          id="Phone"
          name="Phone"
          type="tel"
          value={Phone}
          placeholder="Example: 0988316899"
          onChange={handleUpdate}
        />
        <button type="submit">Save</button>
        <nav>
          <Link className={styles.navLink} to="/">
            Cancel
          </Link>
        </nav>
      </form>
    );
  }
};
