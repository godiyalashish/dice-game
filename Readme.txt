Project Installation - 

- Clone the repository
- cd into frontend folder and run npm i
- cd into backend folder and run npm i


Run backend
- cd into backend
- create .env file in root directory and enter the postgress database url and jwt secret, use .example.env file for refence
- open terminal and run `npm run build` to generate dist folder
- run `npx prisma generate` to generate prisma client
- run `npx prisma migrate dev --name Initialize the schema` to migrate data models to the database
- once build is done run command `npm run dev`

Run frontend
-cd into frontend
- run npm run dev