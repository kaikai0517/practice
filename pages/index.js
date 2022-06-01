import Link from "next/link";
import Button from "../components/button";

const Index = () => (
	<div>
		<Link href="/about">
			<a>About Page</a>
		</Link>
		<p className="text-3xl font-bold underline">Hello Next.js</p>
		<Button></Button>
	</div>
);

export default Index;
