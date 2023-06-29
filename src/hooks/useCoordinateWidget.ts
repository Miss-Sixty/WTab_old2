export default (colsNum: number) => {
  return (arr: Array<any>): Array<number[]> => {
    const _arr = []
    for (let i = 0; i < arr.length; i++) {
      const { w, h } = arr[i]
      const [x, y] = arr[i].position[colsNum]
      const maxX = x + w - 1
      const maxY = y + h - 1
      for (let j = x; j <= maxX; j++) {
        for (let k = y; k <= maxY; k++) {
          _arr.push([j, k])
        }
      }
    }

    return _arr
  }
}
