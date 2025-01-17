/* eslint-disable react/require-default-props */
import * as React from 'react';
import defaultTheme from 'themes/default';
import { PUIThemeContext } from 'utils/context';
import { PUITheme, ThemeMode } from 'utils/types';

interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: PUITheme;
  mode?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme: themeToUse = defaultTheme,
  mode: initialMode = ThemeMode.light,
}: ThemeProviderProps) => {
  const [mode, setMode] = React.useState(initialMode);

  const theme = {
    ...themeToUse,
    colors: new Proxy(themeToUse.colors, {
      get(target, prop: string, receiver): string {
        if (target[`${mode}Mode`][prop]) {
          return target[`${mode}Mode`][prop];
        }
        return Reflect.get(target, prop, receiver);
      },
    }),
  };

  return <PUIThemeContext.Provider value={{ theme, mode, setMode }}>{children}</PUIThemeContext.Provider>;
};
