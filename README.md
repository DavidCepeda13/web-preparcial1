This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Realice	un	fork	del	siguiente	repositorio: https://github.com/isis3710-uniandes/bookstore-back

- Made a docker build using the next command:
  `docker build ./ -t bookstore`
- Excute the image using the command:
  `docker run -d -p 127.0.0.1:8080:8080 bookstore`
  • Virify that the API is working using the URL:
  `http://127.0.0.1:8080/api/author`

Before run the project, you must to install all the dependencies:

`cd web-preparcial1`

`npm install`

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<h2>Architecture</h2>

The architecture used in this project is Component oriented. You cand find one folder by component. Each folder contains a page if the porpuse of the component is to be show as a page. On the other hand, if it does not contains a page that means that the component was made to be re-used. 

The decision of made use of pages is to follow the standard of Routes of Next.js. Te next diagram shows the directory hierarchy:

src/
├── app/
│   ├── author-edit/
│   │   └── [authorId]/
│   ├── author-favorites/
│   │   └── page.tsx
│   ├── author-form/
│   │   └── page.tsx
│   ├── author-list/
│   │   └── page.tsx
│   ├── author-card.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── hooks/
│   └── useAuthors.tsx
├── types/
│   ├── validations/
│   └── Author.tsx


## Option B

The option developed on the part B was the accecibility option. It can be validated in soome components like buttons (e.g. like button) it contains `aria-labels` and `aria-pressed`. Also, you can varify the form inputs where it is validating that the informations is correct and in case of not it will notify by the `aria-invalid` and `aria-described`. The compoenents are accesed via keyborad using `Tab.`
