import Head from "next/head";
import { Room, RoomUser, PrismaClient, User, Thread } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";

const RoomPage = dynamic(() => import("../[roomId]"));

interface ThreadProps {
  room: Room & {
    users: (RoomUser & { user: User })[];
    threads: (Thread & { creator: User })[];
  };
  thread: Thread;
}

const Thread: NextPage<ThreadProps> = ({ room, thread }) => {
  return (
    <div className="row bg-dark">
      <Head>
        <title>{`TUC Forum - ${room.name} - ${thread.name}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="col">
        <RoomPage room={room}></RoomPage>
      </div>
      <div className="col border-start border-primary border-4">
        <main>
          <h1 className="text-primary">{thread.name}</h1>
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
  let thread = await prisma.thread
    .findFirst({
      where: { id: threadId },
    })
    .catch(() => null);
  if (!room || !thread)
    return { redirect: { destination: "/", permanent: false } };
  console.dir(room, { depth: null });
  return { props: { room, thread } };
};

export default Thread;
