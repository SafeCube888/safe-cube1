import React from 'react'
import { cn } from '@/lib/utils'

// ----- Spacing / background maps -----

type SectionSpacing = 'lg' | 'standard' | 'compact'
type SectionBackground = 'default' | 'soft' | 'navy' | 'white'

const sectionSpacingMap: Record<SectionSpacing, string> = {
  lg: 'section-lg',
  standard: 'section-standard',
  compact: 'section-compact',
}

const sectionBackgroundMap: Record<SectionBackground, string> = {
  default: '',
  soft: 'bg-cube-soft',
  navy: 'bg-cube-navy text-white',
  white: 'bg-white',
}

// ----- Container width map -----

type ContainerWidth = 'standard' | 'narrow' | 'wide' | 'full'

const containerWidthMap: Record<ContainerWidth, string> = {
  standard: 'max-w-standard',
  narrow: 'max-w-narrow',
  wide: 'max-w-wide',
  full: 'max-w-none',
}

// ----- SectionGrid col map -----

type SectionGridCols = 2 | 3 | 4 | 6

const sectionGridColsMap: Record<SectionGridCols, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
  6: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
}

// ----- TwoColumnLayout ratio map -----

type TwoColumnRatio = '1/1' | '2/1' | '1/2' | '3/2' | '2/3'

const twoColumnRatioMap: Record<TwoColumnRatio, string> = {
  '1/1': 'lg:grid-cols-2',
  '2/1': 'lg:grid-cols-[2fr_1fr]',
  '1/2': 'lg:grid-cols-[1fr_2fr]',
  '3/2': 'lg:grid-cols-[3fr_2fr]',
  '2/3': 'lg:grid-cols-[2fr_3fr]',
}

// ----- FullWidthBand background map -----

type FullWidthBandBackground = 'navy' | 'soft' | 'white' | 'green'

const fullWidthBandBackgroundMap: Record<FullWidthBandBackground, string> = {
  navy: 'bg-cube-navy text-white',
  soft: 'bg-cube-soft',
  white: 'bg-white',
  green: 'bg-cube-green text-white',
}

// ============================================================================
// 1. Section
// ============================================================================

export interface SectionProps {
  children: React.ReactNode
  className?: string
  spacing?: SectionSpacing
  background?: SectionBackground
  id?: string
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  spacing = 'standard',
  background = 'default',
  id,
}) => {
  return (
    <section
      id={id}
      className={cn(
        sectionSpacingMap[spacing],
        sectionBackgroundMap[background],
        className
      )}
    >
      {children}
    </section>
  )
}

// ============================================================================
// 2. Container
// ============================================================================

export interface ContainerProps {
  children: React.ReactNode
  className?: string
  width?: ContainerWidth
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  width = 'standard',
}) => {
  return (
    <div className={cn('container', containerWidthMap[width], className)}>
      {children}
    </div>
  )
}

// ============================================================================
// 3. NarrowContainer
// ============================================================================

export interface NarrowContainerProps {
  children: React.ReactNode
  className?: string
}

export const NarrowContainer: React.FC<NarrowContainerProps> = ({
  children,
  className,
}) => {
  return (
    <Container width="narrow" className={className}>
      {children}
    </Container>
  )
}

// ============================================================================
// 4. SectionGrid
// ============================================================================

export interface SectionGridProps {
  children: React.ReactNode
  className?: string
  cols?: SectionGridCols
}

export const SectionGrid: React.FC<SectionGridProps> = ({
  children,
  className,
  cols = 3,
}) => {
  return (
    <div
      className={cn('grid grid-cols-1 gap-6', sectionGridColsMap[cols], className)}
    >
      {children}
    </div>
  )
}

// ============================================================================
// 5. TwoColumnLayout
// ============================================================================

export interface TwoColumnLayoutProps {
  left: React.ReactNode
  right: React.ReactNode
  className?: string
  ratio?: TwoColumnRatio
}

export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  left,
  right,
  className,
  ratio = '1/1',
}) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-8 lg:gap-12',
        twoColumnRatioMap[ratio],
        className
      )}
    >
      <div>{left}</div>
      <div>{right}</div>
    </div>
  )
}

// ============================================================================
// 6. ThreeColumnGrid
// ============================================================================

export interface ThreeColumnGridProps {
  children: React.ReactNode
  className?: string
}

export const ThreeColumnGrid: React.FC<ThreeColumnGridProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  )
}

// ============================================================================
// 7. FourColumnGrid
// ============================================================================

export interface FourColumnGridProps {
  children: React.ReactNode
  className?: string
}

export const FourColumnGrid: React.FC<FourColumnGridProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4',
        className
      )}
    >
      {children}
    </div>
  )
}

// ============================================================================
// 8. SixCardGrid
// ============================================================================

export interface SixCardGridProps {
  children: React.ReactNode
  className?: string
}

export const SixCardGrid: React.FC<SixCardGridProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
        className
      )}
    >
      {children}
    </div>
  )
}

// ============================================================================
// 9. ContentWithSidebar
// ============================================================================

export interface ContentWithSidebarProps {
  content: React.ReactNode
  sidebar: React.ReactNode
  className?: string
}

export const ContentWithSidebar: React.FC<ContentWithSidebarProps> = ({
  content,
  sidebar,
  className,
}) => {
  return (
    <div
      className={cn('grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]', className)}
    >
      <div>{content}</div>
      <div className="lg:sticky lg:top-24">{sidebar}</div>
    </div>
  )
}

// ============================================================================
// 10. SplitContent
// ============================================================================

export interface SplitContentProps {
  left: React.ReactNode
  right: React.ReactNode
  className?: string
  reverse?: boolean
}

export const SplitContent: React.FC<SplitContentProps> = ({
  left,
  right,
  className,
  reverse = false,
}) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16',
        className
      )}
    >
      <div className={cn(reverse && 'lg:order-2')}>{left}</div>
      <div>{right}</div>
    </div>
  )
}

// ============================================================================
// 11. MediaTextSection
// ============================================================================

export interface MediaTextSectionProps {
  media: React.ReactNode
  text: React.ReactNode
  className?: string
  mediaPosition?: 'left' | 'right'
}

export const MediaTextSection: React.FC<MediaTextSectionProps> = ({
  media,
  text,
  className,
  mediaPosition = 'right',
}) => {
  const mediaFirst = mediaPosition === 'left'
  return (
    <div
      className={cn(
        'grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16',
        className
      )}
    >
      <div className={cn(!mediaFirst && 'lg:order-2')}>{media}</div>
      <div className={cn(mediaFirst && 'lg:order-2')}>{text}</div>
    </div>
  )
}

// ============================================================================
// 12. FullWidthBand
// ============================================================================

export interface FullWidthBandProps {
  children: React.ReactNode
  className?: string
  background?: FullWidthBandBackground
}

export const FullWidthBand: React.FC<FullWidthBandProps> = ({
  children,
  className,
  background = 'navy',
}) => {
  return (
    <div
      className={cn(
        'py-12 lg:py-16',
        fullWidthBandBackgroundMap[background],
        className
      )}
    >
      <Container>{children}</Container>
    </div>
  )
}
