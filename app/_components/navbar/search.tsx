'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get('q') || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    const params = new URLSearchParams(searchParams as any);
    params.set('search', e.target.value);
    router.push(`?${params.toString()}`);
  };


  return (
    <div className="form-control">
      <input
        type="text"
        placeholder="Search labels"
        className="input input-bordered w-24 md:w-auto"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;
