import UrlInteligente from '../url';

//const url = UrlInteligente.obtenerUrl('profesionales', "/profesionalclientes/");
//const urlDelete = UrlInteligente.obtenerUrl('profesional', '/profesionalclientes/profesional/35/cliente/'); 

class MeasurementController {
    async getMeasurements(nroPaciente) {
        const url = UrlInteligente.obtenerUrl('pacientes',`/mediciones/cliente/${nroPaciente}`);
        const options = {
            method:'GET',
            mode: "cors",
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        };
        try {
            const res = await fetch(url, options);
            const resObject = await res.json();
            console.log(resObject);
            return resObject;
        } catch(error) {
            console.error('Error: ', error);
        }
    }

    async insertMeasurement(relationData) {
        /* const endpoint = `${url}`;
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
        } */
    };
    async updateMeasurement(relationData) {
        /* const endpoint = `${url}`;
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
        } */
    };

    async deleteMeasurement(userId) {
        /* console.log("dsfdsfsd " + userId);
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
        } */
    }
}

export default new MeasurementController ();