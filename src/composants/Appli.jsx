import { useEffect, useState } from 'react';
import './Appli.scss';
import PageUtilisateur from './PageUtilisateur';
import Accueil from './Accueil';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../code/init';
import { setDoc } from 'firebase/firestore';

export default function Appli() {
//État de connexion d'un utilisateur
const [utilisateur, setUtilisateur] = useState(null); //qq pas loggué, état utilisateur est null 

useEffect(
  () => onAuthStateChanged(auth, u => {
  /*  if(u) {
      // créer le document correspondant à cet utilisateur dans Firestore
      setDoc(u.uid, {
        nom: u.displayName,
        courriel: u.email,
        avatar: u.photoURL
      }, {merge: true});
    } */
    setUtilisateur(u); 
    console.log("Utilisateur retourné par Auth : ", u);
    }),
    [] //dépendance, empêche que le useEffect boucle, là seulement au load
);

return (
utilisateur ? <PageUtilisateur utilisateur={utilisateur}/> : <Accueil/>
);
}