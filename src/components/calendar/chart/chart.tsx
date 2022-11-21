import moment from "moment"
import { useTypedSelector } from "store"
import "./chart.scss"

export const Chart = () => {
  const chartData = useTypedSelector((state) => state.chartsData)
  const startDate = moment(chartData.data.chart.period_start).unix()
  function createChart() {
    const days = document.querySelectorAll(".chart__values .chart__days__item") as NodeListOf<HTMLElement>
    const tasks = document.querySelectorAll(".chart-bars li") as NodeListOf<HTMLElement>
    const daysArray = [...days]
    tasks.forEach((el) => {
      const duration = el.dataset.duration!.split(";")
      const tasksStartDay = duration[0]
      console.log(tasksStartDay)
      const endDay = duration[1]
      let left = 0,
        width = 0

      if (tasksStartDay) {
        const filteredArray = daysArray.filter((day) => day.dataset.date == tasksStartDay)
        console.log("FI", filteredArray)
        left = filteredArray[0].offsetLeft
      }

      if (endDay) {
        const filteredArray = daysArray.filter((day) => day.dataset.date == endDay)
        width = filteredArray[0].offsetLeft - left
      }

      // apply css
      el.style.left = `${left}px`
      el.style.width = `${width}px`

      el.style.backgroundColor = `${el.dataset.color}`
      el.style.opacity = "1"
    })
  }
  const headerArray: any = []
  function createHeader(startDate: number) {
    let dateForCycle = moment.unix(startDate).format("LLL") // Дата начала

    for (let week = 0; week < 8; week++) {
      const listOfDays = []
      let endDateForCycle = dateForCycle

      for (let day = 0; day < 7; day++) {
        listOfDays.push(endDateForCycle)
        endDateForCycle = moment(endDateForCycle).add(1, "days").format("LLL") // Добавляем день к дате ( 2 сентября -> 3 сентября )
      }

      headerArray.push({
        startDate: moment(dateForCycle)
          .format("D MMM")
          .replace(/\b(\d{1})\b/g, "0$1"),
        endDate: moment(endDateForCycle)
          .subtract(1, "days")
          .format("D MMM")
          .replace(/\b(\d{1})\b/g, "0$1"),
        data: (
          <ul className="chart__days">
            {listOfDays.map((item: any) => (
              <li
                className="chart__days__item"
                data-date={`${moment(item)
                  .format("M-D")
                  .replace(/\b(\d{1})\b/g, "0$1")}`}
              >
                {moment(item).format("D")}
              </li>
            ))}
          </ul>
        ),
      })

      dateForCycle = endDateForCycle!
    }
  }
  createHeader(startDate)
  window.addEventListener("load", createChart)

  return (
    <div className="chart">
      <div className="chart-wrapper">
        <ul className="chart__values">
          {headerArray.map((item: any) => (
            <li className="chart__values__item">
              <span className="chart__values__item__title">{`${item.startDate} - ${item.endDate}`}</span>
              {item.data}
            </li>
          ))}
        </ul>
        <ul className="chart-bars">
          {chartData.chartBody.map((item: any) => {
            return (
              <li data-duration={`${item.startDate};${item.endDate}`} data-color="#b03532">
                {item.title}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
