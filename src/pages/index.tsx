import Head from "next/head";
import Link from "next/link";
import { Room, PrismaClient } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import Layout from "../components/layout";
import RoomPreview from "../components/roomPreview";
import { useState } from "react";

interface HomeProps {
  rooms: Room[];
}

const Home: NextPage<HomeProps> = ({ rooms }) => {
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
        <RoomPreview rooms={rooms} title="Räume1" />
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
