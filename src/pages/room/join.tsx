import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Layout from "../../components/layout";
import SearchBar from "../../components/searchBar";
import { parse } from "cookie";

interface JoinProps {}

const Join: NextPage<JoinProps> = (props) => {
  return (
    <Layout>
      <div className="bg-dark vh-100">
        <Head>
          <title>TUC Join Room</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="text-center">
          <h1 className="text-primary">JOIN A ROOM</h1>

          <SearchBar />

          <button className="btn btn-primary m-1" type="button">
            Create Room
          </button>
          <button className="btn btn-primary m-1" type="button">
            Home
          </button>

          {/* Hier muss noch mittels <RoomPreview/> die Vorgeschlagenen Posts hinzugefügt werden*/}
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.headers.cookie
    ? parse(context.req.headers.cookie)
    : {};
  const isAuthenticated = !!cookies.authToken;

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: `/login?next=${encodeURIComponent(context.resolvedUrl)}`,
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default Join;
