import { Author } from "@/types/Author";
import Link from "next/link";
import Image from "next/image";
import useAuthorStore from "@/hooks/useAuthors";

import { useState } from "react";

function AuthorCard({ author }: { author: Author }) {
    const { favoriteAuthors, removeAuthor, addFavoriteAuthor, removeFavoriteAuthor } = useAuthorStore();
    const [isFavorite, setIsFavorite] = useState(favoriteAuthors.includes(author));

    function handleFavoriteClick({ author }: { author: Author }) {
        if (favoriteAuthors.includes(author)) {
            setIsFavorite(false);
            removeFavoriteAuthor(author);
        } else {
            setIsFavorite(true);
            addFavoriteAuthor(author);
        }
    }

    return (
        <div className="card flex flex-row items-center gap-6 p-7 md:flex-row md:gap-8 rounded-2xl shadow-xl" key={author.name}>
            <Image className="rounded" src={author.image} alt={author.name} width={100} height={100} />
            <div className="flex flex-col gap-3">
              <div className="grid-rows-1 flex items-center">
                <h2 className="text-2xl font-bold">{author.name}</h2>
                <div className="grid-cols-2 flex ml-auto">
                  <button className="button rounded bg-purple-500 px-3 py-1 " 
                    onClick={() => handleFavoriteClick({ author })}>{favoriteAuthors.includes(author) ? <i className="bi bi-heart-fill text-white"
                    aria-label={isFavorite ? `Remove ${author.name} from favorites` : `Add ${author.name} to favorites`}
                    aria-pressed={isFavorite ? "true" : "false"}>
                    </i> : <i className="bi bi-heart text-white"></i>}</button>
                  <Link className="button ml-4 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                    tabIndex={0} href={`/author-edit/${author.name}`}
                    aria-label={`Edit ${author.name}`} >
                    <i className="bi bi-pencil-square"></i></Link>
                  <button className="button ml-2 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600" 
                    onClick={() => removeAuthor(author)}
                    aria-label={`Remove ${author.name}`} >
                    <i className="bi bi-trash3"></i></button>
                </div>
              </div>
              <p className="text-gray-600">Born: {author.birthDate}</p>
              <p className="text-gray-800">{author.description}</p>
            </div>
          </div>
    );
}

export default AuthorCard;