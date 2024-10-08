import { eachDayOfInterval, endOfMonth, format, startOfMonth } from 'date-fns';
import prisma from '../../../lib/prismaClient';
import { FormattedBookings } from './types';

// Fetch booking data
export const fetchBookings = async (year: number, month: number) => {
  const start = startOfMonth(new Date(year, month - 1));
  const end = endOfMonth(start);

  return await prisma.booking.findMany({
    where: {
      bookedTime: {
        gte: start,
        lte: end,
      },
    },
    include: {
      service: {
        select: {
          name: true,
        },
      },
      customer: {
        select: {
          name: true,
        },
      },
    },
  });
};

// Format bookings into a calendar-friendly format
export const formatBookings = (
  bookings: Awaited<ReturnType<typeof fetchBookings>>
): FormattedBookings => {
  return bookings.reduce((acc, booking) => {
    const date = format(new Date(booking.bookedTime), 'yyyy-MM-dd');
    const time = format(new Date(booking.bookedTime), 'HH:mm');

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push({
      time,
      service: booking.service.name,
      customer: booking.customer.name,
    });
    return acc;
  }, {} as FormattedBookings);
};

//handle month selection
export const handleMonthChange = (
  direction: 'prev' | 'next',
  year: number,
  month: number,
  router: any
) => {
  let newMonth = month;
  let newYear = year;

  if (direction === 'prev') {
    newMonth = month === 1 ? 12 : month - 1;
    if (month === 1) newYear -= 1;
  } else {
    newMonth = month === 12 ? 1 : month + 1;
    if (month === 12) newYear += 1;
  }

  router.push(`/calendar?year=${newYear}&month=${newMonth}`);
};

// Function to handle the logic in CalendarPage
export const getCalendarData = async (year: number, month: number) => {
  const bookings = await fetchBookings(year, month);
  const formattedBookings: FormattedBookings = formatBookings(bookings);

  const start = startOfMonth(new Date(year, month - 1));
  const end = endOfMonth(start);
  const days = eachDayOfInterval({ start, end });

  return { days, formattedBookings };
};
