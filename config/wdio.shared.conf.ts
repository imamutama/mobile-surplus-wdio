// import { config as configDotEnv } from 'dotenv'
import { CucumberJsJsonReporter } from 'wdio-cucumberjs-json-reporter'
import { removeSync } from 'fs-extra'
import data from '../features/helper/data'
const { generate } = require('multiple-cucumber-html-reporter')

export const config: WebdriverIO.Config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',
    //
    // ==================
    // Specify Test Files
    // ==================
    // NOTE: This is just a place holder and will be overwritten by each specific configuration
    specs: [],
    //
    // ============
    // Capabilities
    // ============
    // NOTE: This is just a place holder and will be overwritten by each specific configuration
    capabilities: [],
    //
    // ===================
    // Test Configurations
    // ===================
    logLevel: 'debug',
    bail: 0,
    waitforTimeout: 30*1000,
    connectionRetryTimeout: 120*1000,
    connectionRetryCount: 3,
    services: [],
    framework: 'cucumber',
    reporters: ['spec', 'cucumberjs-json'],
    cucumberOpts: {
        // CucumberOption's timeout should be at least 5s longer than WDIO's waitforTimeout
        timeout: 35*1000,
        require: ['./features/step-definitions/**/*.ts'],
        backtrace: true
    },
    //
    // =====
    // Hooks
    // =====
    // Gets executed before config execution begins.
    before: () => {
        // configDotEnv()
    },
    // Gets executed after a Cucumber Scenario.
    afterScenario: async (world, result) => {
        if (!result.passed) {
            CucumberJsJsonReporter.attach(await driver.takeScreenshot(), 'image/png')
            CucumberJsJsonReporter.attach({ 'json-string': true }, 'application/json')
        }
        data.clearData
        await driver.reset()
    },
    // Gets executed once before all workers get launched.
    onPrepare: () => {
        removeSync('.tmp/')
    },
    // Gets executed after all workers got shut down and the process is about to exit.
    onComplete: () => {
        generate({
            jsonDir: '.tmp/json/',
            reportPath: '.tmp/report/',
            pageTitle: 'Testing',
            reportName: 'Testing',
            displayDuration: true,
            displayReportTime: true
        })
    }
}
