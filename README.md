> the first step when the project is empty we start with

- express --no-view . =>to start the project

> to start an express project we use npx express-generator
> or npx express-generator --no-view to not use the view engine
> or to install it with npm install express-generator -g
> then we use npx express to create the project

<!-- ---- -->

> the first step when the project is empty we start with

- first part

* express --no-view . =>to start the project without the view engine
* npm install => to install the dependencies and the packages
* npm start => to start the server
* note that the public folder is the folder that contains the static files
  -and it's have precedence over route that have the same name

* second part

* it's the part of the database we will use prisma with mysql
  -npm install prisma -D => to install prisma as a dev dependency
  -npx prisma init => to initialize prisma
  -we add the url of the database in the env file
  -then we fill the schema.prisma file with the database schema
  -to save changes we use || npx prisma migrate dev --name init

* third part

  -test the database with prisma studio using the command || npx prisma studio
  -it give us the ability to use prisma.user to get the data from the database

-to use the routes with the database we need to install the prisma client || npm install @prisma/client
