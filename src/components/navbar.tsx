import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "next/image";
import logo from "../public/Logo.svg";
import Link from "next/link";
import { useState, useEffect, FunctionComponent } from "react";
import { parse } from "cookie";
import { Room } from "@prisma/client";

interface VerticalNavbarProps {
  Navrooms: Room[];
}

const VerticalNavbar: FunctionComponent<VerticalNavbarProps> = ({
  Navrooms,
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isActive = (path: string) => {
    return mounted ? window.location.pathname === path : false;
  };

  const [username, setUsername] = useState("");
  useEffect(() => {
    const cookies = parse(document.cookie);
    setUsername(cookies.username || "");
  }, []);

  return (
    <Navbar
      bg="primary"
      className="d-flex flex-column vh-100 p-1 align-items-center"
    >
      <Navbar.Brand
        as={Link}
        href="/"
        className="m-0"
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
      <Nav className="flex-column d-flex flex-grow-1 align-items-center">
        {/* nav items */}
        <Nav.Link as={Link} href="/" active={isActive("/")}>
          Home
        </Nav.Link>
        <Nav.Link as={Link} href="/room/join" active={isActive("/room/join")}>
          Entdecken
        </Nav.Link>
        <span className="border border-dark border-start-0 border-end-0 flex-grow-1 mx-auto w-75">
          {/* zentriert die Items */}
          <div className="d-flex flex-column align-items-center">
            {/* Listet alle Items zwischen Home und Einstellungen */}
            {Navrooms.map((room) => (
              <Nav.Link
                key={room.id}
                as={Link}
                href={`/room/${room.id}`}
                active={isActive(`/room/${room.id}`)}
                className="text-center"
              >
                {room.name}
              </Nav.Link>
            ))}
          </div>
        </span>
        <Nav.Link as={Link} href="/settings" active={isActive("/settings")}>
          {username}
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default VerticalNavbar;
