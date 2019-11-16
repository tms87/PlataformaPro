import UrlInteligente from './../url';

const url = UrlInteligente.obtenerUrl('pacientes', "/profesionales/");
const urlClientes = UrlInteligente.obtenerUrl('pacientes', '') ; 

class UsersController
{
    async insertUser(userData)
    {
        
        console.log(userData);
        const endpoint = `${url}`;
        const options = {
            method:'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'},
            body: JSON.stringify(userData)
        };
        try {
            const res = await fetch(endpoint, options);
            if(res.ok === true) {
                alert("Se ha agregado el usuario");
            } else {
                const resObject = await res.json();
                console.log(resObject);
            }
        } catch(error) {
            console.error('Error: ', error);
        }
    };

    async getClientes()
    {
        const endpoint = `${urlClientes}`;
        console.log(urlClientes);
        const options = {
            method:'GET',
            mode: "cors",
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        };
        try {
            const res = await fetch(endpoint, options);
            const resObject = await res.json();
            console.log(resObject);
            return resObject;
        } catch(error) {
            console.error('Error: ', error);
        }
    };

    async updateUser(userId, newUserData) {
        const endpoint = `${url}${userId}`;
        const options = {
            method:'POST',
            mode: "cors",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUserData)
        };
        try {
            const res = await fetch(endpoint, options);
            console.log(res);
            alert("Se ha actualizado el usuario");
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async deleteUser(userId) {
        const endpoint = `${url}${userId}`;
        const options = {
            method:'DELETE',
            mode: "cors",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userId)
        };
        try {
            const res = await fetch(endpoint, options);
            console.log(res);
            alert("Se ha eliminado el usuario");
        } catch (error) {
            console.error('Error: ', error);
        }
    }
}

export default new UsersController();