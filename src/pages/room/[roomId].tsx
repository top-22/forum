import Head from "next/head";
import Link from "next/link";
import { Room, RoomUser, PrismaClient, User, Thread } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { Modal, Button } from "react-bootstrap";
import Layout from "../../components/layout";
import CreatePost from "../../components/createPostPopup";
import { useState } from "react";

interface RoomProps {
  room: Room & {
    users: (RoomUser & { user: User })[];
    threads: (Thread & { creator: User })[];
  };
}

const Room: NextPage<RoomProps> = ({ room }) => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  return (
    <Layout>
      <Head>
        <title>{`TUC Forum - ${room.name}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="bg-dark vh-100">
          <div className="d-flex justify-content-between p-2">
            <h1 className="text-primary">{room.name}</h1>
            <Button className="btn-secondary">Raumoptionen</Button>
            {/*Popup für Raumoptionen hinzufügen */}
          </div>
          <div className="p-2">
            <Button onClick={() => setShowCreatePost(!showCreatePost)}>
              CREATE POST
            </Button>
            {/*Popup für Roomcreate hinzufügen */}
          </div>
          <div className="p-2">
            <div className="container-fluid m-0 p-0 w-100">
              <div className="overflow-auto">
                <div className="col flex-nowrap">
                  {room.threads.length > 0 ? (
                    room.threads.map((thread) => (
                      <div className="col mb-2" key={thread.id}>
                        <div
                          className="card text-bg-primary h-100 d-flex align-items-start"
                          style={{ width: "80%", position: "relative" }}
                        >
                          <div className="card-body">
                            <Link
                              key={thread.id}
                              href={`${room.id}/${thread.id}`}
                            >
                              <h2 className="card-title text-white text-decoration-underline">
                                {thread.name}
                                {" - "}
                                {thread.creator.name ?? "Unbekannt"}
                              </h2>
                              <p className="card-text text-secondary text-decoration-none">
                                {thread.description ??
                                  "Dieser Thread hat keine genauere Beschreibung."}
                              </p>
                            </Link>
                          </div>
                          <Button className="btn-secondary ms-auto position-absolute top-0 end-0 p-2">
                            Optionen {/*Popup für Optionen hinzufügen */}
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center">Es gibt keine Threads.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="text-white p-2">
            {/*Infos über den Room für die Rauminfos/Raumoptionen, müssen später an Raumoptionen-Componente übergebn werden und hier rausgelöscht werden*/}
            <span>{room.description}</span>
            <div>
              <h2>Benutzer im Raum:</h2>
              <ul>
                {room.users.map((user) => (
                  <li key={user.user.id}>{user.user.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <CreatePost
        show={showCreatePost}
        room={room}
        onHide={() => setShowCreatePost(false)}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<RoomProps> = async (
  context
) => {
  const roomId = Number(context.params?.roomId);
  const prisma = new PrismaClient();
  const room = await prisma.room
    .findFirst({
      where: { id: roomId },
      include: {
        users: { include: { user: true } },
        threads: { include: { creator: true } },
      },
    })
    .catch(console.error);
  if (!room) return { redirect: { destination: "/", permanent: false } };
  prisma.$disconnect();
  return {
    props: {
      room,
      users: room.users,
      threads: room.threads,
    },
  };
};

export default Room;
