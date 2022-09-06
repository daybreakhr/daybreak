// import { Key } from 'react'
import { Avatar } from 'antd'
import useAuth from 'hooks/use-auth'
import memberTabs from './members-list'

export default function Members() {
  const { user } = useAuth()

  return (
    <div className="relative mt-5 overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b hover:bg-gray-100">
            <td
              scope="row"
              className="flex items-center px-6 py-3 font-medium text-gray-900 whitespace-nowrap"
            >
              <Avatar src={user?.photoURL}>
                {user?.displayName?.charAt(0)}
              </Avatar>
              <div className="px-3">{user?.displayName}</div>
            </td>
            <td className="px-6 py-3">{memberTabs[0].role}</td>
            <td className="px-6 py-3 text-blue-700">
              {<a> {memberTabs[0].actions} </a>}
            </td>
          </tr>

          {memberTabs.map((props) => (
            // eslint-disable-next-line react/jsx-key
            <tr className='bg-white border-b hover:bg-gray-100"'>
              <td
                scope="row"
                className="flex items-center px-6 py-3 font-medium text-gray-900 whitespace-nowrap"
              >
                <Avatar
                  style={{ color: '#3f3fff', backgroundColor: '#DEFFE0' }}
                >
                  {[props.name[0]]}
                </Avatar>
                <div className="px-3">{[props.name]}</div>
              </td>
              <td className="px-6 py-3">{[...props.role]}</td>
              <td className="px-6 py-3 text-blue-700">
                {<a>{[...props.actions]}</a>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
