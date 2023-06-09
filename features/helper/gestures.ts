interface XY {
    x:number
    y:number
 }

export async function swipeAtCoordinates(from: XY, to: XY) {
    await driver.touchPerform([
        { action: 'press', options: { x: from.x, y: from.y } },
        { action: 'wait', options: { s: 7 } },
        { action: 'moveTo', options: { x: to.x, y: to.y } },
        { action: 'release' }
    ])
}
