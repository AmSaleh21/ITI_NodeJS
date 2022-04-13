# ITI_NodeJS

## Lab 1
### custom modules (ES2015 and ES6)

- add method, sub method, multi method 
    - Note: handle the error (A, 3) should be return error 

- return method take a name and birth-date 
    - Note handle the error if send 2020 as year should be not accepted


## Lab 2
### event emitters (ES2015 and ES6)

- create custom module contain function constructor inheriting from emitter

- this function has on and emit I can send data from emit and log in on function 

- create test.txt with dummy data, then rename it to info.txt

- remove info.txt

- read data from data.JSON (provided) as sync and async

- write into new info.txt

- Bonus: create a directory

## Lab 3
### http server

- create an api with GET and POST methods

- end points (login, sign-up, home, profile)

- routes 
    - Get: / 
        + ```open home page html; with <title> and <h1> Welcome  ``` ```use static css```

    - POST: 
        - using postman /api/sign-up  

            + ```payload -> email, password, username and store it in file```

        - using postman /api/login  

            + ```payload -> email, password```

- Login and Sign-up: check it from the file if you have the same email and password 

- Handling cases: 
    - Login: 
        - correct password and email redirect to profile with client name  

        - if sent wrong password || email return, 400 in header with msg you entered wrong data  

        - if an email that doesn’t exist, return 400 headers with msg you entered email doesn’t exist please sign-up

    - Sign-up: 
        - if sent an existing email, return the email already exist 

        - if tried to open URL doesn’t exist return 404 not found  

## Lab 4
### Express

- same as Lab 3 but with using express.