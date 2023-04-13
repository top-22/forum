import Image from "next/image";
import Logo from "../public/TUC-einfarbig.png";
import { useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps, NextPage } from "next";
import { parse } from "cookie";

const RegisterPage: NextPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!name) {
      setError("Please fill out the name field.");
      return;
    }

    if (!username) {
      setError("Please fill out the username field.");
      return;
    }

    if (!email) {
      setError("Please fill out the email field.");
      return;
    }

    if (!password) {
      setError("Please fill out the password field.");
      return;
    }

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
        repeatPassword,
      }),
    });

    if (response.ok) {
      // const data = await response.json();
      router.push("/");
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
        <h1 className="text-light mb-3">Registrierung</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="name"></label>
            <input
              type="text"
              className="form-control bg-light"
              id="name"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="username"></label>
            <input
              type="text"
              className="form-control bg-light"
              id="username"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="repeatPassword"></label>
            <input
              type="password"
              className="form-control bg-light"
              id="repeatPassword"
              value={repeatPassword}
              placeholder="Repeat Password"
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <button className="btn btn-primary" type="submit">
              Registrieren
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
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.headers.cookie
    ? parse(context.req.headers.cookie)
    : {};
  const isAuthenticated = !!cookies.authToken;
  // const nextPath = context.query.next as string || "/";

  if (isAuthenticated) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default RegisterPage;
