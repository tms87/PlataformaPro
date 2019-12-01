import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import MeasurementInfo from './MeasurementInfo';
import MeasurementController from './MeasurementController';
import UrlInteligente from '../url';

export default function MeasurementTable(props) {
  const [mediciones, setMediciones] = React.useState(MeasurementInfo);
  const [state, setState] = React.useState(props);
  
  useEffect( () => {
    fetchData();
  } ,[fetchData])
  
  async function fetchData() {
    const med = await MeasurementController.getMeasurements(state.nroPaciente) || [];
    const endpoint = UrlInteligente.obtenerUrl('mediciones', `/mediciones/cliente/${state.nroPaciente}`);
    const options = {
      method: 'GET',
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
    };
    try {
      const res = await fetch(endpoint, options);
      const resObject = await res.json();
      let medList = mediciones;
      let measurements = [];
      measurements = med.map(d => ({ id: d.id, peso: d.peso, masa_muscular: d.masa_muscular, masa_grasa: d.masa_grasa, altura: d.altura, fecha: d.fecha }));
      medList.data = measurements;
      setMediciones(medList);
    } catch (error) {
      console.error('Error: ', error);
    }
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
          emptyDataSourceMessage: 'No hay registros para mostrar',
          editRow: {
            deleteText: '¿Esta seguro de eliminar esta medicion?',
            cancelTooltip: 'Cancelar',
            saveTooltip: 'Guardar',
          }
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
      columns={mediciones.columns}
      data={() => new Promise(resolve => setTimeout(
          () => fetchData()
          .then(
            response => response
          ).then(result => {
            resolve({
                data: mediciones.data, page: 0, totalCount: mediciones.data.length
            })
          }), 1200)
      )}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
                newData.cliente_id = 4;
                newData.profesional_id = 35;
                newData.tipo_id = 1;
                newData.contenido = "null";
                MeasurementController.insertMeasurement(newData);
              }, 1200);
              resolve();
            }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              MeasurementController.deleteMeasurement(oldData.id);
            }, 1200);
            resolve();
          }),
        onRowUpdate: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              MeasurementController.updateMeasurement(oldData);
            }, 1200);
            resolve();
          }),
      }}
    />
  );
}

