Feature: PresentingData
  As a user of Cashier
  I want its screen to List all merchandise
  So I can be clear what it is in my store

  Scenario: List all merchandise
    Given The app is open
    And I nevagated to the 'store selection' page
    Then wait for good list to load
    And I have same items amongs 'db.json' and 'good list'
