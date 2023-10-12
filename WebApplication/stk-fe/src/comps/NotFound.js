import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useLocalState } from '../util/useLocalStorage';

const NotFound = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");

  function route() {
    if (typeof jwt === 'string' && jwt.length === 0) {
      console.log('string is empty');
      window.location.replace("/login");
    } else {
      console.log('string is NOT empty')
      window.location.replace("/inspection");

    }
  }

  return (
    <div className='h-screen bg-gray-100'>
      <div className='mx-auto inset-auto text-center w-full absolute top-1/3'>
        <div className='bg-white p-10 text-center md:w-1/2 mx-auto flex-wrappx-10 rounded-3xl border-2 border-gray-200'>
          <div>
            <div>Some was wrong...</div>
            <button className="m-3 p-1 px-3 rounded-lg bg-red-600 text-white text-lg font-bold" onClick={() => route()}>Back home.</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound