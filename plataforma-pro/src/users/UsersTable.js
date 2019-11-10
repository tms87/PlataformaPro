import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import UserInfo from './UsersInfo';
import ProfesionalClientesController from './ProfesionalClientesController';
import UsersController from './UsersController';
import { Typography } from '@material-ui/core';

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
    const endpoint = 'http://b95ec43e.ngrok.io/api/profesionalclientes/clientes/35';
    const options = {
        method:'GET',
        mode: "cors",
        headers: {'Content-Type': 'application/json'},
    };
    try {
        const res = await fetch(endpoint, options);
        const resObject = await res.json();
        const oldData = state;
        let newPacientes = [];
        newPacientes = resObject.map(d => ({ name: d.nombre, surname: d.apellido, dni: d.dni, id: d.id }));
        oldData.data = newPacientes;
        setState(oldData);
        tableRef.current.onQueryChange();
    } catch(error) {
        console.error('Error: ', error);
    }
  }

  return (
    <Typography paragraph>
    <MaterialTable
      options={{
        actionsColumnIndex: -1,
        search: true
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
              console.log(oldData);
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
              ProfesionalClientesController.deleteUser(oldData.id);
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
          icon: 'refresh',
          tooltip: 'Refresh Data',
          isFreeAction: true,
          onClick: () => tableRef.current && tableRef.current.onQueryChange(),
        }
      ]}
    />
  </Typography>
  );
}

