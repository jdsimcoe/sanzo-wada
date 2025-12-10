'use client'

import styled from 'styled-components'
import { colors, spacing, shared } from '../styles/theme'
import { flexRowCenteredVert, Section, H2 } from '../styles'

export default function SwatchWrapper({ indexNo, children }) {
  return (
    <Section>
      <SectionHeader>
        <H2>SWATCH COLLECTION {indexNo + 1}</H2>
      </SectionHeader>
      {children}
    </Section>
  )
}

// STYLES
const SectionHeader = styled.div`
  ${flexRowCenteredVert};
  padding-left: ${spacing.single_pad};
  background-color: ${colors.white};
  position: -webkit-sticky;
  position: sticky;
  top: ${shared.nav_height};
  height: ${shared.nav_height};
  z-index: 100;
  border-bottom: 1px solid ${colors.med_grey};
  color: ${colors.med_grey};
  text-align: left;
`

