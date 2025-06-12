import { Metal_Mania } from 'next/font/google'

const metalMania = Metal_Mania({
  subsets: ['latin'],
  weight: ['400'],
})

type Day = {
  date: string
  label: string
}

const DAYS: Day[] = [
  { date: '2025-06-18', label: 'June 18' },
  { date: '2025-06-19', label: 'June 19' },
  { date: '2025-06-20', label: 'June 20' },
  { date: '2025-06-21', label: 'June 21' },
]

type DaySelectorProps = {
  selectedDate: string
  onDateSelect: (date: string) => void
}

export function DaySelector({ selectedDate, onDateSelect }: DaySelectorProps) {
  return (
    <div className='flex gap-2'>
      {DAYS.map(day => (
        <button
          key={day.date}
          onClick={() => onDateSelect(day.date)}
          className={`px-4 py-2 rounded ${
            selectedDate === day.date
              ? 'bg-[#dc2626] text-white'
              : 'bg-gray-800 text-white hover:bg-gray-700'
          } ${metalMania.className}`}
        >
          {day.label}
        </button>
      ))}
    </div>
  )
}
