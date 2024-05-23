"use client";
// Imports
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
// Importing Global context
import { GlobalContextProvider } from "../Context/globalContext";

// Dark mode theme provider
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>
    <GlobalContextProvider>{children}</GlobalContextProvider>
      </NextThemesProvider>;
}
