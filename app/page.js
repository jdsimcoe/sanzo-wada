'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { useColorContext } from './lib/color-context'
import { ColorSwatches, ColorTable, Title } from './components'
import { flexRow, StyledButton, media, ButtonHref, ButtonLink, flexColumn } from './styles'
import { colors, spacing, shared, breakpoints } from './styles/theme.json'

export default function Landing() {
  const { colorData, windowWidth } = useColorContext()
  const [table, setTable] = useState(false)

  // Safety check for data
  if (!colorData || !colorData.color_list || !colorData.color_list_flat) {
    return (
      <Main>
        <div>Loading...</div>
      </Main>
    )
  }

  return (
    <Main>
      <StyleMenu>
        <Title/>
        <ButtonWrapper>
          <StyledButton onClick={() => setTable(false)} className={(!table) && 'active'}>
            <span>{(windowWidth >= breakpoints.desktop) ? `Swatch View` : `Swatches`}</span>
          </StyledButton>
          <StyledButton onClick={() => setTable(true)} className={(table) && 'active'}>
            <span>{(windowWidth >= breakpoints.desktop) ? `List View` : `List`}</span>
          </StyledButton>
          <ButtonHref href="/assets/colors.json">
            <span>JSON {(windowWidth >= breakpoints.desktop) && `API`}</span>
          </ButtonHref>
          <ButtonLink href={'/about'}>
            <span>ABOUT</span>
          </ButtonLink>
        </ButtonWrapper>
      </StyleMenu>
      {(table) 
        ? <ColorTable colorList={colorData.color_list_flat || []} breakPoint={windowWidth}/>
        : <ColorSwatches colorList={colorData.color_list || []}/>
      }
    </Main>
  )
}

// STYLES
const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  position: relative;
  z-index: 2;
  ${media.medium`
    min-height: 100vh;
  `}
`

const StyleMenu = styled.menu`
  ${flexRow};
  width: 100%;
  border-bottom: 1px solid ${colors.med_grey};
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: 9000;
  background-color: ${colors.white};
  ${media.small`
    ${flexColumn};
    padding: ${spacing.single_pad} 0 0;
  `}
  ${media.small`
    h1 {
      padding-left: ${spacing.single_pad};
    }
  `}
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: ${shared.nav_height};
  margin-left: auto;
  padding-left: ${spacing.single_pad};
  button,
  a {
    margin-right: ${spacing.single_pad};
    ${media.small`
      margin-bottom: ${spacing.single_pad};
    `}
  }
  ${media.small`
    margin: auto;
    flex-wrap: wrap;
    justify-content: flex-start;
    height: auto;
    padding: ${spacing.single_pad} ${spacing.single_pad} 0;
  `}
`

