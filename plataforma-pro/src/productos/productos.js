import React, {useState, useEffect} from 'react';
import UrlInteligente from '../url';

const url = UrlInteligente.obtenerUrl("productos", "/productos");

export default function Productos(props){

    const [data, setData] = useState([]);
    const [hasError, setErrors] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {  
        async function fetchApi() {
            try {
              setLoading(true);
              const res = await fetch(url);
              await res.json()
                .then(json => { setData(json); console.log(json); });
            } catch (e) {
              setErrors(e);
            } finally {
              setLoading(false);
            }
          }

        fetchApi();
        console.log("data esto " + data[0])
        setRefresh(false);
      }, [refresh]);
    
    
    

    return (
        <p> id :{data.id} </p>
    );
}