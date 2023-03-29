import './ListeDossiers.scss';
import Dossier from './Dossier';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, onSnapshot } from 'firebase/firestore'; 
import { useEffect } from 'react';
import firebaseConfig from '../code/fb-config';

export default function ListeDossiers({dossiers, setDossiers}) {
  
  
  function observerDossiers() {
    const app = initializeApp(firebaseConfig);
    const bd = getFirestore(app);
    onSnapshot(collection(bd, 'utilisateurs-signets', 'MXGU9ktauc62pKrnqhgl', 'dossiers'), 
      resultat => setDossiers(resultat.docs.map(
        doc => ({id: doc.id, ...doc.data()})
      ))
    );
  }

  useEffect(()=> {
    function chercherDossiers() {
      const app = initializeApp(firebaseConfig);
      const bd = getFirestore(app);
      getDocs(collection(bd, 'utilisateurs-signets', 'MXGU9ktauc62pKrnqhgl', 'dossiers')).then(
        resultat => setDossiers(resultat.docs.map(
          doc => ({id: doc.id, ...doc.data()})
        ))
      )
    }
    chercherDossiers();
  }, []);


  /**
   * Supprime un dossier de la collection
   * 
   * @param String idd : identifiant du dossier
   * @returns void
   */
  function supprimerDossier(idd) {
    setDossiers(dossiers.filter(dossier => dossier.id !== idd));
  }

  function modifierDossier(idd, titre, couverture, couleur, timestamp) {
    setDossiers(dossiers.map(
      dossier => {
        if(dossier.id === idd) {
          return ({
            id: dossier.id, 
            titre: titre, 
            couverture: couverture, 
            couleur: couleur,
            dateModif: timestamp
          });
        }
        return dossier;
      }
    ));
  }

  return (
      <section className="ListeDossiers">
        {
          // Si on a des dossiers ...
          dossiers.length > 0 ?
            // On les affiche :
            dossiers.map( 
              // Remarquez l'utilisation du "spread operator" pour "étaler" les 
              // propriétés de l'objet 'dossier' reçu en paramètre de la fonction
              // fléchée dans les props du composant 'Dossier' !!
              // On en parle en classe ;-)
              dossier =>  <Dossier key={dossier.id} {...dossier} supprimerDossier={supprimerDossier} modifierDossier={modifierDossier} />
            )
          // et sinon, on affiche un message ...
          : <div className='aucun-dossier'>Aucun dossier</div>
        }
      </section>
  );
}