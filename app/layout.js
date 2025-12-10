import StyledComponentsRegistry from './lib/registry'
import GlobalStyles from './lib/global-styles'
import { ColorProvider } from './lib/color-context'

export const metadata = {
  title: 'WADA SANZO | DICTIONARY OF COLOR COMBINATIONS',
  description: "Wada Sanzo's Dictionary of Color Combinations. Published by Seigensha.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#ffffff' }}>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <ColorProvider>
            {children}
          </ColorProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

