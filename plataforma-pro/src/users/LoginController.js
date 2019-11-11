import App from '../App';
import React from 'react';
import ReactDOM from 'react-dom';
import Url from '../url';

//const urlInsertUser="/insertUser";
const urlGetUserLogin="/profesionales/";

class UserController
{
    /*insertUser(data)
    {
        const endpoint = `${Url}${urlInsertUser}`;
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
        const endpoint = `${Url}${urlGetUserLogin}${data.email}`;
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
            alert('Bienvenido ' + resObject.nombre)
        } catch (error) {
            console.error('Error: ', error);
        }
    }
}

export default new UserController();