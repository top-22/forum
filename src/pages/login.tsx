import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Logo from "../public/TUC-einfarbig.png";
import { useState } from "react";
import { useRouter } from "next/router";
import { parse } from "cookie";

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setError("Please fill out the email field.");
      return;
    }

    if (!password) {
      setError("Please fill out the password field.");
      return;
    }

    setError("");

    if (!email) {
      setError("Please fill out the email field.");
      return;
    }

    if (!password) {
      setError("Please fill out the password field.");
      return;
    }

    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const nextPath = (router.query.next as string) || "/";
      router.push(nextPath);
    } else {
      const data = await response.json();
      setError(data.message);
    }
  };

  return (
    <div className="bg-dark vh-100 overflow-hidden d-flex align-items-center">
      <div
        className="col-6 d-flex flex-column justify-content-end mx-auto"
        style={{ width: "400px" }}
      >
        <Image
          src={Logo}
          alt="Logo"
          width={250}
          className="mx-auto d-block mb-4"
        />
        <h1 className="text-light mb-3">Anmeldung</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="email"></label>
            <input
              type="email"
              className="form-control bg-light"
              id="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="password"></label>
            <input
              type="password"
              className="form-control bg-light"
              id="password"
              value={password}
              placeholder="Passwort"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3 d-flex align-items-center justify-content-between">
            <button className="btn btn-primary align-self-start" type="submit">
              Anmelden
            </button>
            <div style={{ display: "flex", alignItems: "center" }}>
              {error && (
                <p className="text-light d-flex align-self-center mb-0 ml-auto">
                  {error}
                </p>
              )}
            </div>
          </div>
        </form>
        <div style={{ marginTop: "1rem" }}>
          <div className="d-flex justify-content-center">
            <a className="text-light d-block mb-3 d-flex justify-content-end">
              Passwort vergessen?
            </a>
          </div>
          <div className="d-flex justify-content-center">
            <span className="text-light d-block mb-3 d-flex justify-content-end">
              Noch keinen Account?&nbsp;
            </span>
            <a
              className="text-light d-block mb-3 d-flex justify-content-end"
              style={{ textDecoration: "underline" }}
              type="button"
              onClick={() => router.push("/register")}
            >
              Jetzt registrieren
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.headers.cookie
    ? parse(context.req.headers.cookie)
    : {};
  const isAuthenticated = !!cookies.authToken;
  const nextPath = (context.query.next as string) || "/";

  if (isAuthenticated) {
    return {
      redirect: {
        destination: `/${nextPath}`,
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default LoginPage;
