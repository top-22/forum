import Head from 'next/head';
import { Room, PrismaClient } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import RoomPreview from '../../components/roomPreview';

import homeStyles from '../styles/home.module.css';

interface HomeProps {
  rooms: Room[];
}

const Home: NextPage<HomeProps> = ({ rooms }) => {
  return (
    <div className="bg-dark vh-100">
      <Head>
        <title>TUC Forum</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-center">
        <h1 className="text-primary">
          TUC Forum
        </h1>
        <button className={homeStyles.button}>Create Room</button>
        <button className={homeStyles.button}>Join Room</button>
      </div>
      
      <RoomPreview rooms={rooms} title="Your Rooms"/>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = new PrismaClient();
  const rooms = await prisma.room.findMany();
  return { props: { rooms } }
}
export default Home;
