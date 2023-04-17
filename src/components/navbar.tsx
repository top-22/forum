import { useRouter } from "next/router";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "next/image";
import logo from "../public/Logo.svg";
import Link from "next/link";

const VerticalNavbar = () => {
  const router = useRouter();

  const navItems = [
    { path: "/room/1", label: "Raum 1" },
    { path: "/room/2", label: "Raum 2" },
  ];

  const isActive = (path: string) => {
    const currentPath = new URL(router.asPath, 'http://forum.jeschek.eu').pathname;
    return currentPath === path;
  };

  return (
    <Navbar bg="primary" className="d-flex flex-column vh-100 p-1">
      <Navbar.Brand
        as={Link}
        href="/"
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
      <Nav className="flex-column d-flex flex-grow-1 align-items-center">
        {/* nav items */}
        <Nav.Link as={Link} href="/" active={isActive("/")}>
          Home
        </Nav.Link>
        <Nav.Link
          as={Link}
          href="/room/join"
          active={isActive("/room/join")}
        >
          Entdecken
        </Nav.Link>
        <span className="border border-dark border-start-0 border-end-0 flex-grow-1 mx-auto w-75">
          {/* zentriert die Items */}
          <div className="d-flex flex-column align-items-center">
            {/* Listet alle Items zwischen Home und Einstellungen */}
            {navItems.map((item) => (
              <Nav.Link
                key={item.path}
                as={Link}
                href={item.path}
                active={isActive(item.path)}
              >
                {item.label}
              </Nav.Link>
            ))}
          </div>
        </span>
        <Nav.Link
          as={Link}
          href="/settings"
          active={isActive("/settings")}
        >
          Einstellungen
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default VerticalNavbar;
