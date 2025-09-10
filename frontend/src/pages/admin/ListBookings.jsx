import React, { useState, useEffect } from 'react'
import Loading from '../../components/Loading'
import Title from '../../components/admin/Title'
import { dateFormat } from '../../lib/dateFormat'
import { useAppContext } from '../../context/AppContext'

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY
  const { axios, getToken, user } = useAppContext()

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getAllBookings = async () => {
    try {
      const { data } = await axios.get('/api/admin/all-bookings', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      setBookings(data.bookings || [])
    } catch (error) {
      console.error(error)
      setBookings([])
    }
    setIsLoading(false)
  };

  useEffect(() => {
    if (user) {
      getAllBookings();
    }
  }, [user]);

  if (isLoading) return <Loading />

  return (
    <>
      <Title text1="List" text2="Bookings" />
      <div className='max-w-4xl mt-6 overflow-x-auto'>
        <table className='w-full border-collapse rounded-md overflow-hidden whitespace-nowrap'>
          <thead>
            <tr className='bg-primary/20 text-left text-white'>
              <th className='p-2 font-medium pl-5'>User Name</th>
              <th className='p-2 font-medium'>Movie Name</th>
              <th className='p-2 font-medium'>Show Time</th>
              <th className='p-2 font-medium'>Seats</th>
              <th className='p-2 font-medium'>Amounts</th>
            </tr>
          </thead>
          <tbody className='text-sm font-light'>
            {bookings.length > 0 ? (
              bookings.map((item, index) => (
                <tr key={index} className='border-b border-primary/10 bg-primary/5 even:bg-primary/10'>
                  <td className='p-2 min-w-45 pl-5'>{item.user?.name || 'N/A'}</td>
                  <td className='p-2'>{item.show?.movie?.title || 'N/A'}</td>
                  <td className='p-2'>{item.show?.showDateTime ? dateFormat(item.show.showDateTime) : 'N/A'}</td>
                  <td className='p-2'>
                    {item.bookedSeats
                      ? Object.keys(item.bookedSeats).map(seat => item.bookedSeats[seat]).join(", ")
                      : 'N/A'}
                  </td>
                  <td className='p-2'>{currency} {item.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-400">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ListBookings