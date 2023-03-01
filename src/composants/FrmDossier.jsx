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

export default function FrmDossier({ ouvert, setOuvert, actionDossier}) {

  //Création de 3 états pour les 3 états de formulaire
  //Un état titre, qui démarre vide...
const [titre, setTitre] = useState('');
const [couverture, setCouverture] = useState('');
const [couleur, setCouleur] = useState('#000');

console.log("Le titre dans le formulaire : ", titre);
console.log("La couverture : ", couverture);
console.log("La couleur : ", couleur);

//Gestion de la fermeture du formulaire
  const gererFermer = () => {
    //c'est une expression de fonction assignée à une constante (variable)

    //reinitialiser le formulaire / les variables d'état
   // form[0].reset(); si c'était en JS avec le DOM
    setTitre('');
    setCouverture('');
    setCouleur('');
    //Changer le bool 
    setOuvert(false);
  };

function gererActionDossier () {
  let date = new Date();
  let id = 'ds_' + date.getTime() + Math.random();
  actionDossier(id, titre, couverture, couleur, date.toJSON()) //titre, couverture, couleur sont dans useState (form)

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
          />
          <TwitterPicker
          triangle='hide'
          width='auto'
          color={'#ff000'}
          colors={['#0f0', '#00f', '#036', '#960']}
        //onChangeComplete={ (clr, evt) => console.log(clr, evt)}
          onChangeComplete={clr=> setCouleur(clr.hex)}
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
