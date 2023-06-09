import { join } from 'path'
import config from './wdio.shared.local.appium.conf'

// ============
// Specs
// ============
config.specs = [
    './features/scenarios/**/*.feature',
]

// ============
// Capabilities
// ============
config.capabilities = [
    {
        // The defaults you need to have in your config
        platformName: 'Android',
        maxInstances: 1,
        // autoGrantPermissions: true,
        // For W3C the appium capabilities need to have an extension prefix
        'appium:deviceName': 'Pixel_4_Android_12',
        'appium:platformVersion': '12.0',
        'appium:udid': '9T9PMZEYO7MR9DJB',
        'appium:automationName': 'UiAutomator2',
        'appium:app': join(process.cwd(), './apps/base.apk'),
        'appium:newCommandTimeout': 240,
        'appium:noReset': false,
    },
]

exports.config = config
