import Head from 'next/head';
import { Room, PrismaClient } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import RoomPreview from '../components/roomPreview';
import UserMenu from '../components/userMenu';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CreatePost from './createPost';


interface HomeProps {
  rooms: Room[];
}

interface NavigationProps{
  //showUserMenu: boolean,
  showCreatePost: boolean,
  showHome: boolean
}



const Home: NextPage<HomeProps> = ({ rooms }) => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [showHome, setShowHome] = useState(false);

    
    const openUserMenu = () => {
    setShowUserMenu(true);
    setShowCreatePost(false);
    setShowHome(false);
  }

  const openCreatePost = () => {
    setShowUserMenu(false);
    setShowCreatePost(true);
    setShowHome(false);
  }

  const openHome = () => {
    setShowUserMenu(false);
    setShowCreatePost(false);
    setShowHome(true);
  }


  function Navigation(props: NavigationProps) {
  //if (props.showUserMenu == true){
  //    return(<UserMenu/>);
  //}
    if (props.showCreatePost == true){
      return(<CreatePost/>);
    }
    else {
      return <RoomPreview rooms={rooms} title="Your Rooms"/>
    }
  }
  
  
  return (
    <div className="bg-dark vh-100">
      <Head>
        <title>TUC Forum</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">TUC FORUM</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav defaultActiveKey="/" className="me-auto">
              <Nav.Link onClick={openHome} href="#home">Home</Nav.Link>
              <Nav.Link onClick={openCreatePost} href="#createPost">Create Room</Nav.Link>
              <Nav.Link href="#joinRoom">Join Room</Nav.Link>
              <Nav.Link onClick={openUserMenu}>User Menu</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Navigation showCreatePost={showCreatePost} showHome={showHome}></Navigation>
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
