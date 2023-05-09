import Layout from "../components/layout";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import Avatar from "../public/avatar.png";
import { useRouter } from "next/router";
import { useState, useEffect, FunctionComponent } from "react";
import { serialize, parse } from "cookie";
import { Room } from "@prisma/client";

const Settings = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const handleLogout = () => {
    document.cookie = serialize("authToken", "", {
      maxAge: -1,
      path: "/",
    });
    document.cookie = serialize("username", "", {
      maxAge: -1,
      path: "/",
    });
    router.push("/login");
  };

  const [username, setUsername] = useState("");
  useEffect(() => {
    const cookies = parse(document.cookie);
    setUsername(cookies.username || "");
  }, []);

  const joinedRooms: Room[] = [];
  {
    /* Statt dieser leerdeffinition müssen hier die Räume angezeigt werden */
  }

  return (
    <Layout rooms={joinedRooms}>
      <div className="bg-dark d-flex flex-column vh-100 justify-content-center align-items-center w-100">
        <Button
          onClick={goBack}
          className="position-absolute top-0 end-0 mt-3 me-3"
        >
          X
        </Button>
        <Image
          src={Avatar}
          alt="profile picture"
          className="img-fluid w-25 mb-3"
        />
        <h4 className="text-light mb-3 mx-auto">{username}</h4>
        <Button className="mb-3 w-25">Einstellungen</Button>
        <Button className="mb-3 w-25">Darkmode</Button>
        <Button className="mb-3 w-25" onClick={handleLogout}>
          Abmelden
        </Button>
      </div>
    </Layout>
  );
};

export default Settings;
