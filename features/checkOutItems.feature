Feature: PresentingData
  As a employee of store
  I want cashier to record items the customer is buying and count the price
  So I can ask customer to pay that amount

  Scenario: Select item that a customer choosed
    Given The app is open
    And I nevagated to the 'store selection' page
    Then wait for good list to load
    Then I select items 'pants' in the list
    And The selection result has 1 items

  Scenario: List all items the customer is buying
    Given The app is open
    And I nevagated to the 'store selection' page
    Then wait for good list to load
    Then I select items 'pants pen mysteriousBook battery' in the list
    And The selection result has 'pants pen mysteriousBook battery'

  Scenario: Count the price of items in the list
    Given The app is open
    And I nevagated to the 'store selection' page
    Then wait for good list to load
    Then I select items 'pants pen mysteriousBook battery' in the list
    And I have digits in range 70.5 to 70.5 in 'count'
