import React, {useState, useEffect} from 'react';
import Grafico from './Grafico';
import UrlInteligente from '../url';


export default function Profile(props) {
    let { nroPaciente, modoPaciente } = props;
    if (modoPaciente) {
        nroPaciente = "5";
    }
    const url = UrlInteligente.obtenerUrl('mediciones',`/mediciones/cliente/${nroPaciente}`);
    const [state, setState] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchApi() {
            console.log("pase por aca SISISIIS");
            try {
                setLoading(true);
                const res = await fetch(url);
                await res.json()
                .then(json => { setState(json); console.log(json); });
                console.log("pase por aca TAMBIEN");   
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }
        fetchApi();
    }, [url]);

    return (
        <Grafico data={state} />
    );
    
}