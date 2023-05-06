import Head from "next/head";
import { Room, PrismaClient } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import Layout from "../components/layout";
import RoomPreview from "../components/roomPreview";
import { parse } from "cookie";

interface HomeProps {
  rooms: Room[];
  joinedRooms: Room[];
}

const Home: NextPage<HomeProps> = ({ rooms, joinedRooms }) => {
  return (
    <Layout>
      <div className="bg-dark vh-100">
        <Head>
          <title>TUC Forum</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <RoomPreview rooms={rooms} title="All Rooms" />
        <RoomPreview rooms={joinedRooms} title="Joined Rooms" />
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

  const user = await prisma.user
    .findUnique({ where: { username: cookies.username } })
    .catch(console.error);

  if (!user) {
    context.res.setHeader(
      "Set-Cookie",
      "authToken=; username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );
    return {
      redirect: {
        destination: `/login?next=${encodeURIComponent(context.resolvedUrl)}`,
        permanent: false,
      },
    };
  }

  // get joined room of the user (relation RoomUser) and add them to the props
  const joinedRooms = await prisma.room.findMany({
    where: { users: { some: { userId: user.id } } },
  });

  prisma.$disconnect();
  return { props: { rooms, joinedRooms } };
};

export default Home;
