/* import * as React from 'react'; ça importe tout et on veut pas*/
import './FrmDossier.scss';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TwitterPicker } from 'react-color';
import { useState } from 'react';

//actionDossier c'est pour modifierDossier dans Dossier
export default function FrmDossier({ouvert, setOuvert, actionDossier, id_p=null, titre_p='', couverture_p='', couleur_p='#000'}) {

  //Création de 3 états pour les 3 états de formulaire
  //Un état titre, qui démarre vide...
const [titre, setTitre] = useState(titre_p);
const [couverture, setCouverture] = useState(couverture_p);
const [couleur, setCouleur] = useState(couleur_p); //valeur par défaut de l'état de modification ??

//Gestion de la fermeture du formulaire
  const gererFermer = () => {
    //c'est une expression de fonction assignée à une constante (variable)

    //reinitialiser le formulaire / les variables d'état
   // form[0].reset(); si c'était en JS avec le DOM
    setTitre(titre_p);
    setCouverture(couverture_p);
    setCouleur(couleur_p);
    //Changer le bool 
    setOuvert(false);
  };

function gererActionDossier () {
  let timestamp = new Date().getTime();
  actionDossier(titre, couverture, couleur, timestamp) //titre, couverture, couleur sont dans useState (form)

  //Fermer la boite de dialogue
  gererFermer();
}

 return (
    <div className="FrmDossier">
      <Dialog open={ouvert} onClose={gererFermer}>
        <DialogTitle>Ajouter / Modifier Dossier</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="titre"
            label="titre du dossier"
            type="text"
            fullWidth
            variant="standard"
            //gestionnaire d'évènement, onChange est le addEventListener de React
            onChange={(evt) => setTitre(evt.target.value)} 
            value={titre}
          />
          <TextField
            margin="dense"
            id="couverture"
            label="Image couverture du dossier"
            type="url"
            fullWidth
            variant="standard"
            //gestionnaire d'évènement 
           onChange={(evt) => setCouverture(evt.target.value)}
           value={couverture}
          />
          <TwitterPicker
          triangle='hide'
          width='auto'
          color={'#ff000'}
          colors={['#05668D', '#028090', '#00A896', '#02C39A', '#32965D']}
        //onChangeComplete={ (clr, evt) => console.log(clr, evt)}
          onChangeComplete={clr=> setCouleur(clr.hex)}
          value={couleur}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={gererFermer}>Annuler</Button>
          <Button onClick={gererActionDossier}>Soumettre</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
