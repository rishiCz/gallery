import Link from "next/link";
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/images');
  return (
    <main className="p-24 h-full">
      <div className="card w-96 bg-primary text-primary-content">
        <div className="card-body">
          <h2 className="card-title">Welcome</h2>
          <p>Hello, Click on Image button above to go to see all images or go to admin route and configure imagess</p>
          <div className="card-actions justify-end">
          <Link href={'/images'} className="btn">Continue</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
