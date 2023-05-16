import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const CreatePostWizard = () => {
	const { user } = useUser();

	if (!user) return null;

	return (
		<div className="flex w-full gap-3">
			<UserButton appearance={{
				elements: {
					userButtonAvatarBox: {
						width: 56,
						height: 56
					}
				}
			}} />
			<input
				type="text"
				placeholder="Type some emoji"
				className="bg-transparent grow outline-none"
			/>
		</div>
	)
}

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

const PostView = (props: PostWithUser) => {
	const { post, author } = props;

	console.log("Author", author)
	return (
		<div key={post.id} className="border-b border-slate-400 p-4 flex-row flex">
			<Image src={author.profileImageUrl} alt={`@${author.username}'s profile picture`} width={64} height={64} className=" rounded-full gap-3" />
			<div className="flex flex-col">
				<div className="flex lowercase">
					<span>{`@${author.username} • ${dayjs(post.createdAt).fromNow()}`}</span>
				</div>
				<span>{post.content}</span>
			</div>
		</div>
	)
}

const Home: NextPage = (props) => {
	const user = useUser();

	const { data, isLoading } = api.posts.getAll.useQuery();

	if (isLoading) return <div>Loading...</div>;

	if (!data) return <div>Something went wrong</div>;

	return (
		<>
			<Head>
				<title></title>
				<meta name="description" content="covert-alchemy" />
				<link rel="icon" href="/alchemy_bottle.png
				" />
			</Head>
			<main className="flex justify-center h-screen">
				<div className="bg-slate-200 w-full md:max-w-2xl border-slate-400 border-x">
					<div className="border-b border-slate-400 flex p-4">
						{!user.isSignedIn && (<div className="flex justify-center">
							<SignInButton />
						</div>
						)}
						{!!user.isSignedIn && <CreatePostWizard />}
					</div>
					<div className="flex flex-col">
						{[...data, ...data]?.map((fullPost) => (
							<PostView {...fullPost} key={fullPost.post.id} />
						))}
					</div>
				</div>
			</main>
		</>
	);
};

export default Home;
