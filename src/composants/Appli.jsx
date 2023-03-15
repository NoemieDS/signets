import './Appli.scss';
import Entete from './Entete';
import ListeDossiers from './ListeDossiers';
import FrmDossier from './FrmDossier';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import firebaseConfig from "../code/fb-config";

export default function Appli() {
  
  const [frmDossierOuvert, setFrmDossierOuvert] = useState(false);

  //État des dossiers de l'utilisateur
  /*
  Structure de la variable dossiers 
  [
    {
      id: '4565856987', 
      titre: 'Politique', 
      couverture:'http://web.com', 
      couleur: '#600', 
      dateModif: '2023-03-01t12:43:67.234z'
    },
    {id: '2555856987', titre: 'Théâtre', couverture:'http://web.com', couleur: '#600', dateModif: '2023-03-01t12:43:67.234z'},
    {id: '5665856987', titre: 'Mathématique', couverture:'http://web.com', couleur: '#600', dateModif: '2023-03-01t12:43:67.234z'},
  ]

  */

  //État des dossiers de l'utilisateur, lire dans localStorage ou initié un []
  //Lire les dossiers dans le localStorage
  const [dossiers, setDossiers] = useState([]);

    useEffect(
      () => localStorage.setItem('4pa-dossiers', JSON.stringify(dossiers))
      , [dossiers] //réécrit (update) les dossiers dans localStorage
    );
  

    function ajouterModifierDossier(titre, couverture, couleur, dateModif) {

      const app = initializeApp(firebaseConfig);
      const bd = getFirestore(app);
      const idDossier = doc(collection(bd, 'dossiers')); //un path qui n'existe pas, il va retourner un new doc avec un newid
      const dossierData = {titre, couverture, couleur, couleur, dateModif}; //va faire étiquettes et valeur aux même nom
      setDoc(idDossier, dossierData).then( //setDoc doit être asynchrone et on veut agir que quand c'est complété
      () => setDossiers([...dossiers, {id: idDossier, ...dossierData}])  //splice le tableau et ajouter un nouvel objet mais manque le ID    
      );}

  return (
    <div className="Appli">
        <Entete />
        <section className="contenu-principal">
          <ListeDossiers dossiers={dossiers} setDossiers={setDossiers}/> 
          <FrmDossier ouvert={frmDossierOuvert} setOuvert=
          {setFrmDossierOuvert} actionDossier={ajouterModifierDossier}/>
          <Fab onClick={() => setFrmDossierOuvert(true)} size="large" className="ajoutDossier" color="secondary" aria-label="Ajouter dossier">
            <AddIcon />
          </Fab>
        </section>
    </div>
  );
}
