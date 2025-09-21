"use client";
import useAuthorStore from "@/hooks/useAuthors";
import { Author } from "@/types/Author";
import Link from "next/link";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authorSchema, AuthorFormData } from "@/types/validations/authorSchema";

export default function AuthorFormPage() {
  const { register, handleSubmit, formState: { errors }} = useForm<AuthorFormData>({
    resolver: zodResolver(authorSchema),
  });

  const { addAuthor } = useAuthorStore();
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  function onSubmit() {
    const newAuthor: Author = { name, birthDate, description, image };
    addAuthor(newAuthor);
    setName("");
    setBirthDate("");
    setDescription("");
    setImage("");
    alert("Author added successfully!");
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <form className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md w-full items-center justify-center text-center" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="mb-4 text-3xl font-bold">Add Author</h1>
        <div className="mb-4">
          <label className="mb-2 block font-bold" htmlFor="name">Name:</label>
          <input 
            {...register("name")}
            className="w-full rounded border p-2" 
            type="text" id="name" name="name" 
            required value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label className="mb-2 block font-bold" htmlFor="birthDate">Birth Date:</label>
          <input 
            {...register("birthDate")}
            className="w-full rounded border p-2" 
            type="date" id="birthDate" name="birthDate" 
            required value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
            {errors.birthDate && <p>{errors.birthDate.message}</p>}
        </div>
        <div className="mb-4">
          <label className="mb-2 block font-bold" htmlFor="description">Description:</label>
          <textarea 
            {...register("description")}
            className="w-full rounded border p-2" 
            id="description" name="description" 
            required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            {errors.description && <p>{errors.description.message}</p>}
        </div>
        <div className="mb-4">
          <label className="mb-2 block font-bold" htmlFor="image">Image URL:</label>
          <input 
            {...register("image")}
            className="w-full rounded border p-2" 
            type="url" id="image" name="image" 
            required value={image} onChange={(e) => setImage(e.target.value)} />
            {errors.image && <p>{errors.image.message}</p>}
        </div>
        <Link href="/" className="button rounded bg-gray-500 px-4 py-3 font-bold text-white mr-4">Back</Link>
        <button className="button rounded bg-green-500 px-4 py-2 font-bold text-white" type="submit">Create</button>
      </form>
    </div>
  );
}
