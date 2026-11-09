export type FreeClass = {
  date: string
  hour: string
  minutes: number
  name: string
  teacher: string
}

const shortDays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
const longDays = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']

type Slot = [hour: string, minutes: number, name: string, teacher?: string]

function on(date: string, slots: Slot[]): FreeClass[] {
  return slots.map(([hour, minutes, name, teacher = '']) => ({
    date,
    hour,
    minutes,
    name,
    teacher,
  }))
}

const monday: Slot[] = [
  ['10:00', 60, 'Sunrise Energy EN', 'Laura'],
  ['18:00', 75, 'Strong Vinyasa', 'Michelle'],
  ['19:35', 60, 'soft evening flow', 'Michelle'],
  ['21:00', 45, 'Yin & Meditation', 'Eleonora'],
]

const tuesday: Slot[] = [
  ['10:00', 60, 'Yoga für unteren Rücken', 'Lilly'],
  ['17:00', 45, 'soft pilates', 'Lilly'],
  ['17:45', 75, 'Prenatal Yoga'],
  ['19:15', 75, 'Yoga für Anfänger', 'Yara'],
  ['20:45', 45, 'Yin & Sound EN', 'Lilly'],
]

const wednesday: Slot[] = [
  ['07:00', 45, 'Power Yoga Arms & Core', 'Alena'],
  ['17:00', 45, 'Schultern & Nacken Yoga', 'Lilly'],
  ['18:00', 75, 'Yin Reset', 'Denise'],
  ['19:30', 60, 'Pilates Flow', 'Lilly'],
  ['21:00', 45, 'Deep sleep sound bath', 'Hila'],
]

const thursday: Slot[] = [
  ['10:30', 60, 'Yoga for flexibility', 'Lilly'],
  ['12:00', 45, 'Sculpt Pilates', 'Lilly'],
  ['17:15', 60, 'Pilates mobility flow', 'Lilly'],
  ['18:30', 75, 'Rücken & Faszien', 'Julia'],
  ['20:00', 60, 'Yoga & Journaling -EN', 'Lea'],
]

const friday: Slot[] = [
  ['08:00', 60, 'Yoga für Balance', 'Alena'],
  ['17:00', 45, 'Rücken und Nacken Yoga', 'Lea'],
  ['18:15', 60, 'Pilates Flow', 'Lilly'],
  ['19:15', 45, 'DEEP STRETCH, GROUND & FLOW', 'Jenny'],
  ['20:00', 45, 'sound healing: unwind and restore', 'Hila'],
]

const saturday: Slot[] = [
  ['10:00', 75, 'Rücken Power Flow', 'Rebekka'],
  ['11:30', 45, 'mindful stretching', 'Lilly'],
  ['16:15', 45, 'Pilates mobility flow DE'],
  ['17:30', 60, 'Aquarell Kunstworkshop free flow', 'Lilly'],
  ['18:15', 105, 'Yoga Art and Chill', 'Lilly'],
  ['19:00', 60, 'Slow flow', 'Lilly'],
  ['20:15', 60, 'Chakra balancing Yin Yoga', 'Lilly'],
]

const sunday: Slot[] = [
  ['11:00', 75, 'Slow flow with Aroma and Tea', 'Ritika'],
  ['16:00', 135, 'TEE und KUNST Aquarell Malerei event', 'Lilly'],
  ['18:30', 75, 'Reset & Recharge', 'Ulrike'],
  ['20:00', 60, 'Vin to Yin Yoga', 'Lilly'],
]

export const freeMonthLabel = 'November 2026'

export const freeClasses: FreeClass[] = [
  ...on('2026-11-02', [
    ['10:00', 60, 'Sunrise Energy EN', 'Laura'],
    ['18:00', 75, 'Strong Vinyasa', 'Lilly'],
    ['19:35', 60, 'soft evening flow', 'Lilly'],
  ]),
  ...on('2026-11-03', [
    ['10:00', 60, 'Yoga für unteren Rücken', 'Lilly'],
    ['17:00', 45, 'soft pilates', 'Lilly'],
    ['18:00', 60, 'Back and shoulder Yoga', 'Lilly'],
  ]),
  ...on('2026-11-04', [
    ['07:00', 45, 'Power Yoga Arms & Core', 'Alena'],
    ['17:00', 45, 'Schultern & Nacken Yoga', 'Lilly'],
    ['18:00', 75, 'Yin Reset', 'Lilly'],
  ]),
  ...on('2026-11-05', thursday),
  ...on('2026-11-06', [
    ['17:00', 45, 'Rücken und Nacken Yoga', 'Lilly'],
    ['18:15', 60, 'Pilates Flow', 'Lilly'],
    ['20:00', 45, 'sound healing: unwind and restore', 'Lilly'],
  ]),
  ...on('2026-11-07', [
    ['10:00', 75, 'Rücken Power Flow', 'Lilly'],
    ['11:30', 45, 'mindful stretching', 'Lilly'],
    ['18:15', 105, 'Yoga Art and Chill', 'Lilly'],
  ]),
  ...on('2026-11-08', [
    ['18:30', 75, 'Reset & Recharge', 'Ulrike'],
  ]),
  ...on('2026-11-09', monday),
  ...on('2026-11-10', [
    ['10:00', 60, 'Yoga für unteren Rücken', 'Lilly'],
    ['17:45', 75, 'Prenatal Yoga'],
    ['19:15', 75, 'Yoga für Anfänger', 'Yara'],
    ['20:45', 45, 'Yin & Sound EN', 'Lilly'],
  ]),
  ...on('2026-11-11', wednesday),
  ...on('2026-11-12', thursday),
  ...on('2026-11-13', [
    ['08:00', 60, 'Yoga für Balance', 'Alena'],
    ['17:00', 45, 'Rücken und Nacken Yoga', 'Lea'],
    ['18:15', 60, 'Pilates Flow', 'Lilly'],
    ['20:00', 45, 'sound healing: unwind and restore', 'Hila'],
  ]),
  ...on('2026-11-14', saturday),
  ...on('2026-11-15', sunday.slice(1)),
  ...on('2026-11-16', monday),
  ...on('2026-11-17', tuesday),
  ...on('2026-11-18', wednesday),
  ...on('2026-11-19', thursday),
  ...on('2026-11-20', friday),
  ...on('2026-11-21', saturday),
  ...on('2026-11-22', sunday),
  ...on('2026-11-23', monday),
  ...on('2026-11-24', tuesday),
  ...on('2026-11-25', wednesday),
  ...on('2026-11-26', thursday),
  ...on('2026-11-27', friday),
  ...on('2026-11-28', [
    ['10:00', 75, 'Rücken Power Flow', 'Rebekka'],
    ['11:30', 60, 'Vin to Yin Yoga', 'Lilly'],
    ['11:30', 45, 'mindful stretching', 'Lilly'],
    ['16:15', 45, 'Pilates mobility flow DE'],
    ['17:30', 60, 'Aquarell Kunstworkshop free flow', 'Lilly'],
    ['18:15', 105, 'Yoga Art and Chill', 'Lilly'],
    ['19:00', 60, 'Slow flow', 'Lilly'],
    ['20:15', 60, 'Chakra balancing Yin Yoga', 'Lilly'],
  ]),
  ...on('2026-11-29', sunday),
  ...on('2026-11-30', monday),
]

export const freeWeeks: string[][] = [
  ['2026-11-02', '2026-11-03', '2026-11-04', '2026-11-05', '2026-11-06', '2026-11-07', '2026-11-08'],
  ['2026-11-09', '2026-11-10', '2026-11-11', '2026-11-12', '2026-11-13', '2026-11-14', '2026-11-15'],
  ['2026-11-16', '2026-11-17', '2026-11-18', '2026-11-19', '2026-11-20', '2026-11-21', '2026-11-22'],
  ['2026-11-23', '2026-11-24', '2026-11-25', '2026-11-26', '2026-11-27', '2026-11-28', '2026-11-29'],
  ['2026-11-30'],
]

function utcDate(date: string) {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day))
}

export function dayChip(date: string) {
  const value = utcDate(date)
  return {
    weekday: shortDays[value.getUTCDay()],
    day: String(value.getUTCDate()).padStart(2, '0'),
  }
}

export function classDayLabel(date: string) {
  const value = utcDate(date)
  const [year, month, day] = date.split('-')
  return `${longDays[value.getUTCDay()]}, ${day}.${month}.${year}`
}

export function classStartsAt(item: FreeClass) {
  return new Date(`${item.date}T${item.hour}:00+01:00`).getTime()
}

export function findFreeClass(date: string, hour: string, name: string) {
  return freeClasses.find(item => item.date === date && item.hour === hour && item.name === name)
}
