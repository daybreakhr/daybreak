import { Avatar, Rate } from 'antd'

export default function CandidateCard() {
  return (
    <div className="w-full p-4 bg-white rounded shadow-md cursor-pointer">
      <div className="flex items-center space-x-2">
        <Avatar>K</Avatar>
        <p className="font-semibold">Kanit Mann</p>
      </div>
      <Rate allowHalf value={3.5} disabled />
    </div>
  )
}
