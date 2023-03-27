import Head from "next/head";
import { Room, PrismaClient } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";

interface HomeProps {
  rooms: Room[];
}

const Home: NextPage<HomeProps> = ({ rooms }) => {
  const roomCards = rooms.map((room) => (
    <a key={room.id} href={`/rooms/${room.id}`} className="card">
      <h2>{room.name}</h2>
      <span>{room.dsc}</span>
    </a>
  ));

  return (
    <>
      <Head>
        <title>TUC Forum</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-primary">Welcome to the TUC Forum!</h1>

        <div className="d-flex flex-column m-2" style={{ gap: "1em" }}>
          {roomCards}
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = new PrismaClient();
  const rooms = await prisma.room.findMany();
  return { props: { rooms } };
};
export default Home;
