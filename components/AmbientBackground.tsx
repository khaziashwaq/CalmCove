"use client";

const AmbientBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Warm cream base */}
      <div className="absolute inset-0 bg-[#fffcf5]" />

      {/* CSS-animated ambient blobs - no JS overhead */}
      <div className="absolute -top-1/4 -right-1/4 h-[800px] w-[800px] rounded-full bg-sand-100/50 blur-[100px] animate-ambient-1" />
      <div className="absolute -bottom-1/4 -left-1/4 h-[700px] w-[700px] rounded-full bg-sand-200/30 blur-[100px] animate-ambient-2" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-sand-100/40 blur-[120px] animate-ambient-3" />

      {/* Grain overlay */}
      <div className="grain-overlay" />
    </div>
  );
};

export default AmbientBackground;
