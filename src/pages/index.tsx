import { SignIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

const Home: NextPage = (props) => {
	const user = useUser();

	const { data } = api.posts.getAll.useQuery();

	return (
		<>
			<Head>
				<title></title>
				<meta name="description" content="covert-alchemy" />
				<link rel="icon" href="/alchemy_bottle.png
				" />
			</Head>
			<main className="flex min-h-screen flex-col text-white items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
				<div>
					{!user.isSignedIn && <SignInButton />}
					{!!user.isSignedIn && <UserButton />}
				</div>
				<div>
					{data?.map((post) => (<div key={post.id}>{post.content}</div>))}
				</div>
			</main>
		</>
	);
};

export default Home;
