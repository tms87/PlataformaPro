import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import UserInfo from './UsersInfo';
import UsersController from './UsersController';

export default function UsersTable(props) {
  const [state, setState] = React.useState(UserInfo);

  useEffect( () => 
  async function fetchData() {
      const endpoint = 'http://localhost:8080/getUsers';
      const options = {
          method:'GET',
          mode: "cors",
          headers: {'Content-Type': 'application/json'},
      };
      try {
          const res = await fetch(endpoint, options);
          const resObject = await res.json();
          setState(resObject);
      } catch(error) {
          console.error('Error: ', error);
      }
      fetchData();
  }, [])

  return (
    <MaterialTable
      options={{
        actionsColumnIndex: -1,
        search: true
      }}
      title="Pacientes"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.push(newData);
              setState({ ...state, data });
              UsersController.insertUser(data);
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
              UsersController.updateUser(data);
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
              UsersController.deleteUser(data);
            }, 600);
          }),
      }}
      actions={[
        {
          icon: 'assignment',
          tooltip: 'Actividades',
          onClick: (event, rowData) => {
            props.setPage("activities")
          }
        },
      ]}
      /* components={{
        Toolbar: props => (
            <div style={{ backgroundColor: '#e8eaf5' }}>
                <MTableToolbar {...props} />
            </div>
        ),
      }} */
      /* localization={{
        header: {
          actions: 'Acciones',
        }
      }} */
    />
  );
}
