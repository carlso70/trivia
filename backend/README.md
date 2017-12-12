# TriviaCast API

## Guidelines

This document provides guidelines and examples for Triviacast HTTP API, and Triviacast TCP API

### Basic information GET URLs
* List of active users:
    * GET /listusers
* List of active games:
    * GET /listgames

# GAME START/JOIN/CREATE REQUESTS

All requests to create or join a game should contain a Json Object following this format. UserId is a unique integer that identifies a user. It is a returned whenever a user is signed in, or a user is created.
    
    {
        "userId": 1000,
        "gameId": 1234,
        "difficulty": 1,
        "questionCt": 20

    }


# USER LOGIN/CREATE REQUESTS
All requests to create or login to a user should contain a Json Object following this format. Whenever a user is logged in, or created a response containing all the user details is given.

    {
        "username": "test",
        "password": "test"
    }


### POST /loginuser

Example:/loginuser
Request Body: 

    {
        "username": "testusername",
        "password": "testpassword"
    }

Response body:
*Save the userId on the device while the user is logged in
 
 
    {
        "id":499380,
        "username":"createTest",
        "password":"$2a$10$LqaeVglllnCy/3q5deFkJu8L/bBOLs0upvfscrD2cV0b4GVvV9Q8e",
        "gameID":0,
        "score":0,
        "active":true,
        "wins":0
    }

 
          

### POST /createuser

Example: http://localhost:8080/createuser

Request body: 

    {
        "username": "createTest",
        "password": "createTestPass"
    }  

Response body:


    {
        "id":499380,
        "username":"createTest",
        "password":"$2a$10$LqaeVglllnCy/3q5deFkJu8L/bBOLs0upvfscrD2cV0b4GVvV9Q8e",
        "gameID":0,
        "score":0,
        "active":true,
        "wins":0
    }


### POST /creategame 
Request body: 


    {
        "userId": 123412,
        "gameId": 123434
    }  
    
    

Response body:
*The response body is a json containing the game details 



    {
        "id":499380,
        "users":null,
        "deck":[{"Question":"","Choices":null,"Answer":"","Difficulty":"","Category":""}],
        "scoreboard":{},
        "Winner":""
    }


### POST /joingame
Request body: 


    {
        "userId": 123412,
        "gameId": 123434
    }  
      

Response body:
*The response body is a json containing the game details


    
    {
        "id":499380,
        "users":null,
        "deck":[{"Question":"","Choices":null,"Answer":"","Difficulty":"","Category":""}],
        "scoreboard":{},
        "Winner":""
    }

   
   
   
### POST /startgame 
Request body: 

    {
        "userId": 123412,
        "gameId": 123434
    }  
    
Response body: 
    
    {
        "message": "success"
    }

### TODO add TCP request API

### TODO ADD REAL ERROR HANDLING RESPONSES

## Error handling

Error responses should include a common HTTP status code, message for the developer, message for the end-user (when appropriate), internal error code (corresponding to some specific internally determined ID), links where developers can find more info. For example:

    {
      "status" : 400,
      "developerMessage" : "Verbose, plain language description of the problem. Provide developers
       suggestions about how to solve their problems here",
      "userMessage" : "This is a message that can be passed along to end-users, if needed.",
      "errorCode" : "444444",
      "moreInfo" : "http://www.example.gov/developer/path/to/help/for/444444,
       http://drupal.org/node/444444",
    }

Use three simple, common response codes indicating (1) success, (2) failure due to client-side problem, (3) failure due to server-side problem:
* 200 - OK
* 400 - Bad Request
* 500 - Internal Server Error

