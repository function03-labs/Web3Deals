import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'

export default function Dashboard({ user }) {
  const { data: session, status } = useSession();
  const router = useRouter()

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Link href="/">
          <button className="absolute top-4 left-4 sm:top-12 sm:left-12 flex gap-2 items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M9.253 6.061a.766.766 0 0 0-.544.225L3 11.925 8.705 17.7c.145.15.342.234.553.234a.78.78 0 0 0 .788-.773v-2.888s1.003-.502 2.691-.502c1.973 0 4.894.68 8.264 3.633 0 0-1.566-7.823-10.955-7.823V6.848a.78.78 0 0 0-.778-.783c-.005-.005-.009-.005-.014-.005m0-1.406c.558 0 1.097.211 1.505.595.445.413.694.989.689 1.598V8.23c1.805.15 3.445.591 4.898 1.313a11.28 11.28 0 0 1 3.797 3.07c1.758 2.198 2.217 4.425 2.236 4.519a1.405 1.405 0 0 1-1.102 1.655 1.425 1.425 0 0 1-1.205-.319c-3.098-2.714-5.7-3.281-7.336-3.281-.431 0-.862.042-1.289.127v1.842a2.161 2.161 0 0 1-.689 1.594 2.191 2.191 0 0 1-3.057-.061l-5.704-5.775a1.405 1.405 0 0 1 .014-1.987L7.72 5.288a2.189 2.189 0 0 1 1.533-.633z"
              />
            </svg>{" "}
            Home
          </button>
        </Link>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="mb-4">You must sign in to view this page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <Link href="/">
          <button className="flex gap-2 items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M9.253 6.061a.766.766 0 0 0-.544.225L3 11.925 8.705 17.7c.145.15.342.234.553.234a.78.78 0 0 0 .788-.773v-2.888s1.003-.502 2.691-.502c1.973 0 4.894.68 8.264 3.633 0 0-1.566-7.823-10.955-7.823V6.848a.78.78 0 0 0-.778-.783c-.005-.005-.009-.005-.014-.005m0-1.406c.558 0 1.097.211 1.505.595.445.413.694.989.689 1.598V8.23c1.805.15 3.445.591 4.898 1.313a11.28 11.28 0 0 1 3.797 3.07c1.758 2.198 2.217 4.425 2.236 4.519a1.405 1.405 0 0 1-1.102 1.655 1.425 1.425 0 0 1-1.205-.319c-3.098-2.714-5.7-3.281-7.336-3.281-.431 0-.862.042-1.289.127v1.842a2.161 2.161 0 0 1-.689 1.594 2.191 2.191 0 0 1-3.057-.061l-5.704-5.775a1.405 1.405 0 0 1 .014-1.987L7.72 5.288a2.189 2.189 0 0 1 1.533-.633z"
              />
            </svg>{" "}
            Home
          </button>
        </Link>
        <div className="flex items-center">
          <img
            src={session?.user.image || "/user-placeholder.png"}
            alt={session?.user.name || "User"}
            className="h-8 w-8 rounded-full object-cover mr-2"
          />
          <p className="text-sm font-medium text-gray-600">
            Welcome, {session?.user.name || "User"}!
          </p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Your Services</h2>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Your Billing Information</h2>
        <p className="mb-4">{user?.billingInfo}</p>
      </div>
      <button
        onClick={() =>{ signOut({ callbackUrl: "/" });}}
        className="px-4 py-2 bg-red-500 text-white rounded-md mt-8"
      >
        Sign out
      </button>
    </div>
  );
}
