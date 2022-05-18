import * as React from 'react'

import {
  chakra,
  forwardRef,
  StackProps,
  Collapse,
  useStyles,
  StylesProvider,
  omitThemingProps,
  HTMLChakraProps,
  ChakraProps,
  ThemingProps,
  SystemProps,
  useMultiStyleConfig,
  useStyleConfig,
  MenuListProps,
  Tooltip,
  useBreakpointValue,
  SystemStyleObject,
  IconButton,
  IconButtonProps,
} from '@chakra-ui/react'

import { cx, __DEV__ } from '@chakra-ui/utils'

import { motion, HTMLMotionProps, AnimatePresence } from 'framer-motion'

import { Menu, MenuButton, MenuButtonProps, MenuList } from '@saas-ui/menu'
import { useLink } from '@saas-ui/provider'
import {
  CollapseProvider,
  useCollapseContext,
  useCollapse,
} from '@saas-ui/collapse'

export {
  MenuGroup as SidebarMenuGroup,
  MenuDivider as SidebarMenuDivider,
} from '@chakra-ui/menu'

import { ChevronDownIcon, ChevronRightIcon, HamburgerIcon } from './icons'

import { SidebarProvider, useSidebarContext } from './use-sidebar'
import { ResizeHandle, ResizeHandler, useResize } from '../resize'

import { useActivePath } from '..'

export interface SidebarProps
  extends Omit<HTMLMotionProps<'div'>, 'color' | 'transition'>,
    Omit<ChakraProps, 'css'>,
    ThemingProps<'Sidebar'> {
  /**
   * Spacing between child elements.
   */
  spacing?: SystemProps['margin']
  /**
   * Define breakpoints for the mobile nav.
   *
   * @default object { sm: true, lg: false }
   */
  breakpoints?: Record<string, boolean>
  /**
   * Allow the sidebar to be resized.
   */
  isResizable?: boolean
  /**
   * Callback called when resize is completed.
   */
  onResize?: ResizeHandler
  /**
   * The default sidebar width in pixels.
   */
  defaultWidth?: number
}

const MotionBox = chakra(motion.div)

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { children, variant, breakpoints = { base: true, lg: false } } = props

  const isMobile = useBreakpointValue(breakpoints)

  return (
    <>
      <SidebarContainer {...props}>
        {isMobile && variant !== 'condensed' && <SidebarToggleButton />}
        {children}
      </SidebarContainer>
    </>
  )
}

if (__DEV__) {
  Sidebar.displayName = 'Sidebar'
}

export const SidebarContainer: React.FC<SidebarProps> = (props) => {
  const styles = useMultiStyleConfig('Sidebar', props)

  const { variant, size } = props

  const isCondensed = variant === 'condensed'

  const {
    spacing = 4,
    children,
    breakpoints = { base: true, lg: false },
    className,
    isResizable,
    onResize,
    defaultWidth,
    ...containerProps
  } = omitThemingProps(props)

  const isMobile = useBreakpointValue(breakpoints)

  const shouldCollapse = isMobile && variant !== 'condensed'

  const collapse = useCollapse({
    defaultIsOpen: !isMobile,
  })

  const resize = useResize({
    defaultWidth,
    onResize,
    isResizable: !isMobile && isResizable,
  })

  const { isOpen, onClose } = collapse

  React.useEffect(() => {
    if (isMobile) {
      onClose()
    }
  }, [isMobile])

  const containerStyles: SystemStyleObject = {
    ...(shouldCollapse
      ? {
          position: 'absolute',
          zIndex: 'modal',
          top: 0,
          left: { base: '-100%', lg: '0' },
          bottom: 0,
        }
      : {}),
  }

  const innerStyles: SystemStyleObject = {
    '& > *:not(style) ~ *:not(style, .saas-resize-handler)': {
      marginTop: spacing,
    },
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  }

  const context = {
    ...collapse,
    isMobile,
    variant,
    size,
  }

  return (
    <SidebarProvider value={context}>
      <StylesProvider value={styles}>
        <MotionBox
          animate={!isMobile || isOpen ? 'enter' : 'exit'}
          variants={{
            enter: {
              left: 0,
              transition: { type: 'spring', duration: 0.6, bounce: 0.15 },
            },
            exit: { left: '-100%' },
          }}
          __css={{
            ...containerStyles,
            ...styles.container,
          }}
          {...containerProps}
          className={cx(
            'saas-sidebar',
            isCondensed && 'saas-sidebar__condensed',
            className,
          )}
          {...resize.getContainerProps(props)}
        >
          <chakra.div __css={innerStyles}>{children}</chakra.div>
          {!isMobile && isResizable && (
            <ResizeHandle {...resize.getHandleProps()} />
          )}
        </MotionBox>
        {isMobile && <SidebarOverlay />}
      </StylesProvider>
    </SidebarProvider>
  )
}

if (__DEV__) {
  SidebarContainer.displayName = 'SidebarContainer'
}

export const SidebarToggleButton: React.FC<
  Omit<IconButtonProps, 'aria-label'>
> = (props) => {
  const sidebar = useSidebarContext()

  const styles = useStyles()

  const buttonStyles = {
    position: 'fixed',
    top: 3,
    left: 4,
    ...styles.toggle,
  }

  return (
    <IconButton
      variant="ghost"
      icon={<HamburgerIcon />}
      {...sidebar.getToggleProps(props)}
      {...props}
      aria-label="Toggle sidebar"
      sx={buttonStyles}
    />
  )
}

const SidebarOverlay = () => {
  const { onClose, isOpen } = useSidebarContext()

  const styles = useStyles()

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionBox
          animate={isOpen ? 'enter' : 'exit'}
          initial="exit"
          variants={{
            enter: { opacity: 1 },
            exit: { opacity: 0 },
          }}
          position="fixed"
          top="0"
          right="0"
          bottom="0"
          left="0"
          zIndex="overlay"
          onClick={onClose}
          __css={styles.overlay}
        />
      )}
    </AnimatePresence>
  )
}

if (__DEV__) {
  SidebarToggleButton.displayName = 'SidebarToggleButton'
}

export interface SidebarDividerProps extends HTMLChakraProps<'hr'> {}

export const SidebarDivider: React.FC<SidebarDividerProps> = (props) => {
  const { className, ...rest } = props
  const styles = useStyles()
  return (
    <chakra.hr
      role="separator"
      aria-orientation="horizontal"
      {...rest}
      __css={styles.divider}
    />
  )
}

if (__DEV__) {
  SidebarDivider.displayName = 'SidebarDivider'
}

export const SidebarOverflow: React.FC<HTMLChakraProps<'div'>> = (props) => {
  return (
    <chakra.div
      __css={{
        overflow: 'auto',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
      {...props}
    />
  )
}

if (__DEV__) {
  SidebarOverflow.displayName = 'SidebarOverflow'
}

export const SidebarNav: React.FC<StackProps> = (props) => {
  const styles = useStyles()

  const { children, spacing, direction, ...rest } = props

  return (
    <chakra.nav
      __css={styles.nav}
      flexDirection={direction}
      {...rest}
      role="navigation"
    >
      {children}
    </chakra.nav>
  )
}

SidebarNav.defaultProps = {
  spacing: 2,
  direction: 'column',
}

if (__DEV__) {
  SidebarNav.displayName = 'SidebarNav'
}

export interface SidebarNavGroupTitleProps extends HTMLChakraProps<'div'> {
  leftIcon?: React.ReactElement
  isCollapsible?: boolean
}

export const SidebarNavGroupTitle: React.FC<SidebarNavGroupTitleProps> = (
  props,
) => {
  const { leftIcon, children, ...rest } = props
  const styles = useStyles()

  const { getToggleProps, isOpen, isCollapsible } = useCollapseContext()

  const iconStyles = { display: 'inline-flex', marginEnd: 2 }

  let collapseIcon
  if (isCollapsible) {
    collapseIcon = isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />
  }

  return (
    <chakra.div {...getToggleProps(rest)} __css={styles.groupTitle}>
      {leftIcon && (
        <chakra.span __css={{ ...iconStyles, ...styles.groupIcon }}>
          {leftIcon}
        </chakra.span>
      )}
      <chakra.span flex="1">
        {typeof children === 'function' ? children({ isOpen }) : children}{' '}
      </chakra.span>
      {collapseIcon}
    </chakra.div>
  )
}

if (__DEV__) {
  SidebarNavGroupTitle.displayName = 'SidebarNavGroupTitle'
}

export interface SidebarNavGroupProps
  extends Omit<HTMLChakraProps<'div'>, 'title'> {
  title?: React.ReactNode
  isCollapsible?: boolean
  defaultIsOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
  icon?: React.ReactElement
}

export const SidebarNavGroup: React.FC<SidebarNavGroupProps> = (props) => {
  const {
    title,
    icon,
    isCollapsible,
    defaultIsOpen,
    onOpen,
    onClose,
    children,
    ...rest
  } = props
  const styles = useStyles()

  const collapse = useCollapse(props)

  const { getCollapseProps } = collapse

  const header = title && (
    <SidebarNavGroupTitle leftIcon={icon}>{title}</SidebarNavGroupTitle>
  )

  let content = <chakra.div>{children}</chakra.div>

  if (isCollapsible) {
    content = <Collapse {...getCollapseProps()}>{content}</Collapse>
  }

  return (
    <CollapseProvider value={collapse}>
      <chakra.div
        __css={{
          userSelect: 'none',
          ...styles.group,
        }}
        {...rest}
        role="group"
      >
        {header}
        {content}
      </chakra.div>
    </CollapseProvider>
  )
}

if (__DEV__) {
  SidebarNavGroup.displayName = 'SidebarNavGroup'
}

SidebarNavGroup.defaultProps = {
  defaultIsOpen: true,
  isCollapsible: false,
}

export interface SidebarLinkLabelProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'NavLink'> {}

export const SidebarLinkLabel = forwardRef<SidebarLinkLabelProps, 'div'>(
  ({ children, ...props }, ref) => {
    const styles = useStyles()
    return (
      <chakra.div ref={ref} __css={styles.label} {...props}>
        {children}
      </chakra.div>
    )
  },
)

if (__DEV__) {
  SidebarLinkLabel.displayName = 'SidebSidebarLinkLabelarMenu'
}

const SidebarLinkIcon: React.FC<HTMLChakraProps<'span'>> = (props) => {
  const styles = useStyles()

  const { className, children, ...rest } = props

  const child = React.Children.only(children)

  const clone = React.isValidElement(child)
    ? React.cloneElement(child, {
        focusable: 'false',
        'aria-hidden': true,
      })
    : null

  return (
    <chakra.span
      {...rest}
      __css={{
        flexShrink: 0,
        ...styles.icon,
      }}
    >
      {clone}
    </chakra.span>
  )
}

if (__DEV__) {
  SidebarLinkIcon.displayName = 'SidebarLinkIcon'
}

export interface SidebarLinkProps
  extends HTMLChakraProps<'a'>,
    ThemingProps<'SidebarLink'> {
  href?: string
  label: string
  icon?: React.ReactElement
  inset?: SystemProps['paddingLeft']
  tooltip?: React.ReactNode
  isActive?: boolean
}

export const SidebarLink = forwardRef<SidebarLinkProps, 'a'>((props, ref) => {
  const {
    href = '#',
    label,
    icon,
    inset,
    className,
    tooltip,
    ...rest
  } = omitThemingProps(props)
  const RouterLink = useLink()
  const isActive = useActivePath(href)
  const { onClose, variant } = useSidebarContext()

  const isCondensed = variant === 'condensed'

  const styles = useMultiStyleConfig('SidebarLink', {
    isActive,
    isCondensed,
    ...props,
  })

  let link = (
    <chakra.a
      {...rest}
      ref={ref}
      href={href}
      className={cx('sui-sidebar-link', className)}
      __css={styles.link}
    >
      <chakra.span
        __css={{
          ...styles.inner,
          pl: inset,
        }}
      >
        {icon && <SidebarLinkIcon>{icon}</SidebarLinkIcon>}
        <SidebarLinkLabel>{label}</SidebarLinkLabel>
      </chakra.span>
    </chakra.a>
  )

  if (href && href !== '#') {
    link = <RouterLink href={href}>{link}</RouterLink>
  }

  const tooltipLabel = isCondensed && !tooltip ? label : tooltip

  return (
    <StylesProvider value={styles}>
      <Tooltip label={tooltipLabel} placement="right" openDelay={400}>
        <chakra.div __css={styles.container} onClick={onClose}>
          {link}
        </chakra.div>
      </Tooltip>
    </StylesProvider>
  )
})

if (__DEV__) {
  SidebarLink.displayName = 'SidebarLink'
}

export interface SidebarMenuButton
  extends HTMLChakraProps<'button'>,
    ThemingProps<'SidebarMenuButton'> {
  icon?: React.ReactNode
  label?: React.ReactNode
}

const SidebarMenuButton = forwardRef<SidebarMenuButton, 'button'>(
  (props, ref) => {
    const { label, icon, ...rest } = props
    const styles = useStyleConfig('SidebarMenuButton', props)

    const buttonProps = omitThemingProps(rest)

    return (
      <chakra.button ref={ref} __css={styles} {...buttonProps}>
        {icon}
        {label}
      </chakra.button>
    )
  },
)

if (__DEV__) {
  SidebarMenuButton.displayName = 'SidebarMenuButton'
}

export type SidebarMenuProps = {
  label?: React.ReactNode
  icon?: React.ReactNode
  children: React.ReactNode
  buttonProps?: MenuButtonProps
  menuListProps?: MenuListProps
}

export const SidebarMenu = forwardRef<SidebarMenuProps, typeof MenuButton>(
  (props, ref) => {
    const { label, icon, children, buttonProps, menuListProps, ...rest } = props
    return (
      <Menu {...rest}>
        <MenuButton
          as={SidebarMenuButton}
          isTruncated
          icon={icon}
          label={label}
          {...buttonProps}
        />
        <MenuList zIndex="dropdown" ref={ref} {...menuListProps}>
          {children}
        </MenuList>
      </Menu>
    )
  },
)

if (__DEV__) {
  SidebarMenu.displayName = 'SidebarMenu'
}
