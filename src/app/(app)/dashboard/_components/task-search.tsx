"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Props = {
  onSearch: (query: string) => void;
  loading?: boolean;
  initialValue?: string;
};

export function TaskSearch({ onSearch, loading, initialValue = "" }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [value, setValue] = useState(initialValue);

  // Keep input in sync with ?q= param in URL
  useEffect(() => {
    const query = searchParams.get("q") || "";
    setValue(query);
    // Optionally, trigger onSearch when URL param changes (for deep linking)
    onSearch(query);
  }, [searchParams]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Create a NEW URLSearchParams object!
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (value.trim()) {
      params.set("q", value.trim());
    } else {
      params.delete("q");
    }
    // Set page=1 when new search (optional)
    params.delete("page");
    // Use router.replace to update URL
    router.replace(`?${params.toString()}`, { scroll: false });
    onSearch(value.trim());
  }

  function handleClear() {
    setValue("");
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.delete("q");
    params.delete("page");
    router.replace(`?${params.toString()}`, { scroll: false });
    onSearch("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6 max-w-md">
      <Input
        placeholder="Search tasks..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={loading}
        className="flex-1"
      />
      {value && (
        <Button
          type="button"
          variant="outline"
          onClick={handleClear}
          disabled={loading}
        >
          Clear
        </Button>
      )}
      <Button type="submit" disabled={loading}>
        Search
      </Button>
    </form>
  );
}
