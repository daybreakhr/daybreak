export default function ProgressBar() {
  return (
    <div className="mx-10">
      <div className="flex justify-between">
        <p className="text-gray-600 mx texts-xs">Status :</p>
        <div className="flex items-center">
          <div className="w-2 h-2 mx-1 bg-yellow-500 rounded-full" />
          <p>Newly Applied</p>
        </div>
      </div>
      <div className="flex justify-between mt-2 text-base font-medium">
        <div className="w-20 text-center text-white bg-yellow-500 rounded-l-lg">
          1
        </div>
        <div className="w-20 text-center bg-gray-200">2</div>
        <div className="w-20 text-center bg-gray-200">3</div>
        <div className="w-20 text-center bg-gray-200">4</div>
        <div className="w-20 text-center bg-gray-200 rounded-r-lg">5</div>
      </div>
    </div>
  )
}
