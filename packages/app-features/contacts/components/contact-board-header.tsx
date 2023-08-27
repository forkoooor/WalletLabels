import { HStack, Icon, MenuItem, Spacer, Tag } from '@chakra-ui/react'
import { ContactStatus } from './contact-status'
import { OverflowMenu } from '@saas-ui/react'
import { ContactTag } from './contact-tag'
import { ContactType } from './contact-type'
import { TagIcon } from 'lucide-react'

export const ContactBoardHeader: React.FC<GroupingRow> = ({ header }) => {
  const value = header.groupingValue as string
  let title

  switch (header.groupingColumnId) {
    case 'status':
      title = <ContactStatus status={value} />
      break
    case 'tags':
      title = value ? (
        <ContactTag
          tag={value}
          bg="transparent"
          _dark={{ bg: 'transparent', color: 'app-text' }}
        />
      ) : (
        <Tag
          size="sm"
          bg="transparent"
          _dark={{ bg: 'transparent', color: 'app-text' }}
        >
          <Icon as={TagIcon} fontSize="sm" me="1" />
          No tag
        </Tag>
      )
      break
    case 'type':
      title = (
        <ContactType
          type={value}
          bg="transparent"
          _dark={{ bg: 'transparent', color: 'app-text' }}
        />
      )
      break
  }

  return (
    <HStack w="full" py="2" px="1">
      {title}
      <Spacer />
      <OverflowMenu size="sm">
        <MenuItem>Hide</MenuItem>
      </OverflowMenu>
    </HStack>
  )
}
