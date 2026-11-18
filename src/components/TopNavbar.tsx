"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ChevronDown, Menu, Moon, Sun, User, UserPlus, Wrench, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "cn";

type Theme = "light" | "dark";

interface NavLink {
  label: string;
  href: string;
  active?: boolean;
  categories?: { label: string; href: string }[];
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/", active: true },
  {
    label: "All Equipment",
    href: "/equipment",
    categories: [
      { label: "Excavators", href: "/equipment/excavators" },
      { label: "Cranes", href: "/equipment/cranes" },
      { label: "Loaders", href: "/equipment/loaders" },
      { label: "Compactors", href: "/equipment/compactors" },
      { label: "Power Tools", href: "/equipment/power-tools" },
    ],
  },
  { label: "About Us", href: "/about" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Contact Us", href: "/contact" },
];

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

const navLinkClasses = (active?: boolean) =>
  cn(
    "flex items-center rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
    active
      ? "bg-brand font-semibold text-white shadow-sm shadow-brand/30"
      : "text-foreground/80 hover:bg-muted hover:text-foreground"
  );

/* The theme lives on <html class="dark"> (set before hydration by the inline
   script in layout.tsx). Subscribe to it instead of copying it into state —
   this keeps the toggle in sync and also picks up cross-tab changes. */
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

export default function TopNavbar() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close the "All Equipment" dropdown on outside click / Escape.
  useEffect(() => {
    if (!dropdownOpen) return;

    const handleMouseDown = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropdownOpen]);

  const handleThemeChange = (next: Theme) => {
    // No setState needed: the MutationObserver subscription above re-renders.
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage unavailable (private mode) — theme still applies for this visit.
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="RentalHub home"
          className="flex shrink-0 items-center gap-2.5 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-[#3b2417] text-white">
            <Wrench className="size-5" strokeWidth={2.5} />
          </span>
          <span className="text-xl font-extrabold tracking-tight">
            <span className="text-foreground">Rental</span>
            <span className="text-brand">Hub</span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="ml-2 hidden items-center gap-1 lg:flex"
        >
          {NAV_LINKS.map((link) =>
            link.categories ? (
              <div key={link.label} ref={dropdownRef} className="relative">
                <button
                  type="button"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  onClick={() => setDropdownOpen((open) => !open)}
                  className={cn(navLinkClasses(), "gap-1", dropdownOpen && "bg-muted text-foreground")}
                >
                  {link.label}
                  <ChevronDown
                    className={cn(
                      "size-4 transition-transform duration-200",
                      dropdownOpen && "rotate-180"
                    )}
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 z-50 pt-2">
                    <div className="w-52 rounded-2xl border border-border bg-popover p-2 shadow-xl shadow-black/5">
                      {link.categories.map((category) => (
                        <Link
                          key={category.href}
                          href={category.href}
                          onClick={() => setDropdownOpen(false)}
                          className="block rounded-xl px-3 py-2 text-sm font-medium text-foreground/85 transition-colors hover:bg-muted hover:text-foreground"
                        >
                          {category.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                aria-current={link.active ? "page" : undefined}
                className={navLinkClasses(link.active)}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <ThemeToggle
            theme={theme}
            onChange={handleThemeChange}
            className="hidden sm:flex"
          />
          <span className="hidden h-6 w-px bg-border sm:block" aria-hidden="true" />
          <Button
            variant="outline"
            className="hidden h-10 gap-2 rounded-full px-4 font-semibold sm:inline-flex"
          >
            <User className="size-4" />
            Login
          </Button>
          <Button className="h-10 gap-2 rounded-full bg-brand px-4 font-semibold text-white hover:bg-brand/90 dark:text-white">
            <UserPlus className="size-4" />
            Register
          </Button>
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
              link.categories ? (
                <div key={link.label} className="flex flex-col">
                  <button
                    type="button"
                    aria-expanded={dropdownOpen}
                    onClick={() => setDropdownOpen((open) => !open)}
                    className={cn(navLinkClasses(), "w-full justify-between py-2.5")}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "size-4 transition-transform duration-200",
                        dropdownOpen && "rotate-180"
                      )}
                    />
                  </button>
                  {dropdownOpen && (
                    <div className="mt-1 ml-5 flex flex-col gap-1 border-l-2 border-border pl-3">
                      {link.categories.map((category) => (
                        <Link
                          key={category.href}
                          href={category.href}
                          onClick={() => setMobileOpen(false)}
                          className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          {category.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={link.active ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={cn(navLinkClasses(link.active), "w-full py-2.5")}
                >
                  {link.label}
                </Link>
              )
            )}

            {/* Actions hidden from the top bar on small screens. */}
            <div className="mt-3 flex flex-col gap-3 border-t border-border pt-4 sm:hidden">
              <ThemeToggle
                theme={theme}
                onChange={handleThemeChange}
                className="flex w-fit"
              />
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="h-10 flex-1 gap-2 rounded-full font-semibold"
                >
                  <User className="size-4" />
                  Login
                </Button>
                <Button className="h-10 flex-1 gap-2 rounded-full bg-brand font-semibold text-white hover:bg-brand/90 dark:text-white">
                  <UserPlus className="size-4" />
                  Register
                </Button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
