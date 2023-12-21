import { BlogItem } from "@/app/types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { createClient } from "contentful";
import Image from 'next/image';

const client = createClient({
  space: `${process.env.SPACE_ID}`,
  accessToken: `${process.env.ACCESS_TOKEN}`,
});

type BlogPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const queryOptions = {
    content_type: "webDev",
    select: "fields.slug",
  };

  const articles = await client.getEntries(queryOptions);
  return articles.items.map((article) => ({
    slug: article.fields.slug,
  }));
}

const fetchBlogPost = async (slug: string): Promise<BlogItem> => {
  const queryOptions = {
    content_type: "webDev",
    "fields.slug[match]": slug,
  };
  const queryResult = await client.getEntries(queryOptions);
  console.log(queryResult.items[0]);
  // const formResult = {
  //   fields: {
  //     title: queryResult.items[0].fields.title,
  //     slug: queryResult.items[0].fields.slug,
  //     date: queryResult.items[0].fields.date,
  //     content: queryResult.items[0].fields.content,
  //     featuredImage: queryResult.items[0].fields.featuredImage,
  // }
    
  // }
  return queryResult.items[0];
};

export default async function BlogPage(props: BlogPageProps) {
  const { params } = props;
  const { slug } = params;
  const article = await fetchBlogPost(slug);
  const { title, date, content, featuredImage } = article.fields;

  return (
    <main className="min-h-screen p-24 flex justify-center">
      <div className="max-w-2xl">
      <Image
                src={`https:${featuredImage[0].fields.file.url}`}
                width={200}
                height={200}
                alt="oops"
              />
        <h1 className="font-extrabold text-3xl mb-2">{title}</h1>

        <p className="mb-6 text-slate-400 ">
          Posted on{" "}
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className="[&>p]:mb-8 [&>h2]:font-extrabold">
          {documentToReactComponents(content)}
        </div>
      </div>
    </main>
  );
}