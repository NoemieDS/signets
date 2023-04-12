import './Accueil.scss';
import logo from '../images/signets-logo.png';
import btnGoogle from '../images/btn-connexion-google.png';
import { connexion } from '../code/utilisateur-modele';

export default function Accueil() {

	return (
		<main className="Accueil">
			<section className="logo">
				<img src={logo} alt="Logo Signets" />
				<div>Signets</div>
			</section>
			<section className="connexion">
				<button onClick={connexion}>Connexion avec Google</button>
			</section>
		</main>
	)
}