import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import ClientPage from "./ClientPage";
import { namesCookies } from "@/config/cookiesStorage";

const VerificationPage = async () => {
  const token = await cookies().get(namesCookies.accessToken)?.value;

  if (token) redirect("/");

  return <ClientPage />;
};

export default VerificationPage;
