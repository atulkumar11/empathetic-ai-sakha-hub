
import React from 'react';

// Trophy icon component
export const Trophy = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M7 11v8h10v-8" />
    <path d="M17 11a6 6 0 1 0 0-12H7a6 6 0 0 0 0 12" />
  </svg>
);
