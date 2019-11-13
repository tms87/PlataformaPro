import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import UserInfo from './UsersInfo';
import ProfesionalClientesController from './ProfesionalClientesController';
import UsersController from './UsersController';
import UrlNgrok from './../url';

export default function UsersTable(props) {
  const [state, setState] = React.useState(UserInfo);
  const [nroPaciente, setNroPaciente] = React.useState("");
  const [clientes, setClientes] = React.useState([]);

  const tableRef = React.createRef();

  async function updateClientes() {
    const nuevosClientes = await UsersController.getClientes() || [];
    setClientes(nuevosClientes);
  }

  useEffect( () => {
      fetchData();
      updateClientes();
  } ,[])

  async function fetchData() {
    const endpoint = UrlNgrok + '/profesionalclientes/clientes/35';
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
    }
  }

  return (
    <MaterialTable
      options={{
        actionsColumnIndex: -1,
        search: false
      }}
      title="Pacientes"
      columns={state.columns}
      tableRef={tableRef}
      data={() => new Promise(resolve => setTimeout(() => resolve({data: state.data, page: 0, totalCount: 5}), 600))}
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
                ProfesionalClientesController.insertUser(relationData);
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
              ProfesionalClientesController.deleteUser(oldData.id);
              setState({ ...state, data });
            }, 600);
          }),
      }}
      actions={[
        {
          icon: 'assignment',
          tooltip: 'Actividades',
          onClick: (event, rowData) => {
            props.setNroPaciente(rowData.id);
            props.setPage("activities")
          }
        },
        {
          icon: 'note',
          tooltip: 'Notas',
          onClick: (event, rowData) => {
            props.setNroPaciente(rowData.id);
            props.setPage("notas")
          }
        },
        {
          icon: 'refresh',
          tooltip: 'Refresh Data',
          isFreeAction: true,
          onClick: () => tableRef.current && tableRef.current.onQueryChange(),
        }
      ]}
    />
  );
}

