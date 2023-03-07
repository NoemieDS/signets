import './Appli.scss';
import Entete from './Entete';
import ListeDossiers from './ListeDossiers';
import FrmDossier from './FrmDossier';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';

export default function Appli() {
  
  const [frmDossierOuvert, setFrmDossierOuvert] = useState(false);

  //État des dossiers de l'utilisateur
  /*
  Structure de la variable dossier pour le localStorage
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
  const [dossiers, setDossiers] = useState(
    ()=>JSON.parse(localStorage.getItem('4pa-dossiers')) || []
    );

    useEffect(
      () => localStorage.setItem('4pa-dossiers', JSON.stringify(dossiers))
      , [dossiers] //réécrit (update) les dossiers dans localStorage
    );
  

    function ajouterModifierDossier(id, titre, couverture, couleur, timestamp) {

      console.log("Recu du formulaire : ", id, titre, couverture, couleur, timestamp)

      //On copie le dossier et on le met dans setDossiers() de useState
      setDossiers( [...dossiers, 
        //Et on ajoute le nouveau dossier
        {
          id: id, 
          titre: titre, 
          couverture: couverture, 
          couleur: couleur, 
          dateModif: timestamp
        },
      ])
    };

//on passe les variables aux composants
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
