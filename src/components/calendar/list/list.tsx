import { useTypedSelector } from "store"
import "./list.scss"
import ListArrow from "../../../assets/ListArrow.png"
import { transformPeriod } from "../utils/transformPeriod"
import { updateChartBody } from "store/chartData/chartData"
import { useDispatch } from "react-redux"
export const List = () => {
  const charts = useTypedSelector((state) => state.chartsData.data)
  const dispatch = useDispatch()
  let nestedLvl = 1
  let chartBody: any = []
  const transformSubToHtml = (subItem?: ChartType[]) => {
    nestedLvl = nestedLvl + 1

    if (subItem) {
      return subItem.map((item) => {
        chartBody = Object.assign([], chartBody)
        chartBody.push({
          startDate: transformPeriod(item.period_start),
          endDate: transformPeriod(item.period_end),
          title: item.title,
        })
        if (!item.sub) {
          dispatch(updateChartBody(chartBody))
        }

        return (
          <details className={`tree-nav__item ${item.sub && "is-expandable"}`}>
            <summary className="tree-nav__item-title" style={{ paddingLeft: `${20 + 10 * nestedLvl}px` }}>
              <img src={ListArrow} className={`tree-nav__item-title__image ${!item.sub && "hidden"}`}></img>
              <span className="tree-nav__item__sub-number">{item.sub?.length || 0}</span>
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
        <summary className="tree-nav__item-title first">
          <img src={ListArrow} className={`tree-nav__item-title__image ${!charts.chart.sub && "hidden"}`}></img>
          <span className="tree-nav__item__sub-number">{charts.chart.sub?.length}</span>
          {charts.chart.title}
        </summary>
        {transformSubToHtml(charts.chart.sub)}
      </details>
    </div>
  )
}
