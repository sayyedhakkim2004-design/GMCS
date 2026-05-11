export const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-sm p-6 border border-gray-100 ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = "" }) => (
  <div className={`flex items-center justify-between mb-4 ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);
