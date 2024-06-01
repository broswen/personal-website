import Image from "next/image";
import Link from "next/link";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Contact Me",
};

export default function Home() {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Contact Me</h1>
      <p className="mb-4">
        If you have questions for me, the easiest way to each me is through email or my <Link href="https://linkedin.com/in/bradley-swenson">LinkedIn account</Link> if it&apos;s work related.
      </p>
      <p className="mb-4">
        The following address is a proxy email address set up using <Link href="https://developers.cloudflare.com/email-routing/">Cloudflare Email Routing</Link>, so you will receive a reply from a different email.
      </p>
      <p className="mb-4">
        <a href="mailto:me@bradswenson.com">me@bradswenson.com</a>
      </p>
    </main>
  );
}
