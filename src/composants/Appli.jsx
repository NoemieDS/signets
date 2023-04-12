import Accueil from './Accueil';
import PageUtilisateur from './PageUtilisateur';
import './Appli.scss';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, bd } from '../code/init';
import { doc, setDoc } from 'firebase/firestore';
import { observerEtatConnexion } from '../code/utilisateur-modele';

export default function Appli() {
    // État de connexion d'un utilisateur
    const [utilisateur, setUtilisateur] = useState(null);

    useEffect(
        () => observerEtatConnexion(setUtilisateur),
        []
    );

    return (
        utilisateur ? <PageUtilisateur utilisateur={utilisateur} /> : <Accueil/> 
    );
}