import React, {ReactElement} from 'react';
import MaterialTable, {MTableToolbar} from 'material-table';

export default function UsersTable(props) {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Nombre', field: 'name' },
      { title: 'Apellido', field: 'surname' },
      { title: 'Ultimo Turno', field: 'lastTurn', type: 'date' },
      { title: 'Proximo Turno', field: 'nextTurn', type: 'date'
        //lookup: { 34: 'İstanbul', 63: 'Sanlıurfa' },
      },
    ],
    data: [
      { name: 'Juan', surname: 'Perez', lastTurn: '10-10-2019' },
      { name: 'Maria', surname: 'Gutierrez', nextTurn: '25-10-2019' },
      { name: 'Ernesto', surname: 'Araujo', lastTurn: '03-10-2019' , nextTurn: '22-10-2019' },
      { name: 'Micaela', surname: 'Rodriguez', lastTurn: '04-10-2019', nextTurn: '24-10-2019' },
      { name: 'Carolina', surname: 'Saenz', lastTurn: '04-10-2019', nextTurn: '22-10-2019' },
      { name: 'Javier', surname: 'Suarez', lastTurn: '03-10-2019', nextTurn: '21-10-2019' },
    ],
  });

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
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
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

