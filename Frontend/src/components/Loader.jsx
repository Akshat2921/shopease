const Loader = ({ label = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-20 text-gray-400">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-blue-400" />
    <span className="text-sm">{label}</span>
  </div>
);

export default Loader;
