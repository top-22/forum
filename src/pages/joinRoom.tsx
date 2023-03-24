import Head from 'next/head';
import homeStyles from '../styles/home.module.css';
import SearchBar from '../../components/searchBar';

export default function joinRoom () {
  return (
    <div className="bg-dark vh-100">
      <Head>
        <title>TUC Join Room</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-center">
        <h1 className="text-primary">
          JOIN A ROOM
        </h1>
        
        <SearchBar/>

        <button className="btn btn-primary m-1" type="button">Create Room</button>
        <button className="btn btn-primary m-1" type="button">Home</button>

        {/* Hier muss noch mittels <RoomPreviw/> die Vorgeschlagenen Posts hinzugefügt werden*/}
      </div>
    </div>
  );
}
