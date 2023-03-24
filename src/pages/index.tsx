import Head from 'next/head';
import { Room, PrismaClient } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import RoomPreview from '../../components/roomPreview';
import UserMenu from '../../components/userMenu';
import { useState } from 'react';


interface HomeProps {
  rooms: Room[];
}


const Home: NextPage<HomeProps> = ({ rooms }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const openUserMenu = () => {
    setShowUserMenu(true);
  }

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
        <button className="btn btn-primary m-1" type="button">Create Room</button>
        <button className="btn btn-primary m-1" type="button">Join Room</button>
        <button className="btn btn-primary m-1" type="button" onClick={openUserMenu}>User Menu</button>
      </div>

      <RoomPreview rooms={rooms} title="Your Rooms"/>
      <UserMenu setShow={setShowUserMenu} show={showUserMenu}/>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = new PrismaClient();
  const rooms = await prisma.room.findMany();
  return { props: { rooms } };
};
export default Home;
