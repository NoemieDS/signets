import "./ListeDossiers.scss";
import Dossier from "./Dossier";
import { initializeApp } from 'firebase/app';
import { collection, getDoc, getDocs, getFirestore, onSnapshot } from 'firebase/firestore';
import { useEffect } from "react";
import firebaseConfig from "../code/fb-config";


export default function ListeDossiers({ dossiers, setDossiers }) {

function chercherDossiers() {
  const app = initializeApp(firebaseConfig);
  const bd = getFirestore(app);
 /*  const dossiersFS = getDocs(collection(bd, 'dossiers')).then(
    resultat => console.log('résultas retournés par getDocs()', resultat.docs[0].id)
  ) */
/*   const dossiersFS = getDocs(collection(bd, 'dossiers')).then(
    resultat => console.log('résultas retournés par getDocs()', resultat.docs[0].data)
  ) */
  getDocs(collection(bd, 'dossiers')).then(
    resultat => setDossiers(resultat.docs.map( //manque le ID 
      doc => ({id: doc.id, ...doc.data()})
    ))
  )
}

function observerDossiers() {
  const app = initializeApp(firebaseConfig);
  const bd = getFirestore(app);
  onSnapshot(collection(bd, 'dossiers'), //onsnapshot est un écouteur, prend 2 arguments, quoi écouter (query), 2 une fonction, quoi faire)
  resultat => setDossiers(resultat.docs.map(
    doc => ({id: doc.id, ...doc.data()})
  ))
  );
}



/*Appel une seule fois, setDossiers doit lire une seule fois*/
useEffect(observerDossiers, []);


  /**
   * Supprime un dossier de la collection de dossiers
   *
   * @param string id : identifiant du dossier
   * return void
   */

  function supprimerDossier(idd) {
    setDossiers(dossiers.filter((dossier) => dossier.id !== idd));
  }

  //l'action arrive ici même si le bouton est dans le composant dossier
  function modifierDossier(idd, titre, couverture, couleur, timestamp) {
    setDossiers(
      dossiers.map((dossier) => {
        if (dossier.id === idd) {
          return {
            id: dossier.id,
            titre: titre,
            couverture: couverture,
            couleur: couleur,
            dateModif: timestamp,
          };
        }
        //else mais pas besoin de l'écrire car une fonction retourne qu'une instruction
        //et retourne un nouveau tableau pour pas mêler des données avec l'ancien?
        return dossier;
      })
    );
  }

  return (
    
    dossiers.length>0 ?
    <section className="ListeDossiers">
      {
      dossiers.map(
        // Remarquez l'utilisation du "spread operator" pour "étaler" les
        // propriétés de l'objet 'dossier' reçu en paramètre de la fonction
        // fléchée dans les props du composant 'Dossier' !!
        // {...dossier} va prendre les étiquettes
        (dossier) => (
          <Dossier
            key={dossier.id}
            {...dossier}
            supprimerDossier={supprimerDossier}
            modifierDossier={modifierDossier}
          />
        )
      )}
    </section>
    :
    <div>
      <p>Y a rien</p>
    </div>
  );
}
