const Logo = ({className}:{className?: string}) => {
  return (
    <div className={`flex items-center font-display gap-2 text-2xl ${className}`}>
      <div className="italic font-logo-display  text-gray-200 relative text-4xl">
        C
      </div>
      <span className="text-gray-200 font-bold">
        Chatter-Bird
      </span>
    </div>
  );
};

export default Logo;
