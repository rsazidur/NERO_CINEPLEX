import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import { ClockIcon } from 'lucide-react'
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets'
import { useState } from 'react'
import BlurCircle from '../components/BlurCircle'
import { groupRows, renderSeats } from '../utils/seatUtils'

const SeatLayout = () => {

    const {id, date} = useParams()
    const [selectedSeats, setSelectedSeats] = useState([])
    const [selectedTime, setSelectedTime] = useState(null)
    const [show, setShow] = useState(null)

    const navigate = useNavigate()

    const getShow = async () => {
        const show = dummyShowsData.find(show => show._id === id)
        if (show) {
            setShow({
                movie: show,
                dateTime: dummyDateTimeData
            })
        }
    }

    useEffect(() => {
      getShow()
    }, [])

  return show ? (
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30
    md:pt-50'>
      {/* Available Timings */}
      <div className='w-60 bg-primary/10 border border-primary/20 rounded-b-lg py-10
      h-max md:sticky md:top-30'>
        <p className='text-lg font-semibold px-6'>Available Timings</p>
        <div className='mt-5 space-y-1'>
          {show.dateTime[date].map(item => (
            <div className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md
            cursor-pointer transition ${selectedTime?.time === item.time ?
              "bg-primary text-white" : "hover:bg-primary/20"}`}>
              <ClockIcon className='w-4 h-4' />
              <p className='text-sm'>{item.time}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Seats Layout */}
      <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0" right="0" />
        <h1 className='text-2xl font-semibold mb-4'>Select Your Seats</h1>
        <img src={assets.screenImage} alt="screen" />
        <p className='text-gray-400 text-sm mb-6'>SCREEN SIDE</p>

        <div className='flex flex-col items-center mt-10 text-xs text-gray-300'>
          <div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap2 mb-6'>
            {groupRows[0].map(row => renderSeats(row))}
          </div>
        </div>
      </div>
    </div>
  
  ) : (
    <Loading />
  )
}

export default SeatLayout