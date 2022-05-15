Feature: Article API

    Scenario: Get all articles when it's empty
        When I request "GET" "/articles"
        Then I should receive an empty array
        And the response code should be 200
        And I should receive an array with 0 elements

    Scenario: Create an article as anonymous
        Given I have a payload
            | title  | "Scissor" |
            | content | "je suis un ciseau" |
            | author | "1" |
        When I request "POST" "/articles" with payload
        And the response code should be 401

     Scenario: Create an article as user
        Given I have a payload
            | title  | "Scissor" |
            | content | "je suis un ciseau" |
            | author | "1" |
        And I am authenticated as "user"
        When I request "POST" "/articles" with payload
        And the response code should be 403


    Scenario: Create an article as admin
        Given I have a payload
            | title  | "Scissor" |
            | content | "je suis un ciseau" |
            | author | "1" |
        And I am authenticated as "admin"
        When I request "POST" "/articles" with payload
        And the response code should be 201
        And I should receive an element with the following attributes
            | title  | "Scissor" |
            | content | "je suis un ciseau" |
            | author | "1" |


    Scenario: Get an article
        Given I load fixtures "article.json"
        When I request "GET" "/articles/{{article2.id}}"
        Then I should receive an element with the following attributes
            | title | {{article2.title}} |
            | content | {{article2.content}} |
            | author | {{article2.author}} |

    Scenario: Update an article as admin
        Given I load fixtures "user.json,article.json"
        And I am authenticated as "admin"
        And I have a payload
            | title | "Article 2" |
            | content | "Je suis l'article 2" |
            | author | "2" |

        When I request "PUT" "/articles/{{article2.id}}"
        And the response code should be 200
        Then I should receive an element with the following attributes
             | title | "Article 2" |
            | content | "Je suis l'article 2" |
            | author | "2" |
    
    Scenario: Update an article as an anonymous
        Given I load fixtures "article.json"
        And I have a payload
            | title | "Article 2" |
            | content | "Je suis un article" |
            | author | "1" |
        When I request "PUT" "/articles/{{article2.id}}"
        And the response code should be 403