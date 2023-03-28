import Head from "next/head";
import Link from "next/link";
import { Room, User, PrismaClient } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import Layout from "../../components/layout";

interface RoomProps {
  room: Room & { users: User[] };
}

const Room: NextPage<RoomProps> = ({ room }) => {
  return (
    <Layout>
      <Head>
        <title>{`TUC Forum - ${room.name}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-primary">{room.name}</h1>
        <button>CREATE POST</button>
        <div className="d-flex flex-column">
          <Link href={`${room.id}/1`}>Thread 1</Link>
          <Link href={`${room.id}/2`}>Thread 2</Link>
          <Link href={`${room.id}/3`}>Thread 3</Link>
          <Link href={`${room.id}/4`}>Thread 4</Link>
          <Link href={`${room.id}/5`}>Thread 5</Link>
        </div>
        <span>{room.dsc}</span>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<RoomProps> = async (
  context
) => {
  const roomId = Number(context.params?.roomId);
  const prisma = new PrismaClient();
  let room = await prisma.room
    .findFirst({ where: { id: roomId }, include: { users: true } })
    .catch(() => null);
  if (!room) return { redirect: { destination: "/", permanent: false } };
  console.dir(room, { depth: null });
  return { props: { room } };
};

export default Room;
