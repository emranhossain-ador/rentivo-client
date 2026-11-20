"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { Menu, Moon, Sun, User, UserPlus, Wrench, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "cn";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import UserDropdownBtn from "./UserDropdownBtn";
import { UserType } from "@/lib/type/userType";

type Theme = "light" | "dark";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Equipment", href: "/equipment" },
  { label: "Categories", href: "/categories" },
  { label: "About Us", href: "/about" },
] as const;

const NAV_LINK_CLASS = "flex items-center px-4 py-2 font-medium hover:text-brand text-sm whitespace-nowrap transition-colors text-foreground";
const ACTIVE_NAV_LINK_CLASS = "flex items-center px-4 py-2 bg-brand/5 border border-brand/50 rounded-lg font-medium text-sm whitespace-nowrap text-brand";


function ThemeToggle({
  theme,
  onChange,
  className,
}: {
  theme: Theme;
  onChange: (theme: Theme) => void;
  className?: string;
}) {
  const options = [
    { value: "light", label: "Switch to light mode", Icon: Sun },
    { value: "dark", label: "Switch to dark mode", Icon: Moon },
  ] as const;

  return (
    <div
      role="group"
      aria-label="Color theme"
      className={cn(
        "items-center gap-0.5 rounded-full border border-border bg-muted/70 p-1",
        className
      )}
    >
      {options.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          aria-label={label}
          aria-pressed={theme === value}
          onClick={() => onChange(value)}
          className={cn(
            "flex size-7 items-center justify-center rounded-full transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/60",
            theme === value
              ? "bg-background text-brand shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon className="size-4" />
        </button>
      ))}
    </div>
  );
}



function subscribeToTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  window.addEventListener("storage", callback);
  return () => {
    observer.disconnect();
    window.removeEventListener("storage", callback);
  };
}

const getThemeSnapshot = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

const getServerThemeSnapshot = (): Theme => "light";



const TopNavbar = () => {

  const pathname = usePathname();
  const session = useSession();
  const user = session.data?.user as UserType;

  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );
  const [mobileOpen, setMobileOpen] = useState(false);


  const handleThemeChange = (next: Theme) => {
    // No setState needed: the MutationObserver subscription above re-renders.
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage unavailable (private mode) — theme still applies for this visit.
    }
  };

  if (pathname.startsWith('/dashboard')) return null;


  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="RentalHub home"
          className="flex shrink-0 items-center gap-2.5 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Image src={'/image/logo.png'} width={32} height={32} alt='Rentivo logo' className="h-9 w-fit object-cover" />
        </Link>

        <nav
          aria-label="Main navigation"
          className="ml-10 hidden items-center gap-1 lg:flex"
        >
          {
            NAV_LINKS.map((link) => (

              <Link
                key={link.label}
                href={link.href}
                className={link.href === pathname ? ACTIVE_NAV_LINK_CLASS : NAV_LINK_CLASS}
              >
                {link.label}
              </Link>
            ))
          }

        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">

          <ThemeToggle
            theme={theme}
            onChange={handleThemeChange}
            className="hidden sm:flex"
          />

          <span className="hidden h-6 w-px bg-border sm:block" aria-hidden="true" />

          {
            user ?
              <UserDropdownBtn user={user} />
              :
              <>
                <Link href={'/sign-in'}
                  className="hidden h-10 rounded-full px-4 font-semibold sm:inline-flex items-center gap-1.5 text-sm border border-border transition-colors hover:border-brand/60 hover:text-brand cursor-pointer"
                >
                  <User className="size-4" />
                  Login
                </Link>

                <Link href={'/sign-up'} className="hidden h-10 sm:flex items-center text-sm gap-2 rounded-full bg-brand px-4 font-semibold text-white hover:bg-brand/90 dark:text-white cursor-pointer">
                  <UserPlus className="size-4" />
                  Register
                </Link>
              </>
          }



          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted outline-none focus-visible:ring-3 focus-visible:ring-ring/50 lg:hidden"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav
            aria-label="Mobile navigation"
            className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6"
          >
            {NAV_LINKS.map((link) =>
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(link.href === pathname ? ACTIVE_NAV_LINK_CLASS : NAV_LINK_CLASS, "w-full py-2.5")}
              >
                {link.label}
              </Link>
            )}

            {/* Actions hidden from the top bar on small screens. */}
            <div className="mt-3 flex flex-col gap-3 border-t border-border pt-4 sm:hidden">
              <ThemeToggle
                theme={theme}
                onChange={handleThemeChange}
                className="flex w-fit"
              />
              <div className="flex gap-3">
                <Link href={'/sign-in'}
                  className="h-12 flex-1 gap-2 rounded-full font-semibold flex items-center justify-center border border-border text-foreground hover:border-brand/60 hover:text-brand"
                >
                  <User className="size-4" />
                  Login
                </Link>
                <Link href={'/sign-up'} className="h-12 flex-1 gap-2 rounded-full flex items-center justify-center bg-brand font-semibold text-white hover:bg-brand/90 ">
                  <UserPlus className="size-4" />
                  Register
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default TopNavbar;