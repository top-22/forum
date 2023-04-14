import Navbar from "./navbar";
import { useState, ReactNode } from "react";
import SettingsPopup from "../components/settingsPopup";
import { NextPage } from "next";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: NextPage<LayoutProps> = ({ children }) => {
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  return (
    <div className="d-flex">
      <Navbar setShowSettings={setShowSettingsPopup}></Navbar>
      {/* overflow-hidden blockt ganzseitiges scrollen */}
      <main className="overflow-hidden w-100">{children}</main>
      <SettingsPopup
        setShow={setShowSettingsPopup}
        show={showSettingsPopup}
      ></SettingsPopup>
    </div>
  );
};

export default Layout;
