import Head from "next/head";
import Link from "next/link";
import { Room, PrismaClient, RoomUser, User, Thread } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import Layout from "../../components/layout";

interface RoomProps {
  room: Room;
  users: User[];
  threads: Thread[];
}

const Room: NextPage<RoomProps> = ({ room, users, threads }) => {
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
          {threads.length > 0 ? (
            threads.map(thread => (
              <div>
                <Link key={thread.id} href={`${room.id}/${thread.id}`}>
                  {`${thread.name} ${thread.description ?? "Dieser Thread hat keine genauere Beschreibung."}`} 
                </Link>
              </div>
            ))
          ) : (
            <div>
              Es gibt keine Threads.
            </div>
          )}
        </div>
        <span>{room.description}</span>
        <div>
          <h2>Benutzer im Raum:</h2>
          <ul>
            {users.map(user => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
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
    .findFirst({ where: { id: roomId } })
    .catch(() => null);
  if (!room) return { redirect: { destination: "/", permanent: false } };
  console.dir(room, { depth: null });
  let users = await prisma.roomUser
    .findMany({ where: { roomId }, include: { user: true } })
    .then((roomUsers) => roomUsers.map((roomUser) => roomUser.user));
  let threads = await prisma.thread.findMany({ where: { roomId } });
  return { props: { room, users, threads } };
};

export default Room;
