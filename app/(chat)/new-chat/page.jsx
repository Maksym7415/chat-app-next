import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import ClientPage from "./ClientPage";
import { namesCookies } from "@/core/constants/general";

const ChatIdPage = async ({ params }) => {
  const token = await cookies().get(namesCookies.accessToken)?.value;

  if (!token) redirect("/sign-in");

  return <ClientPage params={params} />;
};

export default ChatIdPage;
