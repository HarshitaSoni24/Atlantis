import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      risk: {
        mouth: string;
        low: string;
        moderate: string;
        light: string;
        high: string;
      };
      sidebar: {
        activeBackground: string;
        hoverBackground: string;
      };
    };
  }

  interface PaletteOptions {
    custom?: {
      risk?: {
        mouth?: string;
        low?: string;
        moderate?: string;
        light?: string;
        high?: string;
      };
      sidebar?: {
        activeBackground?: string;
        hoverBackground?: string;
      };
    };
  }
}
