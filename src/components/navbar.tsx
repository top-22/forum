import { useRouter } from 'next/router';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from "next/image";
import { FunctionComponent } from "react";
import logo from "../public/Logo.svg";

interface NavbarProps {
  setShowSettings: (show: boolean) => void;
}

const VerticalNavbar: FunctionComponent<NavbarProps> = ({ setShowSettings }) => {
  const router = useRouter();

  return (
    <Navbar bg="light" className="d-flex flex-column vh-100">
      <Navbar.Brand onClick={() => router.push('/')} className="mx-auto" style={{ cursor: 'pointer' }}>
        <Image src={logo} alt="Logo" width={50} height={50} className="rounded"/>
      </Navbar.Brand>
      <Nav className="flex-column">
        {/* Add your nav items here */}
        <Nav.Link onClick={() => router.push('/')}>Home</Nav.Link>
        <Nav.Link onClick={() => router.push('room/1')}>Raum 1</Nav.Link>
        <Nav.Link onClick={() => router.push('room/2')}>Raum 2</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default VerticalNavbar;
