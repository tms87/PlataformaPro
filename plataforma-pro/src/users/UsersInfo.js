
export default {  
    columns: [
        { title: 'Nombre', field: 'name' },
        { title: 'Apellido', field: 'surname' },
        { title: 'Ultimo Turno', field: 'lastTurn', type: 'date' },
        { title: 'Proximo Turno', field: 'nextTurn', type: 'date'},
    ],
    data: []
}

/*  
    { name: 'Juan', surname: 'Perez', lastTurn: '10-10-2019' },
    { name: 'Maria', surname: 'Gutierrez', nextTurn: '25-10-2019' },
    { name: 'Ernesto', surname: 'Araujo', lastTurn: '03-10-2019' , nextTurn: '22-10-2019' },
    { name: 'Micaela', surname: 'Rodriguez', lastTurn: '04-10-2019', nextTurn: '24-10-2019' },
    { name: 'Carolina', surname: 'Saenz', lastTurn: '04-10-2019', nextTurn: '22-10-2019' },
    { name: 'Javier', surname: 'Suarez', lastTurn: '03-10-2019', nextTurn: '21-10-2019' },  
*/