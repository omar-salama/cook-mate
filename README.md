# cook-mate
CookMate unites food enthusiasts in a community to share, discover, and enjoy a variety of cooking recipes. Whether you're a seasoned chef or a novice, our platform offers features to find and contribute to a diverse repository of delectable recipes.

## What can you do?
You can share you favourite recipes with other foodies, search for specific recipies, and even rate them!

## Tech Stack
- Next.js v14
- NextAuth.js
- Vercel Postgres
- Prisma ORM
- Tailwind CSS

## Caveats
- At the moment there is no UI for loggin out so you would have to go to `http://localhost:3000/api/auth/signout` to log out.
- To go to the login page you will have to click on Create New Recipe at the top right corner.

## To Be Implemented
- OAuth.
- Image uploading, to share how your final dish would look like! Currently there is dummy UI for it, but it's not functional.
- Unit testing.

## Project Setup 
The usual stuff! Clone the repo, `npm i`, and then `npm run dev`. as easy as that!
