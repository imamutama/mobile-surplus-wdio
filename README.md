# Mobile App Automation Test for Application Super Using WebdriverIO, Cucumber
This is a mobile automation script based on WebdriverIO, TypeScript, and Cucumber

## Preconditions:
To run the automation test, you need to install:
- Java JDK (Java SE 11)
- NodeJS and NPM
- Android SDK and Android Emulator
- Appium

## Setting up Android on a local machine
Follow the instructions to download and setup Android studio and configure your emulators with [this](https://developer.android.com/studio/run/managing-avds) tutorial.
Create Android emulator with this configuration:

![image](https://user-images.githubusercontent.com/42331488/195225999-913187ed-1ae2-4191-8363-137b93be80c9.png)


## Configure the environment variables (JAVA_HOME & ANDROID_HOME)
Please check [this link](https://medium.com/@syamsasi/setting-up-appium-on-windows-and-ubuntu-ea9a73ab989) for the instructions to setup your environment (Windows / Linux).

## How to run the test
1. Move to the project path from your terminal and execute the following command to install any packages needed: `npm install`
2. Run the Android Emulator
3. Making the superapps app available. Move the .apk file into the directory `/apps`. Edit the absolute local path for the
4. Running tests: `npm run android.app` to run all test scenario or `npm run android.app.test @your-tagged-scenario` to run tagged scenario only

*Note:
For Cucumber (Gherkin) Full Support in VSCode, you can use [this extension](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete)