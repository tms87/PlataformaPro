import UrlInteligente from './../url';

const url = UrlInteligente.obtenerUrl('profesionales', "/profesionalclientes/");
const urlDelete = UrlInteligente.obtenerUrl('profesional', '/profesionalclientes/profesional/35/cliente/'); 

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
        console.log("dsfdsfsd " + userId);
        const endpoint = `${urlDelete}${userId}`;
        const options = {
            method:'DELETE',
            mode: "cors",
            headers: {'Content-Type': 'application/json'},
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

export default new ProfesionalClienteController();