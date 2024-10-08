import { format, isToday } from 'date-fns';
import Layout from '../../components/layout';
import CalendarHeader from './CalendarHeader';
import { CalendarPageProps } from './components/types';
import { getCalendarData } from './components/utils';

export default async function CalendarPage({
  searchParams,
}: CalendarPageProps) {
  const year = parseInt(searchParams.year || `${new Date().getFullYear()}`);
  const month = parseInt(searchParams.month || `${new Date().getMonth() + 1}`);

  const { days, formattedBookings } = await getCalendarData(year, month);

  return (
    <Layout>
      <div className='p-5 bg-gray-100 font-sans'>
        <h1 className='text-2xl font-bold mb-4'>Booking Calendar</h1>
        <CalendarHeader year={year} month={month} />
        <div className='grid grid-cols-7 gap-4'>
          {days.map((day) => {
            const dayString = format(day, 'yyyy-MM-dd');
            const dayBookings = (formattedBookings[dayString] || []).sort(
              (a, b) => a.time.localeCompare(b.time)
            );
            const isTodayClass = isToday(day) ? 'bg-blue-100' : '';

            return (
              <div
                key={dayString}
                className={`bg-white border border-gray-300 p-3 rounded-lg shadow-sm ${isTodayClass}`}
              >
                <strong className='block text-xl font-semibold mb-2'>
                  {format(day, 'd')}
                </strong>
                <div>
                  {dayBookings.length > 0 ? (
                    dayBookings.map((booking, index) => (
                      <div
                        key={index}
                        className='bg-blue-500 text-white p-2 rounded-md text-sm mb-1'
                      >
                        <strong>{booking.time}</strong>
                        <div>{booking.service}</div>
                        <div>{booking.customer}</div>
                      </div>
                    ))
                  ) : (
                    <div className='text-gray-500 text-sm'>No bookings</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
