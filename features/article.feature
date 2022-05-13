Feature: Article API

    Scenario: Get all articles
        When I request "GET" "/articles"
        Then I should receive an empty array
        And the response code should be 200
        And I should receive an array with 0 elements

    Scenario: Create a article
        Given I have a payload
            | title  | "Scissor" |
            | content | "je suis un ciseau"        |
            | author | 1 |
        When I request "POST" "/articles" with payload
        Then I should have a property "id"
        And the response code should be 201
        And I should receive an element with the following attributes
            | title | "Scissor" |

    Scenario: Get a article
        Given I load fixtures "article.json"
        When I request "GET" "/articles/{{article2.id}}"
        Then I should receive an element with the following attributes
            | title | {{article2.title}} |
            | content | {{article2.content}} |
            | author | {{article2.author}} |

    Scenario: Update a article
        Given I load fixtures "user.json,article.json"
        And I am authenticated as "admin"
        And I have a payload
            | title | "Article 2" |
        When I request "PUT" "/articles/{{article2.id}}"
        And the response code should be 200
        Then I should receive an element with the following attributes
            | title | "Article 2" |