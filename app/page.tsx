import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/options";
import { redirect } from "next/navigation";
import Menu from "./menu/page";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    session ? (
        <Menu/>
    ) : (
      redirect('api/auth/signin?callbackurl=/server')
    )
  )
}
