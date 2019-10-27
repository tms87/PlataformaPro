const url ="http://localhost:8080";
const urlInsertUser = "/insertUser";
const urlUpdateUser = "/updateUser";
const urlDeleteUser = "/deleteUser";

class UserController
{
    async insertUser(data)
    {
        const endpoint = `${url}${urlInsertUser}`;
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
            alert("Se ha agregado el usuario");
        } catch(error) {
            console.error('Error: ', error);
        }
    };

    async updateUser(data) {
        const endpoint = `${url}${urlUpdateUser}`;
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
            alert("Se ha actualizado el usuario");
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async deleteUser(data) {
        const endpoint = `${url}${urlDeleteUser}`;
        const options = {
            method:'DELETE',
            mode: "cors",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };
        try {
            const res = await fetch(endpoint, options);
            const resObject = await res.json();
            console.log(resObject);
            alert("Se ha eliminado el usuario");
        } catch (error) {
            console.error('Error: ', error);
        }
    }
}

export default new UserController();