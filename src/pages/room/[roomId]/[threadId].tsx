import Head from "next/head";
import { Room, RoomUser, PrismaClient, User, Thread } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import Layout from "../../../components/layout";
import dynamic from 'next/dynamic';

const RoomPage = dynamic(() => import('../[roomId]'));

interface ThreadProps {
  room: Room & {
    users: (RoomUser & { user: User })[];
    threads: (Thread & { creator: User })[];
  };
  thread: Number;
}

const Thread: NextPage<ThreadProps> = ({ room, thread }) => {
  return (
    <div className="row">
      <div className="col">
        <RoomPage room={room}></RoomPage>
      </div>
      <div className="col">
        <Head>
          <title>{`TUC Forum - ${room.name} - ${thread}`}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <h1 className="text-primary">{room.name}</h1>
          <h2 className="text-primary">{`Thread: ${thread}`}</h2>
          <span>{room.description}</span>
        </main>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ThreadProps> = async (
  context
) => {
  const roomId = Number(context.params?.roomId);
  const threadId = Number(context.params?.threadId);
  const prisma = new PrismaClient();
  let room = await prisma.room
    .findFirst({
      where: { id: roomId },
      include: {
        users: { include: { user: true } },
        threads: { include: { creator: true } },
      },
    })
    .catch(() => null);
  if (!room) return { redirect: { destination: "/", permanent: false } };
  console.dir(room, { depth: null });
  prisma.$disconnect();
  return { props: { room, thread: threadId } };
};

export default Thread;
