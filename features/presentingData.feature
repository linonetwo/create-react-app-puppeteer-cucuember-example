Feature: PresentingData
  As a user of Cashier
  I want its screen to List all merchandise, money count, and some reports
  So I can be clear what it is in my store

  Scenario: List all merchandise
    Given The app is open
    And I nevagated to the 'store selection' page
    Then wait for good list to load
    And I have same items amongs 'db.json' and 'good list'

  Scenario: Display financial data
    Given The app is open
    And I nevagated to the 'financial' page
    Then wait for financial dashboard to load
    And I have digits in range 0 to 1125899906842624 in 'good list'

  Scenario: Show daily report
    Given The app is open
    And I nevagated to the 'reports' page
    Then wait for report dashboard to load
    And I have a dashboard named 'report container'
