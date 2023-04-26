import "./Dossier.scss";
import couvertureDefaut from "../images/couverture-defaut.jpg";
import IconButton from "@mui/material/IconButton";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import FrmDossier from "./FrmDossier";
import { useContext, useState } from "react";
import { creer } from '../code/signet-modele';
import { UtilisateurContext } from './Appli';

export default function Dossier({
  id,
  titre,
  couverture,
  couleur,
  dateModif,
  top3,
  supprimerDossier,
  modifierDossier,
}) {

    // Récupérer l'utilisateur connecté du contexte
    const uid = useContext(UtilisateurContext).uid;
   
  //État des signets dans ce dossier
  const [signets, setSignets] = useState(top3 || []);

  // État d'ouverture du formulaire
  const [frmDossierOuvert, setFrmDossierOuvert] = useState(false);

  const [contenuDossierVisible, setContenuDossierVisible] =useState(false);

//Gérer les évènements Glisser/Déposer

//État zone de dépçot du dossier
const [zd, setZd] = useState(false)


function gererDragEnter(evt) {
  evt.dataTransfer.effectAllowed = 'link';
  evt.preventDefault();
  setZd(true);
  console.log('Entre...');
}

function gererDragOver(evt) {
  evt.preventDefault();
}

function gererDragLeave(evt) {
  //console.log('target', evt.target);
  //console.log('current target', evt.currentTarget);
  //console.log('relatedTarget', evt.relatedTarget)
  if(evt.currentTarget.contains(evt.relatedTarget)) {
  return;
 }
 setZd(false);
// console.log('Entre...');
 }

async function gererDrop(evt) {
  const url= evt.dataTransfer.getData('URL');
  evt.preventDefault();
  //console.log('Données déposées ', url)
  setZd(false);
  setContenuDossierVisible(true);

//Chercher le titre associé à l'url
 // Ce code est problématique à cause de SOP : Same Origin Policy
 //Comme SOP est trop restrictif, on peut permettre certaines requêtes HTTP d'origines différentes
 //sous certaines conditions, avec le concept CORS : Cross Origin Resource Sharing
const reponseUrl = await fetch('https://cors-anywhere.herokuapp.com/' + url);
const reponseTexte = await reponseUrl.text();
//console.log(reponseTexte);
//On instancie un parseur DOM en JS et on lui donne la réponse en input

//SOLUTION 1 : avec un parseaur DOM 
const doc = new DOMParser().parseFromString(reponseTexte, "text/html");
const titre = doc.querySelectorAll('title')[0].innerText;

//SOLUTION 2 : avec appariement des formes (Pattern Matching)
//search, replace, match des fonctions JS 
//const resultat = reponseTexte.match(/<title>(.*)<\/title>/i)[1]
//console.log('match du title :', resultat);

//console.log('Titre', titre);

//titre = resultat;

  ajouterSignet(id, url, titre);
}

async function ajouterSignet(idDossier, urlSignet, titreSignet) {
  const derniers3 = [...signets, {url: urlSignet, titre: titreSignet}].slice(-3);
  await creer(uid, idDossier, derniers3);
  setSignets(derniers3);
}

  return (
    // Remarquez l'objet JS donné à la valeur de l'attribut style en JSX, voir :
    // https://reactjs.org/docs/dom-elements.html#style
    <article 
    className={"Dossier"
    +(contenuDossierVisible ? ' actif' : '') 
    +(zd ? ' zd' : '')
  } 
    style={{ backgroundColor: couleur }}
    onDragEnter={gererDragEnter} //évènement de html 5, pas de react (on drag, on drop, etc)
    onDragOver={gererDragOver}
    onDrop={gererDrop}
    onDragLeave={gererDragLeave}
    >
    
      <div className="carte">
       
        <div className="endroit">
        
          <div className="couverture">
            <IconButton onClick={()=> setContenuDossierVisible(true)}
              className="tourner"
              aria-label="Tourner"
              disableRipple={true}
              size="small"
            >
              <ThreeSixtyIcon />
            </IconButton>
            <img
              src={couverture ? couverture : couvertureDefaut}
              alt={titre}
              onError={(evt) => (evt.target.src = couvertureDefaut)}
            />
            <IconButton
              onClick={() => supprimerDossier(id)}
              className="supprimer"
              aria-label="supprimer"
              size="small"
            >
              <ClearIcon />
            </IconButton>
          </div>
          <div className="info">
            <h2>{titre}</h2>
            <p>
              Modifié :{" "}
              {new Date(dateModif).toLocaleDateString("fr-CA", {
                dateStyle: "long",
              })}
            </p>
            <IconButton
              onClick={() => setFrmDossierOuvert(true)}
              className="modifier"
              aria-label="modifier"
              size="small"
            >
              <EditIcon />
            </IconButton>
            <FrmDossier
              ouvert={frmDossierOuvert}
              setOuvert={setFrmDossierOuvert}
              actionDossier={modifierDossier}
              id_p={id}
              titre_p={titre}
              couverture_p={couverture}
              couleur_p={couleur}
            />
          </div>
        </div>
        
        <div className="envers">
        <IconButton onClick={()=> setContenuDossierVisible(false)}
              className="tourner"
              aria-label="Tourner"
              disableRipple={true}
              size="small"
            >
              <ThreeSixtyIcon />
            </IconButton>
            {
              signets.map(
                (signet, position) => <a key={position} href={signet.url} target='_blank'>
                {signet.titre}
                </a>
              )
            }
            
        </div>
      </div>
    </article>
  );
}
