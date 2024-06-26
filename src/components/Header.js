import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";

function SunIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      aria-hidden="true"
    >
      <path
        d="M7.5 0C7.77614 0 8 0.223858 8 0.5V2.5C8 2.77614 7.77614 3 7.5 3C7.22386 3 7 2.77614 7 2.5V0.5C7 0.223858 7.22386 0 7.5 0ZM2.1967 2.1967C2.39196 2.00144 2.70854 2.00144 2.90381 2.1967L4.31802 3.61091C4.51328 3.80617 4.51328 4.12276 4.31802 4.31802C4.12276 4.51328 3.80617 4.51328 3.61091 4.31802L2.1967 2.90381C2.00144 2.70854 2.00144 2.39196 2.1967 2.1967ZM0.5 7C0.223858 7 0 7.22386 0 7.5C0 7.77614 0.223858 8 0.5 8H2.5C2.77614 8 3 7.77614 3 7.5C3 7.22386 2.77614 7 2.5 7H0.5ZM2.1967 12.8033C2.00144 12.608 2.00144 12.2915 2.1967 12.0962L3.61091 10.682C3.80617 10.4867 4.12276 10.4867 4.31802 10.682C4.51328 10.8772 4.51328 11.1938 4.31802 11.3891L2.90381 12.8033C2.70854 12.9986 2.39196 12.9986 2.1967 12.8033ZM12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8H14.5C14.7761 8 15 7.77614 15 7.5C15 7.22386 14.7761 7 14.5 7H12.5ZM10.682 4.31802C10.4867 4.12276 10.4867 3.80617 10.682 3.61091L12.0962 2.1967C12.2915 2.00144 12.608 2.00144 12.8033 2.1967C12.9986 2.39196 12.9986 2.70854 12.8033 2.90381L11.3891 4.31802C11.1938 4.51328 10.8772 4.51328 10.682 4.31802ZM8 12.5C8 12.2239 7.77614 12 7.5 12C7.22386 12 7 12.2239 7 12.5V14.5C7 14.7761 7.22386 15 7.5 15C7.77614 15 8 14.7761 8 14.5V12.5ZM10.682 10.682C10.8772 10.4867 11.1938 10.4867 11.3891 10.682L12.8033 12.0962C12.9986 12.2915 12.9986 12.608 12.8033 12.8033C12.608 12.9986 12.2915 12.9986 12.0962 12.8033L10.682 11.3891C10.4867 11.1938 10.4867 10.8772 10.682 10.682ZM5.5 7.5C5.5 6.39543 6.39543 5.5 7.5 5.5C8.60457 5.5 9.5 6.39543 9.5 7.5C9.5 8.60457 8.60457 9.5 7.5 9.5C6.39543 9.5 5.5 8.60457 5.5 7.5ZM7.5 4.5C5.84315 4.5 4.5 5.84315 4.5 7.5C4.5 9.15685 5.84315 10.5 7.5 10.5C9.15685 10.5 10.5 9.15685 10.5 7.5C10.5 5.84315 9.15685 4.5 7.5 4.5Z"
        fill="currentColor"
      ></path>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 0.375 0.375"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-color="currentColor"
        d="M0.072 0.013a0.01 0.01 0 0 0 -0.02 0v0.015H0.037a0.01 0.01 0 1 0 0 0.02h0.015v0.015a0.01 0.01 0 1 0 0.02 0V0.048h0.015a0.01 0.01 0 0 0 0 -0.02H0.072V0.013Zm0.075 0.075a0.01 0.01 0 1 0 -0.02 0v0.015H0.113a0.01 0.01 0 1 0 0 0.02h0.015v0.015a0.01 0.01 0 1 0 0.02 0V0.122h0.015a0.01 0.01 0 0 0 0 -0.02H0.147V0.087Zm-0.1 0.075a0.01 0.01 0 1 0 -0.02 0v0.015H0.013a0.01 0.01 0 1 0 0 0.02h0.015v0.015a0.01 0.01 0 0 0 0.02 0V0.198h0.015a0.01 0.01 0 0 0 0 -0.02H0.048V0.163ZM0.214 0.025 0.206 0.023C0.201 0.022 0.198 0.029 0.201 0.033A0.164 0.164 0 0 1 0.23 0.127a0.165 0.165 0 0 1 -0.157 0.165C0.068 0.292 0.066 0.299 0.069 0.303a0.17 0.17 0 0 0 0.005 0.005L0.076 0.31l0.006 0.006 0.005 0.004 0.003 0.003 0.004 0.003 0.004 0.003 0.009 0.006 0.007 0.003 0.006 0.003 0.007 0.003 0.006 0.002a0.164 0.164 0 0 0 0.028 0.006l0.008 0.002 0.007 0.001A0.165 0.165 0 0 0 0.352 0.17V0.163a0.164 0.164 0 0 0 -0.01 -0.035L0.339 0.121 0.337 0.117 0.335 0.113A0.165 0.165 0 0 0 0.322 0.091L0.318 0.086 0.313 0.079 0.308 0.075 0.305 0.072 0.301 0.068 0.296 0.063 0.287 0.057 0.282 0.053 0.274 0.048 0.266 0.043 0.258 0.038 0.254 0.037 0.248 0.035 0.241 0.033 0.235 0.031 0.227 0.028 0.22 0.027 0.213 0.026ZM0.26 0.133A0.189 0.189 0 0 0 0.246 0.06a0.14 0.14 0 1 1 -0.119 0.253A0.19 0.19 0 0 0 0.218 0.25 0.018 0.018 0 0 0 0.252 0.239 0.018 0.018 0 0 0 0.238 0.221L0.242 0.213A0.032 0.032 0 1 0 0.259 0.155 0.272 0.272 0 0 0 0.261 0.133Z"
        fill="currentColor"
      />
    </svg>
  );
}

/*
 * Header component for the website.
 * Renders the header with a logo and navigation links.
 */
function Header({ theme, setTheme }) {
  const Router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    // Set the theme based on the value stored in localStorage
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("theme")
    );
    setTheme(localStorage.getItem("theme"));
  }, []);

  // Function to toggle the theme between 'light' and 'dark'
  const toggleTheme = () => {
    if (theme === "light") {
      localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute("data-theme", "dark");
      setTheme("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.setAttribute("data-theme", "light");
      setTheme("light");
    }
  };

  return (
    <header className="z-20 ease-linear flex flex-col md:flex-row justify-between items-center py-2 sm:py-3 md:py-3 md:px-[8rem] border-b border-[#F2F2F2]">
      <h1
        onClick={() => Router.push("/?week=31")}
        className="cursor-pointer text-2xl font-bold tracking-widest"
      >
        .Web3Deals
      </h1>
      <nav className=" items-center space-x-2.5 pt-1 flex">
        {/* <a target="_blank" rel="noreferrer" href="https://github.com/function03-labs/Web3Deals">
            <div className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md w-9 px-0">
              <svg viewBox="0 0 438.549 438.549" className="h-5 w-5">
                <path fill="currentColor" d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"></path>
              </svg><span className="sr-only">Github</span>
            </div>
          </a> */}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://twitter.com/web3deals"
        >
          <div className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md w-9 px-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-5 w-5 fill-current"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
            <span className="sr-only">Twitter</span>
          </div>
        </a>
        <div onClick={toggleTheme} className="cursor-pointer transition-all">
          {theme === "light" ? <SunIcon /> : <MoonIcon />}
        </div>
        {/* <div onClick={!session ? signIn : ()=>Router.push('/dashboard')} className='cursor-pointer inline-flex items-center justify-center text-sm font-medium transition-colors h-9 rounded-md w-9 px-0' >
            {!session ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 0.72 0.72"><path d="M.36.06a.3.3 0 1 0 0 .6.3.3 0 0 0 0-.6zm0 .09c.05 0 .09.04.09.09S.41.33.36.33.27.29.27.24.31.15.36.15zm0 .426A.216.216 0 0 1 .18.479C.181.419.3.387.36.387S.539.42.54.479a.216.216 0 0 1-.18.097z" fill="currentColor" /></svg>:<img
              src={session?.user.image || "/user-placeholder.png"}
              alt={session?.user.name || "User"}
              className="h-6 w-6 rounded-full object-cover mr-2"
            />}</div> */}
      </nav>
    </header>
  );
}

export default Header;
