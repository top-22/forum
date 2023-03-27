import { NextPage } from 'next';
import Image from 'next/image'
import Logo from '../public/TUC-farbig.png';

const Login:NextPage = () => {
  return (
    <div className="bg-dark vh-100 overflow-hidden d-flex align-items-center">
      <div className="row align-items-stretch">
        <div className="col-6 d-flex flex-column text-center justify-content-center align-items-center">
          <Image src={Logo} alt="TUC Logo" className="img-fluid w-50 mb-3" />
          <h4 className="text-primary mb-5">Willkommen beim TUC Forum!</h4>
          <h5 className="text-light mb-3">Du hast noch keinen Account?</h5>
          <button className="btn btn-primary align-self-center" type="button">Jetzt registrieren</button>
        </div>
        <div className="col-6 d-flex flex-column justify-content-end">
          <h4 className="text-light mb-3">Anmeldung</h4>
          <div className="form-group mb-3 w-50">
            <input type="email" className="form-control bg-light" placeholder="Email" />
          </div>
          <div className="form-group mb-3 w-50">
            <input type="password" className="form-control bg-light" placeholder="Passwort" />
            <a href="" className="text-light d-block mb-3 d-flex justify-content-end">Passwort vergessen?</a>
          </div>
          <button className="btn btn-primary align-self-start" type="button">Jetzt anmelden</button>
        </div>
      </div>
    </div>
  );
};

export default Login
