import React from "react";
import styles from './EditTable.module.css';
import { Link } from "react-router-dom";

class EditTable extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         result: [],
         FirstName: '',
         LastName: '',
         Phone: '',
         updateId: '',
      };
   };

   getContacts = () => {
      fetch('https://6238cbfb00ed1dbc5ab780f6.mockapi.io/user')
         .then((response) => response.json())
         .then((result) => {
            this.setState({
               result,
            });
         })
         .catch(error => console.log(error));
   };

   componentDidMount() {
      this.getContacts();
   };

   handleUpdate = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
   };

   submitUpdate = (event) => {
      event.preventDefault();
      let { updateId, FirstName, LastName, Phone } = this.state;
      if (updateId) {
         if (this.state.result.map(v => v.id).find(v => Number(v) === Number(updateId))) {
            fetch(`https://6238cbfb00ed1dbc5ab780f6.mockapi.io/user/${updateId}`, {
               method: 'PUT',
               body: JSON.stringify({
                  FirstName: `${FirstName}`,
                  LastName: `${LastName}`,
                  Phone: `${Number(Phone)}`,
               }),
               headers: {
                  'Content-type': 'application/json; charset=UTF-8',
               },
            })
               .then(() => { window.location.href = '/' });
         } else {
            alert("This post doesn't exist, try another id!");
         };
      } else {
         fetch(`https://6238cbfb00ed1dbc5ab780f6.mockapi.io/user/`, {
            method: 'POST',
            body: JSON.stringify({
               FirstName: `${FirstName}`,
               LastName: `${LastName}`,
               Phone: `${Number(Phone)}`,
            }),
            headers: {
               'Content-type': 'application/json; charset=UTF-8',
            },
         })
            .then(() => { window.location.href = '/' });
      };
      this.setState({
         FirstName: '',
         LastName: '',
         Phone: '',
         updateId: '',
      });
   };

   render() {
      let { updateId, FirstName, LastName, Phone } = this.state;
      return (
         <form className={styles.form} onSubmit={this.submitUpdate}>
            <div>Create a new contact or update an existing one</div>
            <label htmlFor="updateId">Put contact id to update an existing contact, otherwise a new one will be created</label>
            <input
               id='updateId'
               name='updateId'
               type="text"
               value={updateId}
               placeholder='id to update a contact'
               onChange={this.handleUpdate}
            />
            <label htmlFor="FirstName">Enter your firstname</label>
            <input required
               id='FirstName'
               name='FirstName'
               type="text"
               value={FirstName}
               placeholder='Example: Ivan'
               onChange={this.handleUpdate}
            />
            <label htmlFor="LastName">Enter your lastname</label>
            <input required
               id='LastName'
               name='LastName'
               type="text"
               value={LastName}
               placeholder='Example: Ivanov'
               onChange={this.handleUpdate}
            />
            <label htmlFor="Phone">Enter your phone</label>
            <input required
               id='Phone'
               name='Phone'
               type="tel"
               value={Phone}
               placeholder='Example: 0988316899'
               onChange={this.handleUpdate}
            />
            <button type='submit'>Save</button>
            <nav>
               <Link className={styles.navLink} to="/">Cancel</Link>
            </nav>
         </form>
      )
   };
};

export default EditTable;
