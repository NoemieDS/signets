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

export default function FrmDossier({ ouvert, setOuvert }) {

  //Création de 3 états pour les 3 états de formulaire
  //Un état titre, qui démarre vide...
const [titre, setTitre] = useState('');
const [couverture, setCouverture] = useState('');
const [couleur, setCouleur] = useState('');

console.log("Le titre dans le formulaire : ", titre);

//Gestion de la fermeture du formulaire
  const gererFermer = () => {
    //c'est une expression de fonction assignée à une constante (variable)
    setOuvert(false);
  };

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
            //gestionnaire d'évènement 
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
          onChangeComplete={(evt) => setCouleur(evt.target.color)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={gererFermer}>Annuler</Button>
          <Button onClick={gererFermer}>Soumettre</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
