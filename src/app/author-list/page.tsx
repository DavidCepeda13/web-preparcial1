"use client";
import { useEffect } from "react";
import useAuthorStore from "@/hooks/useAuthors";
import Link from "next/link";
import AuthorCard from "../autor-card/author-card";

function AuthorListPage() {
  const { authors, favoriteAuthors, loading, error, fetchAuthors } = useAuthorStore();

  useEffect(() => {
    fetchAuthors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between bg-background p-4 shadow-md">
        <h1 className="text-3xl font-bold">Author List</h1>
        <div>
          <Link href="/author-favorites" className="button rounded bg-purple-500 px-4 py-2 font-bold text-white hover:bg-purple-600 m-2">View Favorites ({favoriteAuthors.length})</Link>
          <Link href="/author-form" className="button rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600 m-2">Add Author</Link>
        </div>
      </div>
      <div className="grid-cols-2 gap-4 p-4 md:grid">
        {loading && <p>Loading authors...</p>}
        {error && <p>Error fetching authors: {error}</p>}
        {authors.map((author) => (
          <AuthorCard author={author} key={author.name} />
        ))}
      </div>
    </div>
  );
}

export default AuthorListPage;