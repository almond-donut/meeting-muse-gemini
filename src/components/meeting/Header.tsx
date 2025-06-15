
import React from 'react';

const Header = () => {
  return (
    <header className="text-center py-8 md:py-12">
      <div className="flex justify-center items-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-12 h-12 text-primary"
        >
          <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3" />
          <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          <path d="M10.4 12.6a2.4 2.4 0 0 1 3.2 0" />
          <path d="M12 18a6 6 0 0 0-4.24-1.76" />
          <path d="M16.24 16.24a6 6 0 0 0 0-8.48" />
        </svg>
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
        MeetingMind
      </h1>
      <p className="mt-3 max-w-2xl mx-auto text-lg md:text-xl text-gray-500 dark:text-gray-400">
        Your AI assistant for productive meeting follow-ups, powered by Gemini.
      </p>
    </header>
  );
};

export default Header;

