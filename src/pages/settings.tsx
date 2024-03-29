import Layout from "../components/layout";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import Avatar from "../public/avatar.png";
import { useRouter } from "next/router";
import { useState, useEffect, FunctionComponent } from "react";
import { serialize, parse } from "cookie";
import { GetServerSideProps, NextPage } from "next";
import { PrismaClient, Room } from "@prisma/client";

interface SettingsProps {
  joinedRooms: Room[];
}

const Settings: NextPage<SettingsProps> = ({ joinedRooms }) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const handleLogout = () => {
    document.cookie = serialize("authToken", "", {
      maxAge: -1,
      path: "/",
    });
    document.cookie = serialize("username", "", {
      maxAge: -1,
      path: "/",
    });
    router.push("/login");
  };

  const [username, setUsername] = useState("");
  useEffect(() => {
    const cookies = parse(document.cookie);
    setUsername(cookies.username || "");
  }, []);

  return (
    <Layout rooms={joinedRooms}>
      <div className="bg-dark d-flex flex-column vh-100 justify-content-center align-items-center w-100">
        <Button
          onClick={goBack}
          className="position-absolute top-0 end-0 mt-3 me-3"
        >
          X
        </Button>
        <Image
          src={Avatar}
          alt="profile picture"
          className="img-fluid w-25 mb-3"
        />
        <h4 className="text-light mb-3 mx-auto">{username}</h4>
        <Button className="mb-3 w-25">Einstellungen</Button>
        <Button className="mb-3 w-25">Darkmode</Button>
        <Button className="mb-3 w-25" onClick={handleLogout}>
          Abmelden
        </Button>
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

  const prisma = new PrismaClient();

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

  // get joined room of the user (relation RoomUser) and add them to the props
  const joinedRooms = await prisma.room.findMany({
    where: { users: { some: { userId: user.id } } },
  });

  prisma.$disconnect();

  return { props: { joinedRooms } };
};

export default Settings;
