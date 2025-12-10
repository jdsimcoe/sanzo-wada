'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { mediumType, media, animationFadeUp, smallType } from '../styles'
import { spacing } from '../styles/theme'

export default function CopyHex({ hex }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [copied])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hex)
      setCopied(true)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = hex
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        setCopied(true)
      } catch (fallbackErr) {
        console.error('Failed to copy:', fallbackErr)
      }
      document.body.removeChild(textArea)
    }
  }

  return (
    <ComboHexItem $hexVal={hex} className={copied ? 'copied' : 'not-copied'}>
      <SwatchSpan style={{ color: hex }} onClick={handleCopy}>{hex}</SwatchSpan>
    </ComboHexItem>
  )
}

const ComboHexItem = styled.p`
  ${mediumType};
  margin-right: .5rem;
  width: 100%;
	&:after {
		${smallType};
		content: '${props => props.$hexVal} Copied';
		pointer-events: none;
		position: fixed;
		z-index: 10000;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		display: block;
		width: 18rem;
		height: 2rem;
		padding-top: 1.45rem;
		padding-bottom: .35rem;
		text-align: center;
		color: white;
		opacity: 0;
		background-color: ${props => props.$hexVal};
		border: 2px solid white;
		text-transform: uppercase;
	}
	&.copied {
		&:after {
			${animationFadeUp(1150, 15)};
		}
	}
`

const SwatchSpan = styled.span`
	display: inline-block;
	cursor: pointer;
	padding: 0 5px;
	border-radius: 4px;
	position: relative;
	&:hover {
		background-color: rgba(0,0,0,.05);
	}
`

