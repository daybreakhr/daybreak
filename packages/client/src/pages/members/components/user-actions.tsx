import { Dropdown, Menu, message, Modal } from 'antd'
import {
  AiOutlineDelete,
  AiOutlineMore,
  AiOutlineSetting,
} from 'react-icons/ai'
import useAuth from 'hooks/use-auth'
import { Switch } from 'ui-kit'
import { ExclamationCircleOutlined, ToolOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MemberTableData } from 'types/member'
import { updateMember } from '../queries'

export default function UserActions({
  uid,
  memberId,
  isSuspended,
}: MemberTableData) {
  const { member: currentMember } = useAuth()
  const queryClient = useQueryClient()

  const { mutateAsync: suspendAccount } = useMutation(updateMember, {
    onSuccess: ({ isSuspended }) => {
      isSuspended
        ? message.info('Account Suspended!')
        : message.info('Account Activated!')

      queryClient.invalidateQueries(['members'])
    },
  })

  const updateActivation = (status: boolean) => {
    Modal.confirm({
      title: status ? 'Activate Account' : 'Suspend Account',
      icon: <ExclamationCircleOutlined />,
      content: status
        ? 'Are You Sure You Want To Activate This Account?'
        : 'Are You Sure You Want To Suspend This Account?',
      okText: status ? 'Activate' : 'Suspend',
      cancelText: 'Cancel',
      onOk: () =>
        suspendAccount({
          memberId,
          body: { isSuspended: !status },
        }),
    })
  }

  const overlay =
    currentMember?.role === 'admin' ? (
      <Menu>
        <Menu.Item key="change_role" icon={<AiOutlineSetting />}>
          Change Role
        </Menu.Item>
        <Switch>
          <Switch.Match when={!isSuspended}>
            <Menu.Item
              key="remove_user"
              icon={<AiOutlineDelete className="text-red-500" />}
              onClick={() => updateActivation(false)}
            >
              <span className="text-red-500">Suspend Account</span>
            </Menu.Item>
          </Switch.Match>
          <Switch.Match when={isSuspended}>
            <Menu.Item
              key="remove_user"
              icon={<ToolOutlined />}
              onClick={() => updateActivation(true)}
            >
              Activate Account
            </Menu.Item>
          </Switch.Match>
        </Switch>
      </Menu>
    ) : (
      <Menu>
        <Menu.Item
          key="leave_workspace"
          icon={<AiOutlineDelete className="text-red-500" />}
        >
          <span className="text-red-500">Leave Workspace</span>
        </Menu.Item>
      </Menu>
    )

  if (currentMember?.role === 'admin' && uid !== currentMember.uid) {
    return (
      <Dropdown trigger={['click']} overlay={overlay}>
        <button className="flex items-center justify-center w-6 h-6 bg-transparent rounded-full hover:bg-gray-100">
          <AiOutlineMore />
        </button>
      </Dropdown>
    )
  } else if (currentMember?.role === 'member' && uid === currentMember.uid) {
    return (
      <Dropdown trigger={['click']} overlay={overlay}>
        <button className="flex items-center justify-center w-6 h-6 bg-transparent rounded-full hover:bg-gray-100">
          <AiOutlineMore />
        </button>
      </Dropdown>
    )
  }

  return null
}
