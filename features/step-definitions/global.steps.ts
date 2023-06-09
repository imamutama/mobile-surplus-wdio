import { Given, Then, When } from '@wdio/cucumber-framework'
import action from '../helper/action-page'
import { pages } from '../page-objects/pages'
import data from '../helper/data'

When(/^user is on "(.+)" page$/, async (pageName) => {
    if (pageName in pages) {
        data.currentPage = pageName
        console.log('Current page: ' + data.currentPage)
    } else {
        throw new Error(`page "${pageName}" is not define in "pages.ts" file!`)
    }
})
When(/^user taps on "(.+)" button$/, async (locator) => {
    const page = pages[data.currentPage]
    if (locator in page) {
        await action.tap(page[locator])
    } else {
        throw new Error(`locator "${locator}" is not defined in page "${data.currentPage}"!`)
    }
})
When(/^user inputs "(.+)" value is "(.+)"$/, async (locator, value) => {
    const page = pages[data.currentPage]
    if (locator in page) {
        try {
            await action.waitForElement(page[locator])
            await action.input(page[locator], value)
        } catch {
            await action.input(page[locator], value)
        }
    } else {
        throw new Error(`locator "${locator}" is not defined in page "${data.currentPage}"!`)
    }
})
Then(/^user should be redirected to "(.+)" page$/, async (value) => {
    await action.isTextVisible(value)
    driver.pause(2000)
})

Then(/^user taps on text "(.+)" button$/, async (value) => {
    await action.tapByText(value)
})

When(/^user clear value on "(.+)" field$/, async function (locator) {
    const page = pages[data.currentPage]
    if (locator in page) {
        try {
            await action.clearText(page[locator])
        } catch {
            await action.clearText(page[locator])
        }
    } else {
        throw new Error(`locator "${locator}" is not defined in page "${data.currentPage}"!`)
    }
})
When(/^user waits for "(.+)" seconds$/, async (waitInSecond) => {
    await driver.pause(waitInSecond * 1000)
})

When(/^user back to previous page$/, async function () {
    await driver.back()
    await driver.pause(5000)
})

Then(/^user see message alert "([^"]*)"$/, async (message) => {
    await action.isTextVisible(message)
})

Then(/^user can verify text "(.+)"$/, async (value) => {
    await action.isTextVisible(value)
})

When(/^user tap "(.+)" back button from device$/, async (index) => {
    for (let i = 0; i < index; i++) {
        await action.tapBackDevice()
    }
})

// When(/^user choose "([^"]*)" on "([^"]*)" dropdown$/, async (option, locator) => {
//     const page = pages[data.currentPage]
//     if (locator in page) {
//         try {
//             await $(page[locator]).waitForExist()
//             await action.selectDropdown(page[locator], option)
//         } catch {
//             await action.scrollDownToElement(page[locator])
//             await action.selectDropdown(page[locator], option)
//         }
//     } else {
//         throw new Error(`locator '${locator}' is not defined in page '${data.currentPage}'!`)
//     }
// })

