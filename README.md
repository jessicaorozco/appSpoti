
************************Web App Music************************************

This app was created with the aim that all people who like music can create their playlists and share them in the community


It is created with the clean arquithecture pattern, since among the main advantages is the immediate implementation, Focus on the application domain
This means that the primary focus of the project is placed on the core and logic of the domain, as well as possibility of changes This architecture allows important changes to the application.


******COMPONENTS********************
2 components are created: User, Music

******STRUCTURE********************
USER:
    application_business_rules
    enterprise_business_rules
    framework_drivers
    interface_adapters
    routes

MUSIC:
    application_business_rules
    enterprise_business_rules
    framework_drivers
    interface_adapters
    routes

in each component you will find the readme file with the specifications

For execute this project

1. execute npm i for instalation of dependencies
2. npm run dev or npm run prod

*******endpoints ***********

https://localhost:5300 "/" - Method GET list playlist created by the users
https://localhost:5300 "/" - Method POST add cateory of music  playlist created by the users
https://localhost:5300 "/user" - Method GET list all users require token
https://localhost:5300 "/user" - Method POST created user NOT require token
https://localhost:5300 "/user/{id}" - Method GET list one user require token
https://localhost:5300 "/user/{id}" - Method UPDATE update user require token
https://localhost:5300 "/user/{id}" - Method DELETE delete user require token
https://localhost:5300 "/login/{id}" - Method login user create token



*******Depploy in Heroku ***********

https://appmusicenjoy.herokuapp.com/

*******for mor details please visit the documentation: ***********

https://localhost:3000/docs

https://app.swaggerhub.com/apis/appMusic/sample-api/1.0.0


>>>>>>> 585ef19dabe71705425e335633bea7e20ba184b4
