import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <div>
      <header className="sticky top-0 z-50 w-full lg:pl-12 lg:pr-12 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 hidden md:flex">
            <a className="mr-8 flex items-center space-x-2" href="/">
              <Image
                src="/image/logo.svg"
                className="h-8 w-8"
                width={800}
                height={800}
                alt=""
              />
              <span className="hidden font-bold sm:inline-block">NEXTRON</span>
            </a>
            <nav className="flex items-center p-8 gap-4 text-sm lg:gap-6">
              <a
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                href="/"
              >
                Home
              </a>
              <a
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                href="/blogs"
              >
                Blogs
              </a>
              <a
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                href="/"
              >
                Newsletters
              </a>
              <a
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                href="/"
              >
                Author
              </a>
              <a
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                href="/"
              >
                Featured
              </a>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none relative">
              <form
                action="#"
                method="GET"
                className="flex items-center justify-center"
              >
                <input
                  type="text"
                  name="search"
                  placeholder="Search..."
                  className="bg-background text-sm text-muted-foreground border border-input rounded-[0.5rem] px-4 py-2 focus:outline-none focus:ring focus:border-accent w-full shadow-none sm:pr-12 md:w-40 lg:w-64"
                />
                <button
                  type="submit"
                  className="bg-accent hover:bg-accent-hover text-accent-foreground px-2 py-2 rounded-r-[0.5rem] ml-[-1px] absolute right-0 top-0 bottom-0"
                >
                  <Image
                    src="/image/search.svg"
                    className="h-6 w-6"
                    width={24}
                    height={24}
                    alt=""
                  />
                </button>
              </form>
            </div>
            <nav className="flex items-center">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/anjalisah89/nextron-blog"
              >
                <Image
                  src="/image/github.svg"
                  className="h-6 w-6"
                  width={30}
                  height={30}
                  alt=""
                />
              </a>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
