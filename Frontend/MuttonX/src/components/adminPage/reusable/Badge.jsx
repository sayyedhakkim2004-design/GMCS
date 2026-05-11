export const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    positive: "text-green-600",
    negative: "text-red-600",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
