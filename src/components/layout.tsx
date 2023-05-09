import Navbar from "./navbar";
import { ReactNode, useState, useEffect } from "react";
import { Room, PrismaClient } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { parse } from "cookie";

interface LayoutProps {
  children?: ReactNode;
  rooms: Room[];
}

const Layout: NextPage<LayoutProps> = ({ children, rooms }) => {
  return (
    <div className="d-flex">
      <Navbar Navrooms={rooms} />
      {/* overflow-hidden blockt ganzseitiges scrollen */}
      <main className="overflow-hidden w-100">{children}</main>
    </div>
  );
};

export default Layout;
