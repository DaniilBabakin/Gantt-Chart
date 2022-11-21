import "./calendar.scss"
import { List } from "./list/list"
import { Chart } from "./chart/chart"
export const Calendar = () => {
  return (
    <div className="calendar">
      <div className="calendar__left">
        <p className="calendar__left__title">Work item</p>
        <List />
      </div>
      <Chart />
    </div>
  )
}
