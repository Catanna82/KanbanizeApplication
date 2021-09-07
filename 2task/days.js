const WeekDays = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7
}

function weekDays(startDay, endDay, startDate) {
    let monthDay = startDate.getDate();
    let firstWorkday = startDate;
    let dateNum = startDate.getDay();
    if ((endDay > startDay && dateNum >= startDay && dateNum <= endDay) || (startDay > endDay && (dateNum >= startDay || dateNum <= endDay))) {
        firstWorkday = startDate;
    } else {
        let newDateNum;
        if (dateNum < startDay) {
            newDateNum = startDay - dateNum;
        } else if (dateNum > endDay) {
            newDateNum = 7 - dateNum + startDay;
        }
        firstWorkday.setDate(monthDay + newDateNum);
    }
    return firstWorkday;
}

// const firstWorkday = weekDays(WeekDays.Tuesday, WeekDays.Friday, new Date(2021, 5, 7));
// console.log(firstWorkday); // Tue Jun 08 2021 00:00:00

const firstWorkday = weekDays(WeekDays.Monday, WeekDays.Friday, new Date(2021, 5, 5));
console.log(firstWorkday); // Mon Jun 07 2021 00:00:00

// const firstWorkday = weekDays(WeekDays.Thursday, WeekDays.Monday, new Date(2021, 5, 5));
// console.log(firstWorkday); // Mon Jun 05 2021 00:00:00