import { useEffect } from "react";
import NavbarTop from "./navbar";
import NavbarSide from "./navbarSide";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Layout({ children }) {
  const { data: session } = useSession();
  return (
    <div className="w-screen h-screen dark:bg-gray-900">
      <NavbarTop user={session.user} />
      <div className="flex">
        <NavbarSide />
        <div
          style={{
            height: "800px",
            position: "sticky",
          }}
          className="w-full rounded-s-3xl p-5 py-7 bg-white"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
