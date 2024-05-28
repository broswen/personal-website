import type { Metadata } from "next";
import {Inter, PT_Mono, PT_Sans, Roboto, Roboto_Mono, Roboto_Slab} from "next/font/google";
import "./globals.css";
import Link from "next/link";
import {usePathname} from "next/navigation";

const ptSans = PT_Sans({
  weight: ["400", "700"],
  display: "swap",
  subsets: ["latin"]
});

const robotoSlab = Roboto_Slab({
  weight: ["700"],
  display: "swap",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Brad Swenson",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ptSans.className} text-xl`}>
    <body className="flex flex-col min-h-screen lg:flex-row">
      <div className="sidebar min-w-fit bg-gray-300 flex flex-col text-center justify-center p-4 lg:text-left lg:justify-start lg:p-8">
        <div className="mb-4 lg:mb-4">
          <h1 className={`text-3xl font-bold ${robotoSlab.className}`}>
            Brad Swenson
          </h1>
        </div>
        <nav className="mb-8 lg:mb-8">
          <ul className="flex flex-row justify-evenly lg:flex-col lg:gap-1">
            <li>
              <Link className={"underline decoration-dotted hover:decoration-solid"} href="/">About Me</Link>
            </li>
            <li>
              <Link className="underline decoration-dotted hover:decoration-solid" href="/cv">CV</Link>
            </li>
            <li>
              <Link className="underline decoration-dotted hover:decoration-solid" href="/projects">Projects</Link>
            </li>
            <li>
              <Link className="underline decoration-dotted hover:decoration-solid" href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="text-xs">
          Copyright ©2024 Brad Swenson
        </div>
      </div>
      <div className="content flex-grow p-8 lg:py-16 lg:px-6">
        {children}
      </div>
    </body>
    </html>
  );
}
