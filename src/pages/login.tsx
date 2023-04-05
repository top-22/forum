import { NextPage } from "next";
import Image from "next/image";
import Logo from "../public/TUC-farbig.png";
import { useState } from "react";
import { useRouter } from "next/router";

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      router.push("/");
    } else {
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="bg-dark vh-100 overflow-hidden d-flex align-items-center">
      <div className="row align-items-stretch">
        <div className="col-6 d-flex flex-column text-center justify-content-center align-items-center">
          <Image src={Logo} alt="TUC Logo" className="img-fluid w-50 mb-3" />
          <h1 className="text-primary mb-5">Willkommen beim TUC Forum!</h1>
          <h2 className="text-light mb-3">Du hast noch keinen Account?</h2>
          <button className="btn btn-primary align-self-center" type="button">
            Jetzt registrieren
          </button>
        </div>
        <div className="col-6 d-flex flex-column justify-content-end">
          <h1 className="text-light mb-3">Anmeldung</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control bg-light"
                id="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Passwort</label>
              <input
                type="password"
                className="form-control bg-light"
                id="password"
                value={password}
                placeholder="Passwort"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-primary align-self-start" type="submit">Login</button>
          </form>
          <a
              href=""
              className="text-light d-block mb-3 d-flex justify-content-end"
            >
              Passwort vergessen?
            </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
