import './ListeDossiers.scss';
import Dossier from './Dossier';

export default function ListeDossiers({dossiers, setDossiers}) {

  /**
   * Supprime un dossier de la collection de dossiers
   * 
   * @param string id : identifiant du dossier
   * return void
   */

  function supprimerDossier(idd) {
    setDossiers(dossiers.filter(dossier=> dossier.id !== idd));
  }

  //l'action arrive ici même si le bouton est dans le composant dossier
  function modifierDossier(idd, titre, couverture, couleur) {
    setDossiers(dossiers.map(
      dossier => {
        if(dossier.id === idd) {
          return ({
            id: dossier.id, 
            titre: titre, 
            couverture: couverture, 
            couleur: couleur,
            dateModif: (new Date()).toJSON()
          });
        }
        //else mais pas besoin de l'écrire car une fonction retourne qu'une instruction
        //et retourne un nouveau tableau pour pas mêler des données avec l'ancien?
        return {dossier};
      }
    ));
  }

  return (
    <ul className="ListeDossiers">
      {
        dossiers.map( 
          // Remarquez l'utilisation du "spread operator" pour "étaler" les 
          // propriétés de l'objet 'dossier' reçu en paramètre de la fonction
          // fléchée dans les props du composant 'Dossier' !!
          // {...dossier} va prendre les étiquettes 
          dossier =>  <li key={dossier.id}>
                      <Dossier {...dossier} supprimerDossier={supprimerDossier} />
        </li>
        )
      }
    </ul>
  );
}
