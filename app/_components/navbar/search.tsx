'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

function Search() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const router = useRouter()


  return (
    <div className="form-control">
      <input
        type="text"
        placeholder="Search labels"
        className="input input-bordered w-24 md:w-auto"
        defaultValue={search || ''}
        onChange={(e)=>router.push(`?search=${e.target.value}`)}
      />
    </div>
  );
}

export default Search;
