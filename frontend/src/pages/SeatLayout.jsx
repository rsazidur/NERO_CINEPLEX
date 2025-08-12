import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'

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
      {/* Available Seats */}
      <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10
      h-max md:sticky md:top-30'></div>

      {/* Seats Layout */}
      <div></div>

    </div>
  ) : (
    <Loading />
  )
}

export default SeatLayout