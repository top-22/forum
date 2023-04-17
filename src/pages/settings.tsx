import Layout from "../components/layout";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import Avatar from "../public/avatar.png";
import { useRouter } from "next/router";

const Settings = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <Layout>
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
        <h4 className="text-light mb-3 mx-auto">Nutzername</h4>
        <Button className="mb-3 w-25">Einstellungen</Button>
        <Button className="mb-3 w-25">Darkmode</Button>
        <Button className="mb-3 w-25">Abmelden</Button>
      </div>
    </Layout>
  );
};

export default Settings;
