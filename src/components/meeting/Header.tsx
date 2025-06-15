
import React from 'react';

const Header = () => {
  return (
    <header>
      <div className="flex items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-10 h-10 text-primary"
        >
          <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M10.4 12.6a2.4 2.4 0 0 1 3.2 0" />
          <path d="M12 18a6 6 0 0 0-4.24-1.76" />
          <path d="M16.24 16.24a6 6 0 0 0 0-8.48" />
        </svg>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            MeetingMind
          </h1>
          <p className="text-muted-foreground text-sm">
            AI-powered meeting recaps.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
