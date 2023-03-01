import './Dossier.scss'; 
import couvertureDefaut from '../images/couverture-defaut.png'
import IconButton from '@mui/material/IconButton';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';

export default function Dossier({id, titre, couverture, couleur, dateModif, supprimerDossier}) {
  return (
    // Remarquez l'objet JS donné à la valeur de l'attribut style en JSX, voir : 
    // https://reactjs.org/docs/dom-elements.html#style
    <article className="Dossier" style={{backgroundColor: couleur}}>
      <div className="couverture">
        <IconButton className="tourner" aria-label="Tourner" disableRipple={true} size="small">
          <ThreeSixtyIcon />
        </IconButton>
        <img src={couverture ? couverture: couvertureDefaut} alt={titre}/>
        <IconButton onClick={() =>supprimerDossier(id)} className="supprimer" aria-label="supprimer" size="small">
          <ClearIcon />
        </IconButton>
      </div>
      <div className="info">
        <h2>{titre}</h2>
        <p>Modifié : {dateModif}</p>
        <IconButton className="modifier" aria-label="modifier" size="small">
          <EditIcon />
        </IconButton>
      </div>
    </article>
  );
}