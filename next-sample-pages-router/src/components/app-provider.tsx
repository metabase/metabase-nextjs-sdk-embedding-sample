import {
  MetabaseProvider,
  defineMetabaseAuthConfig,
  defineMetabaseTheme
} from '@metabase/embedding-sdk-react/nextjs';
import { PropsWithChildren } from 'react';

if (!process.env.NEXT_PUBLIC_METABASE_INSTANCE_URL) {
  throw new Error("Missing NEXT_PUBLIC_METABASE_INSTANCE_URL");
}

const authConfig = defineMetabaseAuthConfig({
  metabaseInstanceUrl: process.env.NEXT_PUBLIC_METABASE_INSTANCE_URL,
});

const theme = defineMetabaseTheme({
  // Specify a font to use from the set of fonts supported by Metabase.
  // You can set the font to "Custom" to use the custom font
  // configured in your Metabase instance.
  fontFamily: "Lato",

  // Override the base font size for every component.
  // This does not usually need to be set, as the components
  // inherit the font size from the parent container, such as the body.
  fontSize: "16px",

  // Override the base line height for every component.
  lineHeight: 1.5,

  // Match your application's color scheme
  colors: {
    brand: "#6b88bd",
    "text-primary": "#FFFFFF",
    "text-secondary": "#B0BEC5",
    "text-tertiary": "#78909C",
    background: "#181A1B",
    "background-hover": "#23272B",
    border: "#263238",
    filter: "#939393",
    summarize: "#5e749c",
    shadow: "rgba(0,0,0,0.6)",
  },

  components: {
    question: {
      backgroundColor: "#23272B",
    },
    table: {
      cell: {
        textColor: "#FFFFFF",
        backgroundColor: "#181A1B",
      },
    },
  },
});

export const AppProvider = ({children}: PropsWithChildren) => (
  <MetabaseProvider
    authConfig={authConfig}
    theme={theme}
  >
    {children}
  </MetabaseProvider>
)