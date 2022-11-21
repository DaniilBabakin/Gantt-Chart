//Получает на вход уровень вложенности и возвращает цвет
export const backgroundColorAssign = (nestedLvl:number) => {
    if(nestedLvl === 1){
        return "--additional-blue"
    }
    if(nestedLvl === 2){
        return "--additional-yellow"
    }
    if(nestedLvl === 3 || nestedLvl === 4){
        return "--additional-green"
    }
    if(nestedLvl >= 5){
        return "--additional-yellow"
    }
}
