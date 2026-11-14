export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 animate-ping" />
        <div className="absolute inset-0 rounded-full border-4 border-t-cyan-500 border-r-cyan-400 border-b-transparent border-l-transparent animate-spin" />
      </div>
      <p className="mt-4 text-sm font-medium text-slate-400 animate-pulse">
        Loading syllabus-compliant resources...
      </p>
    </div>
  );
}

