import { useRouter } from "next/router";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "next/image";
import { FunctionComponent } from "react";
import logo from "../public/Logo.svg";

interface NavbarProps {
  setShowSettings: (show: boolean) => void;
}

const VerticalNavbar: FunctionComponent<NavbarProps> = ({
  setShowSettings,
}) => {
  const router = useRouter();

  return (
    <Navbar bg="primary" className="d-flex flex-column vh-100">
      <Navbar.Brand
        onClick={() => router.push("/")}
        className="mx-auto"
        style={{ cursor: "pointer" }}
      >
        <Image
          src={logo}
          alt="Logo"
          width={50}
          height={50}
          className="rounded"
        />
      </Navbar.Brand>
      <Nav className="flex-column d-flex flex-column flex-grow-1">
        {/* nav items */}
        <Nav.Link onClick={() => router.push("/")} className="mx-auto">
          Home
        </Nav.Link>
        <hr className="mx-auto w-75" /> {/* Divider after Home */}
        <div className="flex-grow-1">
          <Nav.Link onClick={() => router.push("room/1")} className="mx-auto">
            Raum 1
          </Nav.Link>
          <Nav.Link onClick={() => router.push("room/2")} className="mx-auto">
            Raum 2
          </Nav.Link>
        </div>
        <hr className="mx-auto w-75" /> {/* Divider before Settings */}
        <Nav.Link onClick={() => setShowSettings(true)} className="mx-auto">
          Settings
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default VerticalNavbar;
