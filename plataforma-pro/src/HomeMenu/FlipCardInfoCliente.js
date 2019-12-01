import RecipeImg from '../img/RecipeCard.jpg';
import ActividadesCardImg from '../img/actividadesCard.jpg';
import ProductosCardImg from '../img/ProductsCard.jpg';
import ProgressImg from '../img/ProgressCard.jpg';
import DudasCardImg from '../img/dudasCard.jpg';

const firstRowCliente = [
    {menuValue: "activities", titulo: 'Administre sus actividades e historial', descripcion:'Nutrihome almacena los datos de todas sus actividades y los asocia automaticamente a su cuenta. Con un diseño ligero y simple de entender, tomar decisiones en base a las especificaciones del nutricionista nunca fue mas sencillo', imagen: ActividadesCardImg,},
    {menuValue: "productos", titulo: 'Consulte los productos disponibles', descripcion: 'Diseñe una dieta de forma elegante y cohesiva utilizando los productos incluidos con Nutrihome. Facil y rapido, nuestro diseño se asegura de que el paciente entienda lo que tiene asignado', imagen: ProductosCardImg,},
    {menuValue: "recetas", titulo: 'Deleitese con recetas a su medida', descripcion: 'Nuestra base de datos contiene varias recetas cargadas por sus nutricionistas que puede utilizar', imagen: RecipeImg,},
];

const secondRowCliente = [
    {menuValue: "profile", titulo: 'Vea su progreso desde el perfil', descripcion: 'Nutrihome provee las herramientas para facilitar y optimizar la revision del progreso que lleva a cabo con su nutricionista. Independicese de las aplicaciones o paginas externas y facilite su progreso', imagen: ProgressImg,},
    {menuValue: "home", titulo: 'Resuelva cualquier duda sobre el sitio', descripcion: 'Si tiene alguna cuestion relacionada con el funcionamiento de Nutrihome le recomendamos chequear nuestro FAQ, el mismo contiene las preguntas y respuestas mas generales y comunes que puede utilizar para resolver sus dudas', imagen: DudasCardImg,},
];

export { firstRowCliente , secondRowCliente };