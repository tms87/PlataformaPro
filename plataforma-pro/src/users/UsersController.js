const url ="http://beec83ba.ngrok.io/api/profesionalclientes/";

class UserController
{
    async insertUser(data)
    {
        const endpoint = `${url}`;
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

    async updateUser(oldData, newData) {
        const endpoint = `${url}${oldData.name}`;
        const options = {
            method:'POST',
            mode: "cors",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newData)
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
        console.log(data);
        const endpoint = `${url}${data.name}`;
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