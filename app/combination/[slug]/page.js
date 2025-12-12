'use client'

import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import styled from 'styled-components'
import { useColorContext } from '../../lib/color-context'
import { SwatchHeader, CopyHex } from '../../components'
import { flexRow, SwatchLink, ComboTitle, ComboHex, ButtonLink, media } from '../../styles'
import { spacing, shared } from '../../styles/theme.json'

export default function CombinationPage() {
  const params = useParams()
  const router = useRouter()
  const { colorData } = useColorContext()
  const slug = parseInt(params.slug, 10)
  
  const colors = useMemo(() => {
    if (!colorData || !colorData.color_list_flat || !Array.isArray(colorData.color_list_flat)) {
      return []
    }
    const colorList = []
    colorData.color_list_flat.forEach((e) => {
      if (e.combinations && Array.isArray(e.combinations) && e.combinations.includes(slug)) {
        colorList.push({
          hex: e.hex,
          name: e.name,
          slug: e.slug
        })
      }
    })
    return colorList
  }, [colorData, slug])

  if (!colors || colors.length === 0) {
    return (
      <div style={{ padding: '2rem' }}>
        <p>Combination not found</p>
        <a href="/">Return to home</a>
      </div>
    )
  }

  return (
    <>
      <SwatchHeader>
        <ComboTitle>Combination: {params.slug}</ComboTitle>
        <ComboHex>
          {colors.map((color, i) =>
            <CopyHex hex={color.hex} key={`${params.slug}-title-${i}`}/>
          )}
        </ComboHex>
        <PrevNext>
          {slug !== 1 && (
            <ButtonLink className="prev" href={`/combination/${slug - 1}`}>
              <span>Prev</span>
            </ButtonLink>
          )}
          {slug !== 348 && (
            <ButtonLink className="next" href={`/combination/${parseInt(slug, 10) + 1}`}>
              <span>Next</span>
            </ButtonLink>
          )}
        </PrevNext>
      </SwatchHeader>
      <ComboSection>
        <ComboWrapper>
          {colors.map((color, i) =>
            <ColorBar key={`${params.slug}-${i}`} style={{ backgroundColor: color.hex }}>
              <SwatchLink href={`/swatch/${color.slug}`} hex={color.hex}>
                <p className={'name'}>{color.name}</p>
              </SwatchLink>
            </ColorBar>
          )}
        </ComboWrapper>
      </ComboSection>
    </>
  )
}

// STYLES
const PrevNext = styled.div`
  ${flexRow};
  align-items: center;
  height: 100%;
  margin-left: auto;
  a:first-child {
    margin-right: ${spacing.single_pad};
  }
  ${media.small`
    margin-left: 0;
    margin-top: ${spacing.single_pad};
  `}
`

const ComboSection = styled.section`
  display: flex;
  width: 100%;
  height: 100vh;
  padding-top: calc(${spacing.single_pad} + ${shared.nav_height});
  padding-left: ${spacing.single_pad};
  padding-right: ${spacing.single_pad};
  padding-bottom: ${spacing.double_pad};
`

const ComboWrapper = styled.div`
  ${flexRow};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 0;
`

const ColorBar = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  flex: 1;
  padding: ${spacing.single_pad};
  p {
    position: absolute;
    display: block;
    opacity: 0;
    transition: opacity 300ms ease;
    will-change: opacity;
  }
  .name {
    left: ${spacing.single_pad};
    top: calc(${spacing.single_pad} + ${shared.nav_height});
    text-align: right;
  }
  .hex {
    right: ${spacing.single_pad};
    top: calc(${spacing.single_pad} + ${shared.nav_height});
  }
  &:hover {
    p {
      opacity: 1;
    }
  }
`

