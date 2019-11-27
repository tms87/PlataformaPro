import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import UserInfo from './UsersInfo';
import ProfesionalClientesController from './ProfesionalClientesController';
import UsersController from './UsersController';
import UrlInteligente from './../url';

export default function UsersTable(props) {
  const [state, setState] = React.useState(UserInfo);
  const [clientes, setClientes] = React.useState([]);

  const tableRef = React.createRef();

  async function updateClientes() {
    const nuevosClientes = await UsersController.getClientes() || [];
    setClientes(nuevosClientes);
  }

  useEffect(() => {
    async function fetchData() {
      const endpoint = UrlInteligente.obtenerUrl('profesionales', '/profesionalclientes/clientes/35');// 'http://www.mocky.io/v2/5dcf22cc3000005500931dcc';// UrlNgrok + ;
      console.log(endpoint);
      const options = {
        method: 'GET',
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
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
      } catch (error) {
        console.error('Error: ', error);
      }
    }
    fetchData();
    updateClientes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MaterialTable
      options={{
        actionsColumnIndex: -1,
        search: false,
        paging: false,
        minBodyHeight: '80vh',
        maxBodyHeight: '80vh',
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
      title="Pacientes"
      toolbar={{ searchPlaceholder: "Buscar..." }}
      columns={state.columns}
      tableRef={tableRef}
      data={() => new Promise(resolve => setTimeout(() => resolve({ data: state.data, page: 0, totalCount: state.data.length }), 600))}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const foundUser = clientes.find(x => x.dni === newData.dni);
              if (foundUser) {
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
              {
                const data = state.data;
                const index = data.findIndex(i => i.id === oldData.id);
                data.splice(index, 1);
                ProfesionalClientesController.deleteUser(oldData.id);
                setState({ ...state, data });
              }
              resolve();
            }, 600);
          }),
      }}
      actions={[
        {
          icon: 'assignment',
          tooltip: 'Actividades',
          onClick: (event, rowData) => {
            props.setNroPaciente(rowData.id);
            props.setPage("activities");
          }
        },
        {
          icon: 'note',
          tooltip: 'Notas',
          onClick: (event, rowData) => {
            props.setNroPaciente(rowData.id);
            props.setPage("notas");
          }
        },
        {
          icon: 'person',
          tooltip: 'Perfil',
          onClick: (event, rowData) => {
            props.setNroPaciente(rowData.id);
            props.setPage("profile");
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

