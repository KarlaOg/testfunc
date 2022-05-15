Feature: User API

  Scenario: Create a user
    Given I have a payload
      | firstname | Jane             |
      | lastname  | Doe              |
      | email     | jandoe@gmail.com |
      | password  | password         |
    When I request "POST" "/users" with payload
    And the response code should be 201

  Scenario: Get a user
    Given I load fixtures "user.json"
    When I request "GET" "/users/{{user.id}}"
    Then I should receive an element with the following attributes
      | firstname | {{user.firstname}} |
      | lastname  | {{user.lastname}}  |
      | email     | {{user.email}}     |
      | password  | {{user.password}}  |

  Scenario: Login
    Given There is a user "<email>" and "<password>"
    When I login to "/users/login"
    And Send a POST HTTP request
      | email    | jandoe@gmail.com |
      | password | password         |
      And the response code should be 200
