const url ="http://b95ec43e.ngrok.io/api/profesionalclientes/";
const urlDelete = 'http://b95ec43e.ngrok.io/api/profesionalclientes/profesional/35/cliente/'

class ProfesionalClienteController
{
    async insertUser(relationData)
    {
        const endpoint = `${url}`;
        console.log(relationData);
        const options = {
            method:'POST',
            mode: "cors",
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
            body: JSON.stringify(relationData)
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

    async deleteUser(userId) {
        const endpoint = `${urlDelete}${userId}`;
        const options = {
            method:'DELETE',
            mode: "cors",
            headers: {'Content-Type': 'application/json'},
        };
        try {
            alert("Se ha eliminado el usuario");
        } catch (error) {
            console.error('Error: ', error);
        }
    }
}

export default new ProfesionalClienteController();