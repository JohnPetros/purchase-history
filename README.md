<h1 align="center">Purchase History 🛒</h1>

<div align="center">
   <a href="https://github.com/JohnPetros">
    <img alt="Made by JohnPetros" src="https://img.shields.io/badge/made%20by-JohnPetros-blueviolet">
   </a>
   <img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/JohnPetros/purchase-history">
   <a href="https://github.com/JohnPetros/purchase-history/commits/main">
    <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/JohnPetros/purchase-history">
   </a>
  </a>
   </a>
   <a href="https://github.com/JohnPetros/purchase-history/blob/main/LICENSE.md">
    <img alt="GitHub License" src="https://img.shields.io/github/license/JohnPetros/purchase-history">
   </a>
    <img alt="Stargazers" src="https://img.shields.io/github/stars/JohnPetros/purchase-history?style=social">
</div>
<br>

## 🖥️ About the project

**Purchase History** is a simple app that registers products to invoice purchases, serving as a history. The purpose of developing this app is to learn how to handle concurrency in databases using [NodeJs](https://nodejs.org/en) and [Sequelize ORM](https://sequelize.org/). 

---

## 📖 Instalation guide

### Prerequisitives

- [Git](https://git-scm.com/)
- [Nodejs](https://www.python.org/) 18 or later.

### Clone the repo

```bash
git clone https://github.com/JohnPetros/purchase-history.git
```

### Access the folder

```bash
cd purchase-history
```

### Install the dependencies

```bash
npm install
```

### Run all applications (web and server) at once

```bash
npm run dev
```

> The web app will running at `http://localhost:3000`
> The server app will running at `http://localhost:3333`

---

## 🛣 Server routes

|                                                                    VERB | ROUTE `/products`                        | Action                            |
| ----------------------------------------------------------------------: | :----------------------------------- | :------------------------------ |
| [![](https://img.shields.io/badge/GET-2E8B57?style=for-the-badge)]()    | `/products`                           |         |
| [![](https://img.shields.io/badge/POST-4682B4?style=for-the-badge)]()   | `/products`                           |              |
| [![](https://img.shields.io/badge/PUT-9370DB?style=for-the-badge)]()    | `/products/:productId`                |              |
| [![](https://img.shields.io/badge/PATCH-F48F43?style=for-the-badge)]()  | `/products/status/:id`                |  |
| [![](https://img.shields.io/badge/DELETE-CD853F?style=for-the-badge)]() | `/products/:id`                       |                |

---

<p align="center">
  Made with 💜 by John Petros 👋🏻
</p>