import Head from "next/head";
import {
  Room,
  RoomUser,
  PrismaClient,
  User,
  Thread,
  Message,
} from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Button from "react-bootstrap/Button";
import { parse } from "cookie";

const RoomPage = dynamic(() => import("../[roomId]"));

interface ThreadProps {
  room: Room & {
    users: (RoomUser & { user: User })[];
    threads: (Thread & { creator: User })[];
  };
  thread: Thread;
  /*fügt den Ersteller der Nachricht zur Nachricht hinzu*/
  messages: (Omit<Message, "user"> & { user: User })[];
  username: string;
  joinedRooms: Room[];
}

function formatTime(date: Date) {
  const time = date.toLocaleString("de", {
    hour: "numeric",
    minute: "numeric",
  });
  return time;
}

const Thread: NextPage<ThreadProps> = ({
  room,
  thread,
  messages,
  username,
  joinedRooms,
}) => {
  return (
    <div className="container-fluid">
      <div className="row bg-dark">
        <Head>
          <title>{`TUC Forum - ${room.name} - ${thread.name}`}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="col p-0">
          <RoomPage room={room} username={username}></RoomPage>
        </div>
        <div className="col border-start border-primary border-4 p-0 d-flex flex-column vh-100 overflow-hidden">
          <div className="container text-center">
            <div className="row">
              <div className="col-auto mt-2">
                <Button href={`/room/${room.id}`}>X</Button>
              </div>
              <div className="col">
                <h2 className="text-primary">{thread.name}</h2>
              </div>
            </div>
          </div>
          <div className="bg-primary m-3 p-3 rounded overflow-auto">
            {messages.length > 0 ? (
              messages.map((message) => (
                <div className="container p-1" key={message.id}>
                  <div className="row">
                    <div className="col-auto align-self-center p-0 m-1 w-25">
                      <div className="d-flex flex-column align-items-start">
                        <div>{formatTime(new Date(message.createdAt))}</div>
                        <div>{message.user.name}</div>
                      </div>
                    </div>
                    <div className="col bg-secondary rounded p-2">
                      {message.content}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>Keine Nachrichten</div>
            )}
          </div>
          <div className="input-group p-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nachricht"
            />
            <Button variant="outline-primary">Senden</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ThreadProps> = async (
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

  const roomId = Number(context.params?.roomId);
  const threadId = Number(context.params?.threadId);

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
      include: { messages: true },
    })
    .catch(() => null);
  if (!room || !thread)
    return { redirect: { destination: "/", permanent: false } };
  console.dir(room, { depth: null });
  const messagesWithUser = await prisma.message.findMany({
    where: { threadId: threadId },
    include: { user: true },
    orderBy: {
      createdAt: "asc",
    },
  });

  const joinedRooms = await prisma.room.findMany({
    where: { users: { some: { userId: user.id } } },
  });

  prisma.$disconnect();
  return {
    props: {
      room,
      thread: JSON.parse(JSON.stringify(thread)),
      messages: JSON.parse(JSON.stringify(messagesWithUser)),
      username: cookies.username,
      joinedRooms: joinedRooms,
    },
  };
};

export default Thread;
