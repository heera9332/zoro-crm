// components/notification-search.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NotificationSearchProps {
  initialValue?: string;
  loading?: boolean;
  onSearch: (q: string) => void;
}

export function NotificationSearch({
  initialValue = "",
  loading = false,
  onSearch,
}: NotificationSearchProps) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
    // update URL
    const params = new URLSearchParams(window.location.search);
    params.set("q", value);
    params.delete("page");
    window.history.replaceState({}, "", `?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <Input
        placeholder="Search notifications..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={loading}
      />
      <Button type="submit" disabled={loading}>
        Search
      </Button>
    </form>
  );
}
