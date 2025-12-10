'use client'

import { memo, useMemo } from 'react'
import styled from 'styled-components'
import chroma from 'chroma-js'
import { colors, breakpoints } from '../styles/theme'
import { smallType, SmallLink } from '../styles'

// Memoize style function
const returnStyle = (color) => ({
  backgroundColor: color
})

function ColorTable({ colorList, breakPoint }) {
  if (!colorList || !Array.isArray(colorList) || colorList.length === 0) {
    return null
  }

  const isDesktop = breakPoint >= breakpoints.desktop

  // Memoize table rows to prevent unnecessary re-renders
  const tableRows = useMemo(
    () => colorList.map((color) => (
      <ColorTr key={`c-list-${color.index}-${color.slug}`} style={returnStyle(color.hex)} $hex={color.hex}>
        <td>{color.index}</td>
        <td>
          <SmallLink href={`/swatch/${color.slug}`}>{color.name}</SmallLink>
        </td>
        <td className={'captialize'}>{color.hex}</td>
        {isDesktop && (
          <>
            <td>
              {color.combinations && color.combinations.map((combo) => 
                <SmallLink href={`/combination/${combo}`} key={`${combo}-${color.slug}`}>{combo}</SmallLink>
              )}
            </td>
            <td>{color.cmyk}</td>
            <td>{color.rgb}</td>
            <td>{color.use_count}</td>
          </>
        )}
      </ColorTr>
    )),
    [colorList, isDesktop]
  )

  return (
    <ColorIndex>
      <tbody>
        {tableRows}
      </tbody>
    </ColorIndex>
  )
}

export default memo(ColorTable)

// STYLES
const ColorTr = styled.tr.withConfig({
  shouldForwardProp: (prop) => prop !== 'hex',
})`
  th {
    border-right: 1px solid ${colors.grey};
    padding: 1rem;
    &:last-child {
      border-right: 0;
    }
  }
  td,
  th {
    &:first-child {
      width: 1.5rem;
    }
    &.captialize {
      text-transform: uppercase;
    }
  }
  td {
    padding: 5rem 1rem;
    a {
      margin-right: .5rem;
    }
  }
  * {
    color: ${(props) =>
      chroma.contrast(props.$hex, colors.grey) > 2 ? colors.grey : colors.black}!important;
  }
`

const ColorIndex = styled.table`
  ${smallType};
  width: 100%;
  text-align: left;
  line-height: 1.125;
`

