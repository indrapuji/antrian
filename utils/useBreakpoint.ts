import { useMediaQuery } from 'react-responsive';
import tailwindConfig from 'tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';

const Tailwind = resolveConfig(tailwindConfig);

const useBreakpoint = (breakpoint: string) => {
  return useMediaQuery({
    query: `(min-width: ${Tailwind.theme.screens[breakpoint]})`,
  });
};

export default useBreakpoint;
