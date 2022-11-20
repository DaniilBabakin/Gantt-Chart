import { useTypedSelector } from "store"
import "./list.scss"
import ListArrow from "../../../assets/ListArrow.png"
export const List = () => {
  const charts = useTypedSelector((state) => state.chartsData.data)
  let nestedLvl = 1
  const transformSubToHtml = (subItem?: ChartType[]) => {
    nestedLvl = nestedLvl + 1
    if (subItem) {
      return subItem.map((item) => {
        return (
          <details className={`tree-nav__item ${item.sub && "is-expandable"}`}>
            <summary className="tree-nav__item-title" style={{ paddingLeft: `${50 * nestedLvl}px` }}>
              <img src={ListArrow} className="tree-nav__item-title__image"></img>
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
        <summary className="tree-nav__item-title first">{charts.chart.title}</summary>
        {transformSubToHtml(charts.chart.sub)}
      </details>
    </div>
  )
}
