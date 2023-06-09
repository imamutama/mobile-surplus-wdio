import { swipeAtCoordinates } from './gestures'

class Action {

    async isVisible(locator: string) {
        return !!$(locator).isDisplayed()
    }

    async isTextVisible(text: string) {
        return $(`/*//*[@text='${text}']`).isDisplayed()
    }

    async tap(locator: string) {
        const element = await this.waitForElement(locator)
        await element.click()
    }

    public async tapByIndex(locator: string, index: number) {
        const elements = await $$(locator)
        await elements[index].click()
    }

    async waitForElement(locator: string) {
        await $(locator).waitForExist()
        return $(locator)
    }

    async clearText(locator: string) {
        $(locator).clearValue()
    }

    async input(locator: string, inputText: string) {
        await $(locator).addValue(inputText)
    }

    async getText(locator: string) {
        return $(locator).getText()
    }

    async waitUntilTextIsDisplayed(text: string) {
        try {
            await $(`/*//*[@text='${text}']`).waitForExist({ timeout: 10000 })
        } catch {
            throw new Error('Text not expected for element validation')
        }
    }

    async tapByText(text: string) {
        const element = $(`/*//*[@text='${text}']`)
        await element.click()
    }

    async slideBtn(locator: string) {
        const screen = await $(locator)
        const xLocation = await screen.getLocation('x')
        const yLocation = await screen.getLocation('y')
        screen.touchPerform([
            { action: 'press', options: { x: xLocation + 100, y: yLocation + 50 } },
            { action: 'wait', options: { ms: 1000 } },
            { action: 'moveTo', options: { x: yLocation / 2, y: yLocation + 50 } },
            { action: 'release' }
        ])
    }

    async selectDropdown(locator: string, text: string) {
        await this.waitForElement(locator)
        await this.tap(locator)
        if (!await this.isTextVisible(text)) {
            await this.scrollDownAndTapText(text)
        } else {
            await this.tapByText(text)
        }
    }

    async validateNotEmpty(locator: string) {
        await $(locator).waitForExist()
        await expect($(locator).getText()).not.toBeNull()
    }

    async validateNotDisplayed(locator: string) {
        await expect($(locator)).not.toBeDisplayed()
    }

    async swipeUp() {
        const dimension = driver.getWindowRect()
        const x = (await dimension).width * 0.5
        const startY = (await dimension).height * 0.8
        const endY = (await dimension).height * 0.4
        await swipeAtCoordinates({ x: x, y: startY }, { x: x, y: endY })
    }

    async swipeDown() {
        const dimension = driver.getWindowRect()
        const x = (await dimension).width * 0.5
        const startY = (await dimension).height * 0.2
        const endY = (await dimension).height * 0.8
        await swipeAtCoordinates({ x: x, y: startY }, { x: x, y: endY })
    }

    async scrollDownToElement(locator: string) {
        const maxSwipeCount = 7
        for (let i = 0; i < maxSwipeCount; i++) {
            if (await $(locator).isDisplayed()) {
                return
            }
            await this.swipeUp()
        }
    }

    async scrollUpToElement(locator: string) {
        const maxSwipeCount = 7
        for (let i = 0; i < maxSwipeCount; i++) {
            if (await $(locator).isDisplayed()) {
                return
            }
            await this.swipeDown()
        }
    }

    async scrollDownAndTapText(text: string) {
        const maxSwipeCount = 7
        for (let i = 0; i < maxSwipeCount; i++) {
            if (!await this.isTextVisible(text)) {
                await this.swipeUp()
                await driver.pause(3000)
            } else {
                await this.tapByText(text)
                break
            }
        }
    }

    async getNumberFromRp(text: string) {
        if (text.includes('.')) {
            let value: number = +(text.substring(text.indexOf('p') + 1).replace(/\./g, ''))
            return value
        } else if (text.includes(',')) {
            let value: number = +(text.substring(text.indexOf('p') + 1).replace(/,/g, ''))
            return value
        }
    }

    async getNumberFromString(text: string) {
        let value: number = +(text.replace(/\./g, ''))
        return value
    }

    public getEnv(envName: string) {
        let value = <string>process.env[envName]
        if ((value === undefined) || (value === '')) {
            throw new Error(`'${envName}' not defined / have no value in .env file!`)
        }
        return value
    }

    async tapByRescourceIndex(locator: string, index: number) {
        const element = await this.waitForElement(locator + '[' + index + ']')
        await element.click()
    }

    async getTextByIndex(locator: string, index: number) {
        const element = await this.waitForElement(locator + '[' + index + ']')
        await element.getText()
    }

    async tapBackDevice() {
        await driver.pressKeyCode(4)
    }

    async swipeElementById(locator: string) {
        const screen = await $(locator)
        const xLocation = await screen.getLocation('x')
        const yLocation = await screen.getLocation('y')
        screen.touchPerform([
            { action: 'press', options: { y: yLocation, x: xLocation + 50 } },
            { action: 'wait', options: { ms: 1000 } },
            { action: 'moveTo', options: { y: yLocation + 1000, x: xLocation + 50 } },
            { action: 'release' }
        ])
    }
}

export default new Action()

