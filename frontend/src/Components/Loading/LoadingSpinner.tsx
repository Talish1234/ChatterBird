const LoadingSpinner = ({className}:{className?:string}) => {
    return (
        <div className={`w-full bg-inherit text-inherit flex justify-center ${className}`}>
            <div className="w-16 h-16 border-6 border-b-transparent border-teal-700 rounded-full animate-spin">
            </div>
        </div>
    )
}

export default LoadingSpinner;