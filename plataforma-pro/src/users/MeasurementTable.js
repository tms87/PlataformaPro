import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import MeasurementInfo from './MeasurementInfo';
import MeasurementController from './MeasurementController';

export default function MeasurementTable(props) {
  const [infoMediciones, setInfoMediciones] = React.useState(MeasurementInfo);
  const [mediciones, setMediciones] = React.useState([]);
  const clientes = React.useState([]);
  const tableRef = React.createRef();
  
  useEffect( () => {
    fetchData();
  } ,[])
  
  async function fetchData() {
    const mediciones = await MeasurementController.getMeasurements(state.nroPaciente) || [];
    setMediciones(mediciones);
    /* const endpoint = UrlInteligente.obtenerUrl('profesionales','/profesionalclientes/clientes/35');// 'http://www.mocky.io/v2/5dcf22cc3000005500931dcc';// UrlNgrok + ;
    console.log(endpoint);
    const options = {
        method:'GET',
        mode: "cors",
        headers: {'Content-Type': 'application/json'},
    };
    try {
        const res = await fetch(endpoint, options);
        const resObject = await res.json();
        const patientsList = state;
        let newPatients = [];
        newPatients = resObject.map(d => ({ name: d.nombre, surname: d.apellido, dni: d.dni, id: d.id }));
        patientsList.data = newPatients;
        setState(patientsList);
        tableRef.current.onQueryChange();
    } catch(error) {
        console.error('Error: ', error);
    } */
  }

  return (
    <MaterialTable
      options={{
        actionsColumnIndex: -1,
        search: true
      }}
      localization={{
        header: {
          actions: 'Acciones',
        },
        body: {
          addTooltip: 'Agregar',
          deleteTooltip: 'Borrar',
          editTooltip: 'Editar',
        },
        toolbar: {
          searchTooltip: 'Buscar',
          searchPlaceholder: 'Buscar',
        },
        pagination: {
          labelRowsPerPage: 'filas por pagina',
          labelRowsSelect: 'filas',
          firstAriaLabel: 'Primer Página',
          firstTooltip: 'Primer Página',
          lastAriaLabel: 'Ultima Página',
          lastTooltip: 'Ultima Página',
          previousAriaLabel: 'Anterior',
          previousTooltip: 'Anterior',
          nextAriaLabel: 'Siguiente',
          nextTooltip: 'Siguiente',
          labelDisplayedRows: '{from}-{to} de {count}',
        }
      }}
      title="Mediciones"
      columns={infoMediciones.columns}
      tableRef={tableRef}
      data={() => new Promise(resolve => setTimeout(() => resolve({mediciones: state.mediciones, page: 0, totalCount: 10}), 600))}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const foundUser = clientes.find(x => x.dni === newData.dni);
              if(foundUser) {
                const data = [...state.data];
                newData.name = foundUser.nombre;
                newData.surname = foundUser.apellido;
                data.push(newData);
                setState({ ...state, data });
                const relationData = { cliente_id: foundUser.id, profesional_id: '35' };
                MeasurementController.insertMeasurement(relationData);
              } else {
                alert("No se encontro al usuario");
                return;
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              MeasurementController.deleteMeasurement(oldData.id);
              setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              /* data.splice(data.indexOf(oldData), 1); */
              MeasurementController.updateMeasurement(oldData.id);
              setState({ ...state, data });
            }, 600);
          }),
      }}
    />
  );
}

