import React, { useState, useEffect } from 'react'
import Loading from '../../components/Loading'
import Title from '../../components/admin/Title'
import { dateFormat } from '../../lib/dateFormat'
import { useAppContext } from '../../context/AppContext'

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY
  const { axios, getToken, user } = useAppContext()

  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(true)

  const getAllShows = async () => {
    try {
      const { data } = await axios.get('/api/admin/all-shows', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      setShows(data.shows || [])
    } catch (error) {
      console.error(error)
      setShows([])
    }
    setLoading(false)
  }

  useEffect(() => {
    if (user) getAllShows()
  }, [user])

  if (loading) return <Loading />

  return (
    <>
      <Title text1="List" text2="Shows" />
      <div className='max-w-4xl mt-6 overflow-x-auto'>
        <table className='w-full border-collapse rounded-md overflow-hidden whitespace-nowrap'>
          <thead>
            <tr className='bg-primary/20 text-left text-white'>
              <th className='p-2 font-medium pl-5'>Movie Name</th>
              <th className='p-2 font-medium'>Show Date</th>
              <th className='p-2 font-medium'>Total Bookings</th>
              <th className='p-2 font-medium'>Earnings</th>
            </tr>
          </thead>
          <tbody className='text-sm font-light'>
            {shows.length > 0 ? (
              shows.map((show, index) => (
                <tr key={index} className='border-b border-primary/10 bg-primary/5 even:bg-primary/10'>
                  <td className='p-2 min-w-45 pl-5'>{show.movie?.title || 'N/A'}</td>
                  <td className='p-2'>{show.showDateTime ? dateFormat(show.showDateTime) : 'N/A'}</td>
                  <td className='p-2'>{Object.keys(show.occupiedSeats || {}).length}</td>
                  <td className='p-2'>
                    {currency}
                    {show.showPrice && show.occupiedSeats
                      ? show.showPrice * Object.keys(show.occupiedSeats).length
                      : 0}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-400">
                  No shows found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ListShows