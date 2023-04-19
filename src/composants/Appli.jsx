import Accueil from './Accueil';
import PageUtilisateur from './PageUtilisateur';
import './Appli.scss';
import { useEffect, useState, createContext } from 'react';
import { observerEtatConnexion } from '../code/utilisateur-modele';

//On crée une variable "globale" qui pourra être partagé avec toute une 
//hierarchie de composants d'un seul coup
export const UtilisateurContext = createContext(null);


export default function Appli() {
    // État de connexion d'un utilisateur
    const [utilisateur, setUtilisateur] = useState(null);

    useEffect(
        () => observerEtatConnexion(setUtilisateur),
        []
    );

    return (
        utilisateur 
        ? 
        //On partage la variable de contexte avec le composant PageUtilisateur
        //et tous ses descendants
        <UtilisateurContext.Provider value={utilisateur}>  
        <PageUtilisateur /> 
        </UtilisateurContext.Provider>
        : 
        <Accueil/> 
    );
}