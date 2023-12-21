import Image from "next/image";
import Link from "next/link";
import { BlogQueryResult } from "../types";
import { createClient } from "contentful";

const client = createClient({
  space: `${process.env.SPACE_ID}`,
  accessToken: `${process.env.ACCESS_TOKEN}`,
});

const getBlogEntries = async (): Promise<BlogQueryResult> => {
  const entries = await client.getEntries({ content_type: "webDev" });
  console.log(entries.items[0].fields.featuredImage[0].fields.file.url)
  return entries;
};

export default async function Home() {
  const blogEntries = await getBlogEntries();
  return (
    <main className="flex min-h-screen flex-col p-24 gap-y-8">
      <h2>BUT THIS WILL STAY THIS SAME RIGHT</h2>
      {blogEntries.items.map((singlePost) => {
        const { slug, title, date, featuredImage } = singlePost.fields;

        return (
          <div key={slug}>
            <Link className="group" href={`/webdev/${slug}`}>
              <Image
                src={`https:${featuredImage[0].fields.file.url}`}
                width={200}
                height={200}
                alt="oops"
              />
              <h2 className="font-extrabold text-xl group-hover:text-blue-500 transition-colors">
                {title}
              </h2>

              <span>
                Posted on{" "}
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </Link>
          </div>
        );
      })}
    </main>
  );
}