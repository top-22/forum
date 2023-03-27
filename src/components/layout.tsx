import Navbar from "./navbar";
import { useState, ReactNode } from 'react'
import SettingsPopup from '../components/settingsPopup';
import { NextPage } from "next";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: NextPage<LayoutProps> = ({children})  => {
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  return (
    <>
    <Navbar setShowSettings={setShowSettingsPopup}></Navbar>
    {children}
    <SettingsPopup setShow={setShowSettingsPopup} show={showSettingsPopup}></SettingsPopup>
    </>
  );
}

export default Layout
