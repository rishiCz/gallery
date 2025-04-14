// app/components/MergeQueryLink.tsx
'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

type MergeQueryLinkProps = {
  newParams: Record<string, string>;
  children: React.ReactNode;
  className?:string
};

export default function MergeQueryLink({ newParams, children,className }: MergeQueryLinkProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const mergedParams = new URLSearchParams(searchParams as any);
  const router = useRouter()

  // Merge or override existing params
  Object.entries(newParams).forEach(([key, value]) => {
    mergedParams.set(key, value);
  });

  const href = `${pathname}?${mergedParams.toString()}`;
  const navigate = ()=>{
    router.push(href)

  }
  
  return <div className={className} onClick={navigate}>{children}</div>;
}
