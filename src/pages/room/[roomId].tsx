import Head from "next/head";
import Link from "next/link";
import { Room, RoomUser, PrismaClient, User, Thread } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { Button } from "react-bootstrap";
import Layout from "../../components/layout";
import CreatePost from "../../components/createPostPopup";
import { useState } from "react";
import { parse } from "cookie";

interface RoomProps {
  room: Room & {
    users: (RoomUser & { user: User })[];
    threads: (Thread & { creator: User })[];
  };
  username: string;
  userId: number;
  isJoined: boolean;
  isAdmin: boolean;
  joinedRooms: Room[];
}

const Room: NextPage<RoomProps> = ({
  room,
  username,
  userId,
  isJoined,
  isAdmin,
  joinedRooms,
}) => {
  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleJoinRoom = async () => {
    try {
      const response = await fetch("/api/rooms/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: room.id,
          userId: userId,
        }),
      });

      if (response.ok) {
        console.log("Joined room successfully");
        window.location.reload();
      } else {
        console.error("Failed to join room");
      }
    } catch (error) {
      console.error("Failed to join room:", error);
    }
  };

  const handleLeaveRoom = async () => {
    try {
      const response = await fetch("/api/rooms/leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: room.id,
          userId: userId,
        }),
      });

      if (response.ok) {
        console.log("Left room successfully");
        window.location.reload();
      } else {
        console.error("Failed to leave room");
      }
    } catch (error) {
      console.error("Failed to leave room:", error);
    }
  };

  return (
    <Layout rooms={joinedRooms}>
      <Head>
        <title>{`TUC Forum - ${room.name}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="bg-dark d-flex flex-column vh-100">
          <div className="d-flex justify-content-between p-2">
            <div className="d-flex align-items-center">
              <h1 className="text-primary">{room.name}</h1>
              {!isAdmin && (
                <Button
                  className="btn-secondary ms-2 text-nowrap"
                  onClick={isJoined ? handleLeaveRoom : handleJoinRoom}
                >
                  {isJoined ? "Leave Room" : "Join Room"}
                </Button>
              )}
            </div>
            <div className="d-flex align-items-center">
              {isJoined && (
                <Button className="btn-secondary ms-2">Raumoptionen</Button>
              )}
              {/*Popup für Raumoptionen hinzufügen */}
            </div>
          </div>
          {isJoined && (
            <div className="p-3">
              <Button onClick={() => setShowCreatePost(!showCreatePost)}>
                CREATE POST
              </Button>
              {/*Popup für Roomcreate hinzufügen */}
            </div>
          )}
          <div className="pt-2 px-2 d-flex overflow-hidden">
            <div className="rounded d-flex overflow-auto w-100">
              <div className="w-100">
                {room.threads.length > 0 ? (
                  room.threads.map((thread) => (
                    <div className="col mb-2" key={thread.id}>
                      <div className="card text-bg-primary m-2 p-2 h-100 d-flex align-items-start">
                        <div className="card-body w-100">
                          <div className="row">
                            <div className="col p-0">
                              <Link
                                key={thread.id}
                                href={`/room/${room.id}/${thread.id}`}
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
                            {isJoined && (
                              <div className="col-auto p-0">
                                <Button className="btn-secondary ms-auto">
                                  Optionen {/*Popup für Optionen hinzufügen */}
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center">Es gibt keine Threads.</div>
                )}
              </div>
            </div>
          </div>
          <div className="text-white p-2">
            {/*<p>
              Infos über den Room für die Rauminfos/Raumoptionen, müssen später
              an Raumoptionen-Componente übergeben und hier rausgelöscht werden
                </p>*/}
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
      {isJoined && (
        <CreatePost
          show={showCreatePost}
          room={room}
          onHide={() => setShowCreatePost(false)}
          username={username}
        />
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<RoomProps> = async (
  context
) => {
  const cookies = context.req.headers.cookie
    ? parse(context.req.headers.cookie)
    : {};
  const isAuthenticated = !!cookies.authToken;
  const username = cookies.username;

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: `/login?next=${encodeURIComponent(context.resolvedUrl)}`,
        permanent: false,
      },
    };
  }

  const prisma = new PrismaClient();
  const roomId = Number(context.params?.roomId);
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

  const roomUser = await prisma.roomUser
    .findFirst({
      where: { userId: user.id, roomId: roomId },
    })
    .catch(console.error);

  const isJoined = !!roomUser;
  const isAdmin = roomUser?.role === "ADMIN";

  if (isJoined === undefined) {
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
  return {
    props: {
      room,
      users: room.users,
      threads: room.threads,
      username: username,
      userId: user.id,
      isJoined: isJoined,
      isAdmin: isAdmin,
      joinedRooms,
    },
  };
};

export default Room;
