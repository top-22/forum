import Head from 'next/head';
import { Room, User, PrismaClient } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import Layout from '../../../components/layout';


interface ThreadProps {
  room: Room & {users: User[]};
  thread: Number
}

const Thread: NextPage<ThreadProps> = ({ room, thread }) => {

  return (
    <Layout>
      <Head>
        <title>{`TUC Forum - ${room.name} - ${thread}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-primary">
          {room.name}
        </h1>
        <h2 className="text-primary">
          {`Thread: ${thread}`}
        </h2>
        <span>{room.dsc}</span>

      </main>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<ThreadProps> = async (context) => {
  const roomId = Number(context.params?.roomId);
  const threadId = Number(context.params?.threadId);
  const prisma = new PrismaClient();
  let room = await prisma.room.findFirst({where: {id: roomId}, include: {users: true}})
    .catch(() => null)
  if (!room)
    return { redirect: { destination: '/', permanent: false } }
  console.dir(room, { depth: null });
  return { props: { room, thread: threadId } }
}

export default Thread;
