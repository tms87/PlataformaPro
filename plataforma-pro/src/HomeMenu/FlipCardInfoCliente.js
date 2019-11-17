import PacienteCardImg from '../img/pacientescard.jpg';
import ActividadesCardImg from '../img/actividadesCard.jpg';
import PlantillasCardImg from '../img/plantillasCard.png';
import ProductosCardImg from '../img/productosCard.jpg';
import ComunicacionCardImg from '../img/comunicacionCard.jpg';
import DudasCardImg from '../img/dudasCard.jpg';

const firstRowCliente = [
    {titulo: 'Organice sus pacientes', descripcion:'Nutrihome almacena los datos de todos sus pacientes y los asocia automaticamente a su cuenta. Con un diseño ligero y simple de entender, tomar decisiones en base a las especificaciones del paciente nunca fue mas sencillo', imagen: PacienteCardImg,},
    {titulo: 'Cree y asigne actividades', descripcion: 'Diseñe una dieta de forma elegante y cohesiva utilizando las herramientas de administracion de actividades incluidas con Nutrihome. Facil y rapido, nuestro diseño se asegura de que el paciente entienda lo que tiene asignado', imagen: ActividadesCardImg,},
    {titulo: 'Utilice plantillas para facilitar su trabajo', descripcion: 'Nuestra base de datos contiene varias plantillas precargadas que puede utilizar para generar actividades de distintas categorias, al mismo tiempo que usted puede crear sus propios templates y utilizarlos para la creacion de actividades repetidas', imagen: PlantillasCardImg,},
];

const secondRowCliente = [
    {titulo: 'Administre productos que consultaran sus pacientes', descripcion: 'Nuestra lista de productos contiene varias comidas y bebidas que puede integrar dentro de las dietas de los clientes. Desde nuestra pagina usted podra encontrar informacion que le servira al paciente a la hora de conseguir las comidas para su dieta', imagen: ProductosCardImg,},
    {titulo: 'Comuniquese con sus pacientes', descripcion: 'Ya sea comentarios, reviews, notas, logs de actividades, etc. Nutrihome provee varias herramientas para facilitar y optimizar la comunicacion con sus pacientes. INdependicese de las aplicaciones o paginas externas y facilite el contacto con su cliente', imagen: ComunicacionCardImg,},
    {titulo: 'Resuelva cualquier duda sobre el sitio', descripcion: 'Si tiene alguna cuestion relacionada con el funcionamiento de Nutrihome le recomendamos chequear nuestro FAQ, el mismo contiene las preguntas y respuestas mas generales y comunes que puede utilizar para resolver sus dudas', imagen: DudasCardImg,},
];

export { firstRowCliente , secondRowCliente };