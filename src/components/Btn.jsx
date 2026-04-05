import React from 'react'

const Btn = (props) => {
  return (
    <button
      onClick={props.func}
      className="mt-4 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-base font-semibold rounded-full shadow-md transition-all duration-200 cursor-pointer"
    >
      {props.title}
    </button>
  )
}

export default Btn