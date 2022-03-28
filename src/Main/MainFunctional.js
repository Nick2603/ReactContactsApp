import React, { useState, useEffect } from "react";
import styles from './Main.module.css';
import { Link } from "react-router-dom";

export const MainFunctional = () => {

   const [result, setResult] = useState([]);
   const [error, setError] = useState(null);

   const getContacts = () => {
      fetch('https://6238cbfb00ed1dbc5ab780f6.mockapi.io/user')
         .then((response) => response.json())
         .then(
            (result) => {
               setResult(result)
            },
            (error) => {
               setError(error);
            },
         )
   };

   useEffect(() => {
      getContacts()
   }, []);

   const handleDelete = (event) => {
      let idToDelete = event.target.id;
      if (idToDelete) {
         fetch(`https://6238cbfb00ed1dbc5ab780f6.mockapi.io/user/${idToDelete}`, {
            method: 'DELETE',
         })
            .then(() => { alert(`Contact with id: ${idToDelete} is deleted`) })
            .then(() => {
               setResult(result.filter(elem => elem.id !== idToDelete));
            });
      };
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
               {result.map(contact => <tbody key={contact.id}>
                  <tr>
                     <td className={styles.td}>{contact.FirstName}</td>
                     <td className={styles.td}>{contact.LastName}</td>
                     <td className={styles.td}>{contact.Phone}</td>
                     <td className={styles.td}><button id={contact.id}>Delete a contact</button></td>
                  </tr>
               </tbody>)}
            </table>
            <nav className={styles.nav}>
               <Link className={styles.navLink} to="edittable">Edit Table</Link>
            </nav>
         </main>
      )
   };
};