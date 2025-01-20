'use client';

import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeClientWrapper({ children }) {
  const [mounted, setMounted] = useState(false);

  // Ensure the component is only mounted after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering the children until hydration
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}