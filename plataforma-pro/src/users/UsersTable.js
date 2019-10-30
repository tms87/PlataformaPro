import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import UserInfo from './UsersInfo';
import UsersController from './UsersController';

export default function UsersTable(props) {
  const [state, setState] = React.useState(UserInfo);

  useEffect( () => {
      fetchData();
  } ,[])

  async function fetchData() {
    const endpoint = 'http://141aa639.ngrok.io/api/profesionalclientes';
    const options = {
        method:'GET',
        mode: "cors",
        headers: {'Content-Type': 'application/json'},
    };
    try {
        const res = await fetch(endpoint, options);
        const resObject = await res.json();
        const data = [...state.data];
        data.push(resObject);
        setState({ ...state, data });
    } catch(error) {
        console.error('Error: ', error);
    }
  }

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
              console.log(JSON.stringify(newData));
              data.push(newData);
              setState({ ...state, data });
              UsersController.insertUser(newData);
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              console.log(oldData);
              console.log(newData);
              setState({ ...state, data });
              UsersController.updateUser(oldData, newData);
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
              UsersController.deleteUser(oldData);
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

