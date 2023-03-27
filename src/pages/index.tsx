import Head from "next/head";
import Link from "next/link";
import { Room, PrismaClient } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import Layout from "../components/layout";
import { useState } from "react";

interface HomeProps {
  rooms: Room[];
}

const Home: NextPage<HomeProps> = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showHome, setShowHome] = useState(false);

  const openCreatePost = () => {
    setShowCreatePost(true);
    setShowHome(false);
  };

  const openHome = () => {
    setShowCreatePost(false);
    setShowHome(true);
  };

  return (
    <Layout>
      <div className="bg-dark vh-100">
        <Head>
          <title>TUC Forum</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="d-flex flex-column">
          <Link href="room/1">Room 1</Link>
          <Link href="room/2">Room 2</Link>
          <Link href="room/3">Room 3</Link>
          <Link href="room/4">Room 4</Link>
          <Link href="room/5">Room 5</Link>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = new PrismaClient();
  const rooms = await prisma.room.findMany();
  return { props: { rooms } };
};
export default Home;
