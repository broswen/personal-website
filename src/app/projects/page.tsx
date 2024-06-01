import Image from "next/image";
import Link from "next/link";
import type {Metadata} from "next";
import {useMemo} from "react";
import { getRequestContext } from "@cloudflare/next-on-pages";
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";

export const runtime = "edge";

interface pinnedItemsResponse {
    user: {
        pinnedItems: {
            nodes: Repository[]
        }
    }
}

interface Repository {
    name: string
    description: string
    url: string
    stargazerCount: number
    languages: {
        nodes: {name: string}[]
    }
}

export const metadata: Metadata = {
    title: "Projects",
};

// github graphql api query that returns pinned repositories
const pinnedReposQuery = {
    query: `{
	user(login: "broswen") {
		pinnedItems(first: 10, types: [REPOSITORY]) {
			nodes {
				... on Repository {
					name
					description
					url
				    stargazerCount	
					languages(first: 3) {
						nodes {
							name
						}
					}
				}
			}
		}
	}
}`
};

export default async function Home() {
    // load from local .env via node env vars for local testing, in production it will be undefined and use the worker context binding
    const token = process.env.GITHUB_API_TOKEN ?? getRequestContext().env.GITHUB_API_TOKEN;
    const client = new ApolloClient({
        uri: "https://api.github.com/graphql",
        cache: new InMemoryCache(),
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    let res = await client.query<pinnedItemsResponse>({
        query: gql`
	    query {
	        user(login: "broswen") {
	        	pinnedItems(first: 10, types: [REPOSITORY]) {
	        		nodes {
	        			... on Repository {
	        				name
	        				description
	        				url
	        			    stargazerCount	
	        				languages(first: 3) {
	        					nodes {
	        						name
	        					}
	        				}
	        			}
	        		}
	        	}
	        }
	    }`
    });
    return (
        <main>
            <h1 className="text-2xl font-bold mb-4">Projects</h1>
            <p className="mb-4">All of my projects are hosted on <Link href="https://github.com/broswen">my
                GitHub page</Link>.</p>
            <h2 className="text-xl mb-4">Pinned Projects</h2>
            <div className="flex-col">
                {
                    res.error && <p>Error loading projects.</p>
                }
                {
                    res.data && res.data.user.pinnedItems.nodes.map((repo) => {
                        return (
                            <div key={repo.name}
                                 className="p-4 mb-4 border-2 border-gray-200 hover:bg-gray-300 hover:border-gray-400">
                                <Link className="underline font-bold decoration-dotted hover:decoration-solid"
                                      href={repo.url}><h3>{repo.name}</h3></Link>
                                <p>{repo.description}</p>
                                <p className="flex flex-row align-center"><Image className="inline-block align-middle" width="24" height="24" src="/star-svgrepo-com.svg" alt="star"/> {repo.stargazerCount}</p>
                                <p className="text-xs">
                                    {
                                        repo.languages.nodes.map((l) => l.name).join(", ")
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
