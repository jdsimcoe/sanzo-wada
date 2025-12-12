'use client'

import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import styled from 'styled-components'
import chroma from 'chroma-js'
import { useColorContext } from '../../lib/color-context'
import { SwatchHeader, CopyHex } from '../../components'
import { flexColumn, ComboLink, ComboHex, bigType, ComboTitle } from '../../styles'
import { spacing, colors, shared } from '../../styles/theme.json'

export default function SwatchPage() {
  const params = useParams()
  const { colorData } = useColorContext()
  
  const swatch = useMemo(() => {
    if (!colorData || !colorData.color_list_flat || !Array.isArray(colorData.color_list_flat)) {
      return null
    }
    return colorData.color_list_flat.find(s => s.slug === params.slug)
  }, [colorData, params.slug])

  if (!swatch) {
    return (
      <div style={{ padding: '2rem' }}>
        <p>Swatch not found</p>
        <a href="/">Return to home</a>
      </div>
    )
  }

  return (
    <PageWrapper>
      <SwatchSection style={{ backgroundColor: swatch.hex }} $hex={swatch.hex}>
        <SwatchHeader>
          <ComboTitle>
            {swatch.name}
          </ComboTitle>
          <ComboHex>
            <CopyHex hex={swatch.hex} />
          </ComboHex>
        </SwatchHeader>
        <ContentWrapper>
          <ComboHeader><span>Combinations:</span></ComboHeader>
          <ComboList>
            {swatch.combinations && swatch.combinations.map((combo, i) =>
              <ComboLink href={`/combination/${combo}`} key={`${swatch.slug}-${combo}`} hex={swatch.hex}>{combo}</ComboLink>
            )}
          </ComboList>
        </ContentWrapper>
      </SwatchSection>
    </PageWrapper>
  )
}

// STYLES
const PageWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const SwatchSection = styled.section`
  ${flexColumn};
  width: 100%;
  min-height: 100vh;
  flex: 1;
  * {
    color: ${(props) =>
      chroma.contrast(props.$hex, colors.grey) > 2 ? colors.grey : colors.black}!important;
  }
`

const ContentWrapper = styled.div`
  ${flexColumn};
  flex: 1;
  padding-top: calc(${shared.nav_height} + ${spacing.double_pad});
  padding-bottom: ${spacing.big_pad};
  padding-left: 0;
  padding-right: 0;
`

const ComboList = styled.menu`
  ${flexColumn};
  padding: 0 ${spacing.single_pad};
`

const ComboHeader = styled.h2`
  ${bigType};
  padding: 0 ${spacing.single_pad} ${spacing.single_pad};
`

