Feature: User API

  Scenario: Create a user
    Given I have a payload
      | firstname | Martin         |
      | lastname  | Oez            |
      | email     | user@gmail.com |
      | password  | test           |
    When I request "POST" "/users" with payload
    And the response code should be 500
    And I should receive an element with the following attributes
      | firstname | {{user.firstname}} |
      | lastname  | {{user.lastname}}  |
      | email     | {{user.email}}     |
      | password  | {{user.password}}  |

  Scenario: Get a user
    Given I load fixtures "user.json"
    When I request "GET" "/users/{{user.id}}"
    Then I should receive an element with the following attributes
      | firstname | {{user.firstname}} |
      | lastname  | {{user.lastname}}  |
      | email     | {{user.email}}     |
      | password  | {{user.password}}  |
