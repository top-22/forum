import Head from 'next/head';
import { Room, PrismaClient } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';

interface RoomProps {
  room: Room;
}

const Home: NextPage<RoomProps> = ({ room }) => {

  return (
    <>
      <Head>
        <title>TUC Forum - {room.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <h1 className="text-primary">
          {room.name}
        </h1>
        <span>{room.desc}</span>

        <div className="d-flex flex-column m-2" style={{gap: "1em"}}>
          placeholder
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let roomId: number;
  roomId = Number(context.params?.id);
  const prisma = new PrismaClient();
  const room = await prisma.room.findFirstOrThrow({where: {id: roomId}});
  const props : RoomProps = {room}
  return { props }
}

export default Home;
