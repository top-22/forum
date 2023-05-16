import Head from "next/head";
import { Room, PrismaClient } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import Layout from "../components/layout";
import RoomPreview from "../components/roomPreview";
import { parse } from "cookie";

interface HomeProps {
  rooms: Room[];
}

const Home: NextPage<HomeProps> = ({ rooms }) => {
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.headers.cookie
    ? parse(context.req.headers.cookie)
    : {};
  const isAuthenticated = !!cookies.authToken;

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: `/login?next=${encodeURIComponent(context.resolvedUrl)}`,
        permanent: false,
      },
    };
  }

  const prisma = new PrismaClient();
  const rooms = await prisma.room.findMany();

  prisma.$disconnect();
  return { props: { rooms } };
};

export default Home;
