import { EMAIL_VARIABLES } from 'constants/email-variables'
import { VscJson } from 'react-icons/vsc'
import { DropdownButton } from '@remirror/react'
import { MenuList, MenuItem } from '@mui/material'

type VariablesDropdownProps = {
  insertVariable: (val: string) => void
}

export default function VariablesDropdown({
  insertVariable,
}: VariablesDropdownProps) {
  return (
    <DropdownButton label="Variables" icon={<VscJson />} aria-label="variables">
      <MenuList dense sx={{ paddingTop: 0, paddingBottom: 0 }}>
        {EMAIL_VARIABLES.map((val) => (
          <MenuItem
            key={val}
            onClick={() => insertVariable(val)}
            classes={{ root: '!text-primary-500' }}
          >
            {val}
          </MenuItem>
        ))}
      </MenuList>
    </DropdownButton>
  )
}
