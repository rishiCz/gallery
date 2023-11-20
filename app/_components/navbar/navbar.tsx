import Link from "next/link";
import Search from "./search";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const Navbar = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div className="navbar bg-base-100 sticky top-0 z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href={"/images"}>All Images</Link>
            </li>
            <li>
              <Link href={"/admin"}>Admin</Link>
            </li>
          </ul>
        </div>
        <Link href={'/'} className="btn btn-ghost text-xl">Galley</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/images"}>All Images</Link>
          </li>
          <li>
            <Link href={"/admin"}>Admin</Link>
          </li>
        </ul>
      </div>
      <Search />
      <div className="navbar-end">
        { !session && (
          <Link href={"api/auth/signin"} className="btn">
            Sign In
          </Link>
        )}
        {session && (
          <>
            <div className="avatar online">
              <div className="w-8 rounded-full ">
                <img src={session.user!.image!} alt={session.user!.name?.charAt(0)} />
              </div>
            </div>
            <label htmlFor="user name" className="m-5">
              {session.user?.name}
            </label>
            <Link href={"api/auth/signout"} className="btn">
              Log Out
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
function GoogleProvider(arg0: { clientId: string; clientSecret: string; }): any {
  throw new Error("Function not implemented.");
}

