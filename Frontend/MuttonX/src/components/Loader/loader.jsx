import React from "react";

function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      
      {/* SVG */}
      <svg
        viewBox="0 0 56 56"
        className="w-32 animate-loader"
      >
        <g transform="translate(2,2)">
          
          {/* Outer circles */}
          <g
            transform="rotate(-90,26,26)"
            strokeLinecap="round"
            fill="none"
          >
            <circle
              r="24.5"
              cy="26"
              cx="26"
              strokeWidth="2.5"
              className="stroke-gray-800 animate-spin-slow"
            />
            <circle
              r="24.5"
              cy="26"
              cx="26"
              strokeWidth="1.5"
              className="stroke-gray-500 animate-spin-medium"
            />
            <circle
              r="24.5"
              cy="26"
              cx="26"
              strokeWidth="1"
              className="stroke-gray-300 animate-spin-fast"
            />
          </g>

          {/* Hourglass */}
          <g transform="translate(13.75,9.25)">
            <path
              d="M 1.5 2 L 23 2 C 23 2 22.5 8.5 19 12 C 16 15.5 13.5 13.5 13.5 16.75 C 13.5 20 16 18 19 21.5 C 22.5 25 23 31.5 23 31.5 L 1.5 31.5 C 1.5 31.5 2 25 5.5 21.5 C 8.5 18 11 20 11 16.75 C 11 13.5 8.5 15.5 5.5 12 C 2 8.5 1.5 2 1.5 2 Z"
              className="fill-yellow-200"
            />

            {/* Sand line */}
            <line
              x1="12.25"
              y1="14"
              x2="12.25"
              y2="31"
              stroke="orange"
              strokeWidth="1"
              className="animate-sand"
            />
          </g>
        </g>
      </svg>

      {/* Tailwind custom animation */}
      <style>
        {`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spinMedium {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        @keyframes spinFast {
          from { transform: rotate(0deg); }
          to { transform: rotate(720deg); }
        }

        @keyframes sandDrop {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -100; }
        }

        .animate-spin-slow {
          animation: spinSlow 3s linear infinite;
        }

        .animate-spin-medium {
          animation: spinMedium 2s linear infinite;
        }

        .animate-spin-fast {
          animation: spinFast 1.5s linear infinite;
        }

        .animate-sand {
          stroke-dasharray: 100;
          animation: sandDrop 2s linear infinite;
        }
        `}
      </style>
    </div>
  );
}

export default Loader;