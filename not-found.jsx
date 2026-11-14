import Link from "next/link";
import { Ghost, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found | ClubPulse",
  description: "The requested resource could not be found.",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 shadow-xl shadow-cyan-500/10 animate-bounce">
        <Ghost className="w-10 h-10" />
      </div>

      <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 rounded-full mb-3">
        404 Error
      </span>
      <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl mb-3">
        Page Not Found
      </h1>
      <p className="text-slate-400 max-w-md text-sm mb-8">
        The route you are trying to access does not exist or has been moved within the App Router structure.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-sm shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>
    </div>
  );
}

