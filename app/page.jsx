import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import ClientPage from "./ClientPage";
import { namesCookies } from "@/core/constants/general";

const HomePage = async (props) => {
  const token = await cookies().get(namesCookies.accessToken)?.value;

  if (!token) redirect("/sign-in");

  return (
    <>
      <ClientPage token={token} />
    </>
  );
};

export default HomePage;
