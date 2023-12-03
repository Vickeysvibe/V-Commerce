import { useSession, signIn, signOut } from "next-auth/react";
import NavbarTop from "@/components/navbar";
import NavbarSide from "@/components/navbarSide";
import Layout from "@/components/layout";
import HomePage from "./home";

export default function Component() {
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
  return <HomePage />;
}
