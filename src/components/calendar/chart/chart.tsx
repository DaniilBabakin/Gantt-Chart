import moment from "moment"
import { useTypedSelector } from "store"
import { backgroundColorAssign } from "../utils/backgroundColorAssign"
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
      const endDay = duration[1]
      let left = 0,
        width = 0

      if (tasksStartDay) {
        const filteredArray = daysArray.filter((day) => day.dataset.date == tasksStartDay)
        left = filteredArray[0].offsetLeft
      }

      if (endDay) {
        const filteredArray = daysArray.filter((day) => day.dataset.date == endDay)
        const offset = filteredArray[0].offsetLeft + filteredArray[0]?.parentElement!.parentElement!.offsetLeft
        if (offset) {
          width = offset + daysArray[1].offsetLeft - left
        }
      }

      // apply css
      el.style.left = `${left}px`
      el.style.width = `${width}px`

      el.style.backgroundColor = `${el.dataset.color}`
      el.style.border = `1px solid ${el.dataset.border}`
      el.style.opacity = "1"
    })
  }
  const headerArray: { startDate: string; endDate: string; data: any }[] = []
  function createHeader(startDate: number) {
    let dateForCycle = moment.unix(startDate).subtract(1, "days").format("LLL") // Дата начала

    for (let week = 0; week < 8; week++) {
      const listOfDays: string[] = []
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
            {listOfDays.map((item, index: number) => {
              return (
                <li
                  className={`chart__days__item ${index >= 5 ? "small-opacity" : ""}`}
                  key={`${item}-${index}`}
                  data-date={`${moment(item)
                    .format("M-D")
                    .replace(/\b(\d{1})\b/g, "0$1")}`}
                >
                  {moment(item).format("D")}
                </li>
              )
            })}
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
      <div className="chart__wrapper">
        <ul className="chart__values">
          {headerArray.map((item, index) => (
            <li key={`${item.startDate}-${index}`} className="chart__values__item">
              <span className="chart__values__item__title">{`${item.startDate} - ${item.endDate}`}</span>
              {item.data}
            </li>
          ))}
        </ul>
        <ul className="chart-bars">
          {chartData.chartBody.map((item, index) => {
            return (
              <li
                className="chart-bars__item"
                key={`${item.title}-${index}`}
                data-duration={`${item.startDate};${item.endDate}`}
                data-color={`var(${backgroundColorAssign(item.nestedLvl)})`}
                data-border={`var(${backgroundColorAssign(item.nestedLvl)})`.replace(
                  "--additional-",
                  "--additional-border-",
                )}
              >
                <span className="chart-bars__item__title">{item.title}</span>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="chart__shadow"></div>
    </div>
  )
}
