import { collection, deleteDoc, doc, getDocs, limit, where, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { bd, collDossiers, collUtilisateurs } from "./init";

// ajouter un dossier
export async function creer(idUtil, infoDossier) {
    const refDossier = doc(collection(bd, collUtilisateurs, idUtil, collDossiers));
    await setDoc(refDossier, infoDossier);
    return refDossier.id;
}

// lire les dossiers
export async function lireTout(idUtil) {
    const dossiersFS = await getDocs(
        query(
            collection(bd, collUtilisateurs, idUtil, collDossiers),
           // where('dateModif', '<', '454554454454556564'),
            orderBy('dateModif', 'desc'),
            orderBy('titre', 'asc'),
            //limit(5)    
        )
    );
    return dossiersFS.docs;
}

// modifier un dossier
export async function modifier(idUtil, idDossier, infoDossier) {
    // Utiliser updateDoc
    const refDossier = doc(bd, collUtilisateurs, idUtil, collDossiers, idDossier);
    await updateDoc(refDossier, infoDossier);
}

// supprimer un dossier
export async function supprimer(idUtil, idDossier) {
    const refDossier = doc(bd, collUtilisateurs, idUtil, collDossiers, idDossier);
    await deleteDoc(refDossier);
}