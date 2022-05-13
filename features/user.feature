Feature: User

Scenario Outline: Login with valid credentials
    Given There is a user "<email>" and "<password>"
    When I login to "/users/login"
    And Send a POST HTTP request
        |email|password|
        |admin@mail.com | "test"|
        |paul@mail.com| "test"|
    Then I should see users
    And the response code should be 200

