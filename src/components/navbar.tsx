import { useRouter } from "next/router";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "next/image";
import logo from "../public/Logo.svg";
import Link from "next/link";

const VerticalNavbar = () => {
  const router = useRouter();

  const navItems = [
    { path: "/room/1", label: "Page 1" },
    { path: "/room/2", label: "Page 2" },
  ];

  const isActive = (path: string) => {
    return router.asPath === path;
  };

  return (
    <Navbar bg="primary" className="d-flex flex-column vh-100">
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
      <Nav className="flex-column d-flex flex-grow-1">
        {/* nav items */}
        <Nav.Link as={Link} href="/" active={isActive("/")} className="mx-auto">
          Home
        </Nav.Link>
        <Nav.Link
          as={Link}
          href="/room/join"
          active={isActive("/room/join")}
          className="mx-auto"
        >
          Entdecken
        </Nav.Link>
        <hr className="mx-auto w-75" /> {/* Trenner nach Home */}
        {/* sorgt dafür dass Settings ganz unten ist*/}
        <div className="flex-grow-1">
          {/* zentriert die Items */}
          <div className="d-flex flex-column align-items-center">
            {/* Listet alle Items zwischen Home und Einstellungen */}
            {navItems.map((item) => (
              <Nav.Link
                key={item.path}
                as={Link}
                href={item.path}
                active={isActive(item.path)}
                className="mx-auto"
              >
                {item.label}
              </Nav.Link>
            ))}
          </div>
        </div>
        <hr className="mx-auto w-75" /> {/* Trenner vor Einstellungen */}
        <Nav.Link
          as={Link}
          href="/settings"
          active={isActive("/settings")}
          className="mx-auto"
        >
          Einstellungen
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default VerticalNavbar;
