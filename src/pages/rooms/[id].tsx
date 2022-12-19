import Head from 'next/head';
import { Room, PrismaClient } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';

// TODO: extend functionality to show users in the specified room
// TODO: erweitern funktionalität zu zeigen Benutzer in dem spezifizierten Raum
// using prisma (room model references users and vice versa)
// supply room to component by props

interface RoomProps {
  room: Room;
}

const Home: NextPage<RoomProps> = ({ room }) => {

  return (
    <>
      <Head>
        <title>{`TUC Forum - ${room.name}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-primary">
          {room.name}
        </h1>
        <span>{room.desc}</span>

        <div className="d-flex flex-column m-2" style={{gap: "1em"}}>
          {/* TODO: put user list here */}
          placeholder
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<RoomProps> = async (context) => {
  const roomId = Number(context.params?.id);
  const prisma = new PrismaClient();
  let room = await prisma.room.findFirst({where: {id: roomId}})
    .catch(() => null)
  if (!room)
    return { redirect: { destination: '/', permanent: false } }
  return { props: { room } }
}

export default Home;
