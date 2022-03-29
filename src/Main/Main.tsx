import React from "react";
import styles from "./Main.module.css";
import { Link } from "react-router-dom";
import { IResult, IMyState } from "../types/types";

class Main extends React.Component<{}, IMyState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      result: [],
    };
  }

  getContacts = () => {
    fetch("https://6238cbfb00ed1dbc5ab780f6.mockapi.io/user")
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          result,
        });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.getContacts();
  }

  handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    let idToDelete = (event.target as Element).id;
    if (idToDelete) {
      fetch(`https://6238cbfb00ed1dbc5ab780f6.mockapi.io/user/${idToDelete}`, {
        method: "DELETE",
      })
        .then(() => {
          alert(`Contact with id: ${idToDelete} is deleted`);
        })
        .then(() => {
          this.setState({
            result: (this.state.result as IResult[]).filter(
              (elem) => elem.id !== idToDelete
            ),
          });
        });
    }
  };

  render() {
    let { result } = this.state;
    return (
      <main className={styles.main} onClick={this.handleDelete}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Phone</th>
              <th>Delete a contact</th>
            </tr>
          </thead>
          {(result as IResult[]).map((contact) => (
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
        <nav className={styles.nav}>
          <Link className={styles.navLink} to="edittable">
            Edit Table
          </Link>
        </nav>
      </main>
    );
  }
}

export default Main;
