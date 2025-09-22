"use client";
import useAuthorStore from "@/hooks/useAuthors";
import AuthorCard from "../autor-card/author-card";
import Link from "next/link";

function AuthorFavoritesPage() {
  const { favoriteAuthors } = useAuthorStore();

  return (
    <div>
        <div className="flex items-center justify-between bg-background p-4 shadow-md">
            <h1 className="text-3xl font-bold">Favorite Authors</h1>
            <div>
                <Link href="/" className="button rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600 m-2">Volver</Link>
            </div>
        </div>
        <div>
        <div className="grid-cols-2 gap-4 p-4 md:grid">
            {favoriteAuthors.map((author) => (
            <AuthorCard author={author} key={author.name} />
            ))}
        </div>
        </div>
    </div>
  );
}

export default AuthorFavoritesPage;