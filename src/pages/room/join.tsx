import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Layout from "../../components/layout";
import SearchBar from "../../components/searchBar";
import { parse } from "cookie";
import { Room, PrismaClient } from "@prisma/client";

interface JoinProps {
  joinedRooms: Room[];
}

const Join: NextPage<JoinProps> = ({ joinedRooms }) => {
  return (
    <Layout rooms={joinedRooms}>
      <div className="bg-dark vh-100">
        <Head>
          <title>TUC Join Room</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="text-center">
          <h1 className="text-primary">JOIN A ROOM</h1>

          <SearchBar />

          <button className="btn btn-primary m-1" type="button">
            Create Room
          </button>
          <button className="btn btn-primary m-1" type="button">
            Home
          </button>

          {/* Hier muss noch mittels <RoomPreview/> die Vorgeschlagenen Posts hinzugefügt werden*/}
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<JoinProps> = async (
  context
) => {
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

  const joinedRooms = await prisma.room.findMany({
    where: { users: { some: { userId: user.id } } },
  });

  prisma.$disconnect();

  return { props: { joinedRooms } };
};

export default Join;
