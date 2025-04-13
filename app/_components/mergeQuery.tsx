// app/components/MergeQueryLink.tsx
'use client';

import { useSearchParams, usePathname } from 'next/navigation';
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

  // Merge or override existing params
  Object.entries(newParams).forEach(([key, value]) => {
    mergedParams.set(key, value);
  });

  const href = `${pathname}?${mergedParams.toString()}`;

  return <Link className={className} href={href}>{children}</Link>;
}
