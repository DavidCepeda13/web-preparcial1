"use client";
import useAuthorStore from "@/hooks/useAuthors";
import { Author } from "@/types/Author";
import Link from "next/link";
import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authorSchema, AuthorFormData } from "@/types/validations/authorSchema";


export default function AuthorEditPage({ params }: { params: Promise<{ authorId: string }> }) {
    const { register, handleSubmit, formState: { errors }} = useForm<AuthorFormData>({
        resolver: zodResolver(authorSchema),
    });

    const { authorId } = use(params);
    const id = decodeURIComponent(authorId);
    const { getAuthorById, updateAuthor } = useAuthorStore();
    const author = getAuthorById(id);

    const [name, setName] = useState(author?.name || "");
    const [birthDate, setBirthDate] = useState(author?.birthDate || "");
    const [description, setDescription] = useState(author?.description || "");
    const [image, setImage] = useState(author?.image || "");

    const onSubmit = () => {
        const updatedAuthor: Author = { id: author?.id, name, birthDate, description, image };
        updateAuthor(updatedAuthor);
        alert("Author updated successfully!");
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
        <h1>Author Edit Page {id}</h1>
        <form className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md w-full items-center justify-center text-center" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4" role="alert">
            <label className="mb-2 block font-bold" htmlFor="name">Name:</label>
            <input
                {...register("name")}
                className="border border-gray-300 p-2 w-full rounded"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-describedby="name-error"
                aria-invalid={!!errors.name}
            />
            {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div className="mb-4" role="alert">
            <label className="mb-2 block font-bold" htmlFor="birthDate">Birth Date:</label>
            <input
                {...register("birthDate")}
                className="border border-gray-300 p-2 w-full rounded"
                type="text"
                id="birthDate"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                aria-describedby="birthDate-error"
                aria-invalid={!!errors.birthDate}
            />
            {errors.birthDate && <p>{errors.birthDate.message}</p>}
            </div>
            <div className="mb-4" role="alert">
            <label className="mb-2 block font-bold" htmlFor="description">Description:</label>
            <textarea
                {...register("description")}
                className="border border-gray-300 p-2 w-full rounded"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                aria-describedby="description-error"
                aria-invalid={!!errors.description}
            />
            {errors.description && <p>{errors.description.message}</p>}
            </div>
            <div className="mb-4" role="alert">
            <label className="mb-2 block font-bold" htmlFor="image">Image URL:</label>
            <input
                {...register("image")}
                className="border border-gray-300 p-2 w-full rounded"
                type="text"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                aria-describedby="image-error"
                aria-invalid={!!errors.image}
            />
            {errors.image && <p>{errors.image.message}</p>}
            </div>
            <Link href="/" className="button bg-gray-500 text-white px-2 py-3 rounded mr-4">Back</Link>
            <button className="button bg-green-500 text-white p-2 rounded"
            type="submit"
            >
            Update Author
            </button>
        </form>
        </div>
    );
}