import './Accueil.scss';
import logo from '../images/signet-logo.png';
import btnGoogle from '../images/google-btn.png';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuth } from '../code/init';

export default function Accueil () {

  function connexion() {
    signInWithPopup(auth, googleAuth);
  }

  return (
    <main className="Accueil">
      <section className="logo">
      <img src={logo} alt="Logo signets" />
      <div>Signets</div>
      </section>
    <section className="connexion">
    <button onClick={connexion}>Connexion avec Google</button>
    </section>
    </main>
  )
}