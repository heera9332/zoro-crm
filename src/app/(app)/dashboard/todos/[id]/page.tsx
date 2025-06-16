"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { axios } from "@/lib/axios";
import Loader from "../../_components/loader";
import Content from "../../_components/loader";
import Image from "next/image";

export default function TodoPage() {
  const { id } = useParams();
  const [todo, setTodo] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/todos/${id}`);
        setTodo(res.data);
      } catch (err) {
        console.error("Failed to load todo:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTodo();
  }, [id]);

  if (loading || !todo) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader />
      </div>
    );
  }

  const {
    title,
    status,
    priority,
    dueDate,
    createdAt,
    updatedAt,
    featuredImage,
    assignedTo,
    project,
    notes,
  } = todo;

  return (
    <div className="app-page px-2 pb-8">
      <div className="mb-8 flex flex-col sm:flex-row gap-8">
        {/* Left Column */}
        <div className="flex-1">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>Status: <span className="capitalize">{status}</span></span>
              <span>Priority: <span className="capitalize">{priority}</span></span>
              {dueDate && (
                <span>
                  Due: {new Date(dueDate).toLocaleDateString()}{" "}
                  {new Date(dueDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>
          </div>

          <div className="prose max-w-none border bg-gray-50 p-4 rounded">
            <Content {...todo} />
          </div>

          {notes?.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Notes</h2>
              <div className="space-y-2">
                {notes.map((note: any) => (
                  <div
                    key={note.id}
                    className="border-l-4 border-orange-400 pl-4 bg-orange-50/70 py-2 rounded"
                  >
                    <a
                      href={`/dashboard/notes/${note.id}`}
                      className="text-orange-800 font-medium hover:underline"
                    >
                      {note.title}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="w-full sm:w-72 flex-shrink-0">
          {featuredImage?.url && (
            <div className="mb-6">
              <div className="overflow-hidden border border-gray-100 bg-orange-50 p-2 rounded-xl">
                <Image
                  src={featuredImage.url}
                  width={featuredImage.width || 360}
                  height={featuredImage.height || 180}
                  alt={featuredImage.alt || "Todo image"}
                  className="rounded-lg object-cover w-full h-auto"
                />
              </div>
            </div>
          )}

          <div className="text-sm text-gray-600 space-y-1">
            <div>
              <span className="font-medium">Created:</span>{" "}
              {new Date(createdAt).toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Updated:</span>{" "}
              {new Date(updatedAt).toLocaleString()}
            </div>
            {assignedTo?.length > 0 && (
              <div>
                <span className="font-medium">Assigned To:</span>{" "}
                <span className="text-gray-500">{assignedTo.join(", ")}</span>
              </div>
            )}
            {project?.title && (
              <div>
                <span className="font-medium">Project:</span>{" "}
                <span className="text-gray-500">{project.title}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
