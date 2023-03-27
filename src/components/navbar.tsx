import { NextPage } from 'next';
import Link from 'next/link'

interface NavbarProps {
  setShowSettings: (show: boolean) => void;
}

const Navbar:NextPage<NavbarProps> = ({ setShowSettings }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link href="/">
          <span className="navbar-brand">TUC Forum</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
               <Link className="nav-link" href="room/1">Room 1</Link>
            </li>
            <li className="nav-item">
               <Link className="nav-link" href="room/2">Room 2</Link>
            </li>
            <li className="nav-item">
               <Link className="nav-link" href="room/3">Room 3</Link>
            </li>
            <li className="nav-item">
               <Link className="nav-link" href="room/4">Room 4</Link>
            </li>
            <li className="nav-item">
               <Link className="nav-link" href="room/5">Room 5</Link>
            </li>
            <li className="nav-item" onClick={() => setShowSettings(true)}>
                <span className="nav-link">Settings (user icon)</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
