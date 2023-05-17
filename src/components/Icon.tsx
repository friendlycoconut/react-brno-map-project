import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconMarker from '../components/iconChange.png'
import iconRetina from '../components/iconChange.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const iconPerson = new L.Icon({

    iconUrl: iconMarker,
    iconRetinaUrl: iconRetina,
    iconShadow: iconShadow,
    
   
    iconSize: new L.Point(30, 25)
});

export { iconPerson };