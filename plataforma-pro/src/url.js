    
export default  {
    backEndHabilitado : true,
    UrlNgrok : 'http://06506655.ngrok.io/api',

    pacientes: 'http://www.mocky.io/v2/5de2eb0d3000006800e9c966', 
    //[{ "id" : "1","profesional_id" : "2",   "nombre": "Ernesto", "apellido": "Araujo", "lastTurn": "03-10-2019" ,   "nextTurn": "22-10-2019", "dni" : "37009167"}]
    actividades : 'http://www.mocky.io/v2/5dd072752f000053003f208e',
    //[{"id":18,"cliente_id":61,"tipo_id":48,"profesional_id":2,"contenido":"Ea perspiciatis recusandae atque quis voluptatem labore similique.","comentario_paciente":"Quia molestiae dolores est ex.","comentario_profesional":"Voluptas facere non consequatur fugiat totam qui minus.","fecha_inicio":"2019-10-06","fecha_fin":"2020-01-01","finalizada":1,"created_at":"2019-10-18 22:19:08","updated_at":"2019-10-18 22:19:08","template":0,"titulo":null,"descripcion":null}]
    actividaesForm: 'No hay url',
    templateForm: 'No hay url',
    actividadCard: 'No hay url',
    recetas: 'http://www.mocky.io/v2/5de2985c3000007900e9c91b',
    recetasForm : 'No hay url',
    profesional: "http://www.mocky.io/v2/5dd071652f000051003f208d",
    //{"id":2,"nombre":"Mrs. Herta Hirthe IV","apellido":"Torphy","dni":"97640794","fecha_nacimiento":"2016-04-17","genero":"female","comentarios":"Voluptatibus dolor vel cupiditate dolorum.","telefono":"1-706-547-2091 x2500","direccion":"3207 Bonnie Cove Suite 400\nAidanland, NY 76879-9710","email":"2","created_at":"2019-10-18 22:28:54","updated_at":"2019-10-29 03:38:30"}
    fondo : 'No url',
    default : 'No hay url',
    profesionales : 'http://www.mocky.io/v2/5dcf22cc3000005500931dcc',
    /*La direfencia es que uno es un cliente de un profesional en particular, otro son todos los clientes de un profesional*/
    productos: 'http://www.mocky.io/v2/5ddeea583100005f733ae5c0',
    //[{"id": 16,"grupo_id": 1,"categoria_id": 5,"nombre": "Hudson Roob","descripcion": "Fuga dolorem veniam sed repudiandae in in dolorem.","marca": "Dusty Langosh","url": "https://lorempixel.com/400/240/?94585","created_at": "2019-11-18 17:37:10","updated_at": "2019-11-18 17:37:10"}]
    notas: 'http://www.mocky.io/v2/5dd57bbd330000359ff381d6',

    obtenerUrl : function (mocky, resto=''){
        if(this.backEndHabilitado){
            console.log("Se esta utilizando el back-end");
            return this.UrlNgrok + resto;
        }else{
            console.log("Se esta utilizando el Mocky : " + mocky );
            return this[mocky];
        }
    }
}
