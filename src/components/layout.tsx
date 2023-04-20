import Navbar from "./navbar";
import { ReactNode, useState, useEffect } from "react";
import { NextPage } from "next";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: NextPage<LayoutProps> = ({ children }) => {
  return (
    <div className="d-flex">
      <Navbar />
      {/* overflow-hidden blockt ganzseitiges scrollen */}
      <main className="overflow-hidden w-100">{children}</main>
    </div>
  );
};

export default Layout;
