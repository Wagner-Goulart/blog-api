import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.status(200).json(allUsers);
});

app.get("/users/:id", async(req, res)=> {
    const id = Number(req.params.id)

    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })

    res.status(200).send(user)
})

app.post("/users", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
    },
  });

  res.status(201).send(`Usuário ${newUser.name} criado com sucesso !!`);
});

app.put("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  const name = req.body.name;
  const email = req.body.email;

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
    },
  });

  res.status(200).send("Usuário atualizado com sucesso !!");
});

app.delete("/users/:id", async (req, res) => {
  const id = Number(req.params.id);

  await prisma.user.delete({
    where: {
      id,
    },
  });

  res.status(200).send("Usuário deletado com sucesso !!");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
