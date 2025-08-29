const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={`w-full bg-inherit text-inherit flex justify-center items-center ${className}`}
    >
      <div className="w-12 h-12 border-4 border-teal-700 border-b-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
