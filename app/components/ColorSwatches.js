'use client'

import { memo, useMemo } from 'react'
import styled from 'styled-components'
import SwatchWrapper from './SwatchWrapper'
import { colors, spacing } from '../styles/theme'
import { smallType, flexRowWrap, flexRow, media, SwatchLink } from '../styles'

// Memoize style function
const returnStyle = (color) => ({
  backgroundColor: color
})

const Swatches = memo(function Swatches({ colorList, indexNo }) {
  return (
    <SwatchWrapper indexNo={indexNo}>
      <SwatchBook>
        {colorList.map((color) => (
          <Swatch key={`c-list-${color.index}-${color.slug}`} style={returnStyle(color.hex)}>
            <SwatchLink href={`/swatch/${color.slug}`} hex={color.hex}>
              <p className={'index'}>{color.index}</p>
              <p className={'name'}>{color.name}</p>
              <p className={'hex'}>{color.hex}</p>
            </SwatchLink>
          </Swatch>
        ))}
      </SwatchBook>
    </SwatchWrapper>
  )
})

function ColorSwatches({ colorList }) {
  if (!colorList || !Array.isArray(colorList) || colorList.length === 0) {
    return null
  }

  // Memoize the mapped components
  const swatchComponents = useMemo(
    () => colorList.map((colors, i) => (
      <Swatches colorList={colors.swatches || []} indexNo={i} key={`cs-${i}`}/>
    )),
    [colorList]
  )

  return <>{swatchComponents}</>
}

export default memo(ColorSwatches)

// STYLES
const SwatchBook = styled.ul`
  z-index: 1;
  ${flexRowWrap};
  width: 100%;
  ${smallType};
  color: ${colors.grey};
  border-bottom: 1px solid ${colors.med_grey};
  p {
    display: ${flexRow};
    padding: .5rem 0;
  }
`

const Swatch = styled.li`
  width: 20vw;
  height: 20vw;
  position: relative;
  ${ media.medium`
    width: calc(100vw / 3);
    height: calc(100vw / 3);
  `}
  ${ media.small`
    width: 100%;
    height: 90vw;
  `}
  p {
    position: absolute;
    display: block;
  }
  .index {
    top: ${spacing.single_pad};
    left: ${spacing.single_pad};
  }
  .name {
    right: ${spacing.single_pad};
    bottom: ${spacing.single_pad};
    text-align: right;
  }
  .hex {
    left: ${spacing.single_pad};
    bottom: ${spacing.single_pad};
  }
  transition: opacity 300ms ease;
  will-change: opacity;
  &:hover {
    opacity: 0.7;
  }
`

