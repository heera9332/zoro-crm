// components/ProjectSearch.tsx
"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
  onSearch: (query: string) => void;
  loading?: boolean;
  initialValue?: string;
};

export function ProjectSearch({ onSearch, loading, initialValue = "" }: Props) {
  const [value, setValue] = useState(initialValue);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch(value.trim());
  }

  function handleClear() {
    setValue("");
    onSearch("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6 max-w-md">
      <Input
        placeholder="Search projects…"
        value={value}
        onChange={e => setValue(e.target.value)}
        disabled={loading}
        className="flex-1"
      />
      {value && (
        <Button type="button" variant="outline" onClick={handleClear} disabled={loading}>
          Clear
        </Button>
      )}
      <Button type="submit" disabled={loading}>
        Search
      </Button>
    </form>
  );
}
