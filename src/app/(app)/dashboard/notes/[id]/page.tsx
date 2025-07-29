"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { axios } from "@/lib/axios";
import Content from "../../../../../components/dashboard/contents";
import Loader from "../../../../../components/dashboard/loader";
import { Note } from "@/payload-types";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getNote = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/notes/${id}`);
        setNote(res.data);
      } catch (err) {
        console.error("Failed to fetch note:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) getNote();
  }, [id]);

  if (loading && !note) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <h2 className="text-2xl font-bold mb-2">Not Found</h2>
        <p className="text-gray-600">The requested note does not exist.</p>
      </div>
    );
  }

  const { title, createdAt, updatedAt, author, featuredImage } = note;

  return (
    <div className="app-page px-2 pb-8">
      <div className="mb-8 flex flex-col sm:flex-row gap-8">
        {/* Left Column */}
        <div className="flex-1">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          </div>
          <div className="prose max-w-none text-gray-800 bg-gray-50 border p-4">
            <Content {...note} />
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full sm:w-72 flex-shrink-0">
          <div className="mb-6">
            <div className="rounded-md overflow-hidden border border-gray-100 bg-orange-50 p-2">
              <Image
                src={
                  typeof featuredImage === "object" && featuredImage?.url
                    ? featuredImage.url
                    : "/placeholder.jpg"
                }
                width={featuredImage?.width || 360}
                height={featuredImage?.height || 180}
                alt={featuredImage?.alt || "project image"}
                className="rounded-lg object-cover w-full h-auto"
              />
            </div>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <div>
              <span className="font-medium">Created:</span>{" "}
              {createdAt && new Date(createdAt).toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Updated:</span>{" "}
              {updatedAt && new Date(updatedAt).toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Author:</span>{" "}
              {typeof author === "string" ? author : author?.firstName || "Unknown"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
