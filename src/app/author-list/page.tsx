"use client";
import { useEffect } from "react";
import useAuthorStore from "@/hooks/useAuthors";
import Link from "next/link";

function AuthorListPage() {
  const { authors, loading, error, fetchAuthors, removeAuthor } = useAuthorStore();

  useEffect(() => {
    fetchAuthors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between bg-background p-4 shadow-md">
        <h1 className="text-3xl font-bold">Author List</h1>
        <Link href="/author-form" className="button rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600">Add Author</Link>
      </div>
      <div className="grid-cols-2 gap-4 p-4 md:grid">
        {loading && <p>Loading authors...</p>}
        {error && <p>Error fetching authors: {error}</p>}
        {authors.map((author) => (
          <div className="card flex flex-row items-center gap-6 p-7 md:flex-row md:gap-8 rounded-2xl shadow-xl" key={author.name}>
            <div className="flex flex-col gap-3">
              <div className="grid-rows-1 flex items-center">
                <h2 className="text-2xl font-bold">{author.name}</h2>
                <div className="grid-cols-2 flex ml-auto">
                  <Link href={`/author-edit/${author.name}`} className="button ml-4 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"><i className="bi bi-pencil-square"></i></Link>
                  <button className="button ml-2 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600" onClick={() => removeAuthor(author)}><i className="bi bi-trash3"></i></button>
                </div>
              </div>
              <p className="text-gray-600">Born: {author.birthDate}</p>
              <p className="text-gray-800">{author.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuthorListPage;