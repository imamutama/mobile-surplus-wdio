@smoke-test
Feature: Order From Category

    Background:
        Given user is on "globalPage" page
        And user taps on "allowPermission" button
        And user taps on text "Lewati" button
        And user is on "homePage" page
        And user taps on "closeBanner" button

    @order-bread-normally
    Scenario: User order bread from category menu
        When user is on "homePage" page
        And user taps on "categoryBread" button
        And user is on "listItempage" page
        And user taps on "menuItemBread" button
        And user is on "bucketPage" page
        And user taps on "addBucket" button
        And user taps on "addBucket" button
        Then user should be redirected to "Monokuro" page

    @order-bread-add-item
    Scenario: User order bread and add item from category menu
        When user is on "homePage" page
        And user taps on "nearbyItem" button
        And user is on "bucketPage" page
        And user taps on "addBucketNearby" button
        And user taps on "addBucket" button
        Then user should be redirected to "Monokuro" page
        And user taps on "btnOrder" button
        And user taps on "addBucket" button
        And user taps on "addItem" button
        Then user verify value "countTextAddItem"

    @order-bread-input-message
    Scenario: User input message with special character
        When user is on "homePage" page
        And user taps on "categoryBread" button
        And user is on "listItempage" page
        And user taps on "menuItemBread" button
        And user is on "bucketPage" page
        And user taps on "addBucket" button
        And user inputs "inputMessage" value is "Test123$@%#%#%#"
        And user taps on "addBucket" button
        Then user should be redirected to "Monokuro" page



