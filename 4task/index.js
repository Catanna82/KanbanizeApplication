async function barChartData(filePath, option = 'd') {
  // option: 'd' = day, 'w' = week, 'm' = month
  try {

    const data = await fetch(filePath)
      .then(r => r.text())
      .then(v => v.split('\r\n'));
    data.shift();
    let dataNew = data.filter(r => r.length > 0).map(r => {
      let [cardId, title, createdAt, startDate] = r.split(',');
      return {
        cardId,
        title,
        createdAt,
        startDate
      };
    });
    switch (option) {
      case 'd':
        const dates = Array.from(new Set(
          dataNew.filter(v => v.startDate).map(r => {
            return r.startDate.split(' ')[0];
          })
        )).sort((a, b) => a.localeCompare(b))
          .reduce((a, c) => {
            a[c] = 0;
            return a;
          }, {});
        dataNew.forEach(v => {
          if (v.startDate) {
            const currentStartDate = v.startDate.split(' ')[0];
            dates[currentStartDate]++;
          }
        });
        return Promise.resolve(dates);
      case 'w':
        const weeks = Array.from(new Set(
          dataNew.filter(v => v.startDate).map(r => {
            let weekDate = new Date(r.startDate);
            let timezoneOffset = weekDate.getTimezoneOffset() / 60;
            weekDate.setHours(weekDate.getHours() - timezoneOffset)
            let monthDay = weekDate.getDate();
            let weekDateNum = weekDate.getDay();
            if (weekDateNum === 0) {
              weekDateNum = 7;
            }
            let firstWeekDay = new Date(weekDate);
            firstWeekDay.setDate(monthDay - (weekDateNum - 1));
            let endWeekDay = new Date(weekDate);
            endWeekDay.setDate(monthDay + (7 - weekDateNum));
            let startWeekDate = firstWeekDay.toISOString().split('T')[0];
            let endWeekDate = endWeekDay.toISOString().split('T')[0];
            let week = startWeekDate + ' ' + endWeekDate;
            return week;
          })
        )).sort((a, b) => a.localeCompare(b))
          .reduce((a, c) => {
            a[c] = 0;
            return a;
          }, {});
        dataNew.forEach(v => {
          if (v.startDate) {
            const currentStartDate = v.startDate.split(' ')[0];
            for (const el in weeks) {
              let [startDate, endDate] = el.split(' ');
              if (startDate.localeCompare(currentStartDate) <= 0 && endDate.localeCompare(currentStartDate) >= 0) {
                weeks[el]++;
                break;
              }
            }
          }
        });
        return Promise.resolve(weeks);
      case 'm':
        const months = Array.from(new Set(
          dataNew.filter(v => v.startDate).map(r => {
            return r.startDate.split(' ')[0].split('-').splice(0, 2).join('-');
          })
        )).sort((a, b) => a.localeCompare(b))
          .reduce((a, c) => {
            a[c] = 0;
            return a;
          }, {});
        dataNew.forEach(v => {
          if (v.startDate) {
            const currentStartDate = v.startDate.split(' ')[0].split('-').splice(0, 2).join('-');
            months[currentStartDate]++;
          }
        });
        return Promise.resolve(months);
    }
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

async function main() {
  let result = await barChartData('./card_data.csv', 'w');
  let cardNumber = 0;
  let divElement = document.getElementById('horizontal');
  let elementBar = '';
  for (const el in result) {
    cardNumber += Number(result[el]);
  }
  for (const el in result) {
    elementBar += `<div class="bar" style="--bar-value:${(result[el]/cardNumber)*100}%;" data-name="${el} : ${result[el]}"></div>`

  }
  divElement.innerHTML = elementBar;
}
main();