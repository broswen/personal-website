import Image from "next/image";
import Link from "next/link";
import data from "./data.json"
import type {Metadata} from "next";

interface Repository {
    title: string
    description: string
    languages: string[]
    url: string
}

export const metadata: Metadata = {
    title: "Projects",
};

export default function Home() {
  return (
      <main className="">
          <h1 className="text-2xl font-bold mb-4">Projects</h1>
          <p className="mb-4">All of my projects are hosted on <Link className="underline decoration-dotted hover:decoration-solid" href="https://github.com/broswen">my GitHub page</Link>.</p>
          <h2 className="text-xl mb-4">Starred Projects</h2>
          <div className="flex-col">
          {
              // TODO load this data from github using graphql
              data.map((repo) => {
                  return (
                      <div key={repo.title} className="p-4 mb-4 border-2 border-gray-200 hover:bg-gray-300 hover:border-gray-400">
                          <Link className="underline font-bold" href={repo.url}><h3>{repo.title}</h3></Link>
                          <p>{repo.description}</p>
                          <p className="text-sm">
                              {
                                  repo.languages.join(", ")
                              }
                          </p>
                      </div>
                  )
              })
          }
          </div>
      </main>
  );
}
