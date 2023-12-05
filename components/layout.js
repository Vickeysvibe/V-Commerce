import { useEffect } from "react";
import NavbarTop from "./navbar";
import NavbarSide from "./navbarSide";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Layout({ children }) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
        <div className="bg-blue-900 w-screen h-screen flex items-center">
          <div className="p-2 rounded-lg text-center w-full">
            <button
              className="bg-white p-4 rounded-lg"
              onClick={() => {
                signIn("google");
              }}
            >
              log in with google
            </button>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className=" overflow-hidden w-screen h-screen dark:bg-gray-900">
      {session ? <NavbarTop user={session.user} /> : <></>}
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
