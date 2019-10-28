import App from '../App';
import React from 'react';
import ReactDOM from 'react-dom';

const url ="http://localhost:8080";
//const urlInsertUser="/insertUser";
const urlGetUserLogin="/getUserLogin";

class UserController
{
    /*insertUser(data)
    {
        const endpoint = `${url}${urlInsertUser}`;
        fetch (endpoint, {
            method:'POST',
            mode: "cors",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then((response) => {
            console.log(response);
        })
    }*/
    async getUserLogin(data) {
        const endpoint = `${url}${urlGetUserLogin}`;
        const options = {
            method:'POST',
            mode: "cors",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };
        try {
            const res = await fetch(endpoint, options);
            const resObject = await res.json();
            console.log(resObject);
            ReactDOM.render(<App />, document.getElementById('root'));
        } catch (error) {
            console.error('Error: ', error);
        }
    }
}

export default new UserController();