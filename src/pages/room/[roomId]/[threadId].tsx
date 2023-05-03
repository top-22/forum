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

const RoomPage = dynamic(() => import("../[roomId]"));

interface ThreadProps {
  room: Room & {
    users: (RoomUser & { user: User })[];
    threads: (Thread & { creator: User })[];
  };
  thread: Thread;
  /*you can use the Omit utility type to remove the user property from the Message type, and then add it back with the correct type */
  messages: (Omit<Message, "user"> & { user: User })[];
}

function formatTime(date: Date) {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return hours + ":" + minutes;
}

const Thread: NextPage<ThreadProps> = ({ room, thread, messages }) => {
  return (
    <div className="container-fluid">
      <div className="row bg-dark">
        <Head>
          <title>{`TUC Forum - ${room.name} - ${thread.name}`}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="col p-0">
          <RoomPage room={room}></RoomPage>
        </div>
        <div className="col border-start border-primary border-4 p-0 d-flex flex-column">
          <div className="container text-center">
            <div className="row">
              <div className="col-auto mt-2">
                <Button href={`/room/${room.id}`}>X</Button>
              </div>
              <div className="col">
                <h1 className="text-primary">{thread.name}</h1>
              </div>
            </div>
          </div>
          <div className="bg-primary m-3 p-3 rounded flex-grow-1">
            <div>
              {messages.length > 0 ? (
                messages.map((message) => (
                  <div className="container" key={message.id}>
                    <div className="row">
                      <div className="col-auto align-self-center p-0 m-1">
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
      include: { messages: true },
    })
    .catch(() => null);
  if (!room || !thread)
    return { redirect: { destination: "/", permanent: false } };
  console.dir(room, { depth: null });
  const messagesWithUser = await prisma.message.findMany({
    where: { threadId: threadId },
    include: { user: true },
  });
  return {
    props: {
      room,
      thread: JSON.parse(JSON.stringify(thread)),
      messages: JSON.parse(JSON.stringify(messagesWithUser)),
    },
  };
};

export default Thread;
