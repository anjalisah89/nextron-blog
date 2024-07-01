import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?s=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="sticky top-0 z-50 w-full lg:pl-10 lg:pr-12 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center">
          <Link
            className="lg:mr-6 ml-2 mr-2 flex items-center space-x-2"
            href="/"
          >
            <Image
              src="/image/logo.svg"
              className="h-8 w-8"
              width={800}
              height={800}
              alt=""
            />
            <span className="hidden font-bold sm:inline-block">NEXTRON</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center p-8 gap-4 text-sm lg:gap-6">
          <Link
            className="transition-colors hover:text-foreground/80 text-foreground/60 no-underline md:hover:underline"
            href="/"
          >
            Home
          </Link>
          <Link
            className="transition-colors hover:text-foreground/80 text-foreground/60 no-underline md:hover:underline"
            href="/"
          >
            About
          </Link>
          <Link
            className="transition-colors hover:text-foreground/80 text-foreground/60 no-underline md:hover:underline"
            href="/articles"
          >
            Articles
          </Link>
          <Link
            className="transition-colors hover:text-foreground/80 text-foreground/60 no-underline md:hover:underline"
            href="/research"
          >
            Research
          </Link>
          <Link
            className="transition-colors hover:text-foreground/80 text-foreground/60 no-underline md:hover:underline"
            href="/contact-us"
          >
            Contact
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none relative mr-2">
            <form
              action="#"
              method="GET"
              className="flex items-center justify-center relative"
              onSubmit={handleSearchSubmit}
            >
              <input
                type="text"
                name="search"
                placeholder="Search..."
                onChange={handleSearch}
                value={searchQuery}
                className="bg-background text-sm text-muted-foreground border border-input rounded-[0.5rem] px-4 py-2 focus:outline-none focus:ring focus:border-accent w-full shadow-none sm:pr-12 md:w-40 lg:w-64"
              />
              <button
                type="submit"
                className="bg-accent hover:bg-accent-hover text-accent-foreground px-2 py-2 rounded-r-[0.5rem] ml-[-1px] absolute right-0 top-0 bottom-0"
              >
                <Image
                  src="/image/search.svg"
                  className="h-6 w-6 rounded-[0.5rem]"
                  width={24}
                  height={24}
                  alt="Search"
                />
              </button>
            </form>
          </div>
          <nav className="hidden md:flex items-center">
            <Link
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
            </Link>
          </nav>
        </div>
        <div className="flex items-center md:hidden mr-2">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            <Image
              src="/image/menu.svg"
              className="h-6 w-6"
              width={24}
              height={24}
              alt="Menu"
            />
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col items-start bg-background/95 backdrop-blur p-4 space-y-4">
          <Link
            className="transition-colors hover:text-foreground/80 text-foreground/60"
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            className="transition-colors hover:text-foreground/80 text-foreground/60"
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            className="transition-colors hover:text-foreground/80 text-foreground/60"
            href="/articles"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Articles
          </Link>
          <Link
            className="transition-colors hover:text-foreground/80 text-foreground/60"
            href="/research"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Research
          </Link>
          <Link
            className="transition-colors hover:text-foreground/80 text-foreground/60"
            href="/contact-us"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
