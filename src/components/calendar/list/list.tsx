import { useTypedSelector } from "store"
import "./list.scss"
import ListArrow from "../../../assets/ListArrow.png"
import { transformPeriod } from "../utils/transformPeriod"
import { updateChartBody } from "store/chartData/chartData"
import { useDispatch } from "react-redux"
import Planes from "../../../assets/ListIcons/Planes.png"
import LightBulb from "../../../assets/ListIcons/LightBulb.png"
import Flash from "../../../assets/ListIcons/Flash.png"
import Target from "../../../assets/ListIcons/Target.png"
import Bookmark from "../../../assets/ListIcons/Bookmark.png"
export const List = () => {
  const charts = useTypedSelector((state) => state.chartsData.data)
  const dispatch = useDispatch()
  let nestedLvl = 1
  let chartBody = [
    {
      nestedLvl: nestedLvl,
      startDate: transformPeriod(charts.chart.period_start),
      endDate: transformPeriod(charts.chart.period_end),
      title: charts.chart.title,
    },
  ]
  const transformSubToHtml = (subItem?: ChartType[]) => {
    nestedLvl = nestedLvl + 1
    if (subItem) {
      return subItem.map((item, index) => {
        chartBody = Object.assign([], chartBody)
        chartBody.push({
          nestedLvl: nestedLvl,
          startDate: transformPeriod(item.period_start),
          endDate: transformPeriod(item.period_end),
          title: item.title,
        })
        if (!item.sub) {
          dispatch(updateChartBody(chartBody))
        }

        return (
          <details className={`tree-nav__item ${item.sub && "is-expandable"}`} key={`${item.id}-${index}`}>
            <summary className="tree-nav__item__title" style={{ paddingLeft: `${20 + 10 * nestedLvl}px` }}>
              <img src={ListArrow} className={`tree-nav__item__title__image ${!item.sub && "hidden"}`} />
              {/* Этот вариант с иконками в зависимости от уровня вложенности - тестовый */}
              <img
                className="tree-nav__item__title__icon"
                src={nestedLvl === 2 ? LightBulb : nestedLvl === 3 ? Bookmark : nestedLvl === 4 ? Target : Flash}
              />
              <span className="tree-nav__item__title__sub-number">{item.sub?.length || 0}</span>
              {item.title}
            </summary>
            {item.sub && transformSubToHtml(item.sub)}
          </details>
        )
      })
    }
  }
  return (
    <div className="list">
      <details className="tree-nav__item is-expandable first">
        <summary className="tree-nav__item__title first">
          <img src={ListArrow} className={`tree-nav__item__title__image ${!charts.chart.sub && "hidden"}`}></img>
          <img className="tree-nav__item__title__icon" src={Planes} />
          <span className="tree-nav__item__title__sub-number">{charts.chart.sub?.length}</span>
          {charts.chart.title}
        </summary>
        {transformSubToHtml(charts.chart.sub)}
      </details>
    </div>
  )
}
