import { Then } from "@wdio/cucumber-framework"
import action from '../helper/action-page'

Then(/^user see message alert "([^"]*)"$/, async (locator) => {
    await expect(action.getText(locator)).toEqual("2")
})
