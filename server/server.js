const express = require("express");
const app = express();

const path = require("path");
const fs = require("fs");

let port = 3000;

app.use(express.static(path.join(__dirname, "../client")));

//pedido raiz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

//pedido a la ruta users ==> me trae todos los usuarios
app.get("/users", (req, res) => {
  getUsuarios(listaUsuarios => {
    res.send(listaUsuarios);
  });
});

//pedido a la ruta users con un id especifico ==> me trae un json con un solo user
app.get("/users/:id", (req, res) => {
  getUsuario(req.params.id, usuario => {
    res.send(usuario);
  });
});

//pedido a la ruta posts ==> me trae todos los posts
app.get("/posts", (req, res) => {
  getPosts(listaPosts => {
    res.send(listaPosts);
  });
});

//pedido a la ruta posts con un query determinado ==> me deberia traer los posts de un userId especifico
app.get("/posts", (req, res) => {
  getPost(req.query.userId, post => {
    res.send(post);
  });
});

//pedido a la ruta comments ==> me trae todos los comentarios
app.get("/comments", (req, res) => {
  getComments(comentarios => {
    res.send(comentarios);
  });
});

//pedido a la ruta comments ==> me deberia traer los comentarios de un idPost especifico
app.get("/comments", (req, res) => {
  getComment(req.query.postId, comentario => {
    res.send(comentario);
  });
});

//en esta funcion consologueo el puerto en el que estoy trabajando, me avisa si mi server esta funcionando
app.listen(port, function() {
  console.log(`Escuchando el puerto ${port} con Express`);
});

//funcion que trae todos los usuarios
function getUsuarios(success) {
  // Lee el archivo usuarios.json y devuelve un objeto con todo el contenido
  fs.readFile(path.join(__dirname, "usuarios.json"), function(err, data) {
    // si no hay error...
    if (err == undefined) {
      // Se obtiene el array parseando el json (data contiene el json tal como está en el archivo)
      let listaUsuarios = JSON.parse(data);

      // Se llama al callback de retorno con el array
      success(listaUsuarios);
    }
  });
}

//funcion que trae al usuario con el ID que paso por parametro
function getUsuario(id, success) {
  // Lee el archivo usuarios.json y devuelve un objeto con todo el contenido
  fs.readFile(path.join(__dirname, "usuarios.json"), function(err, data) {
    // si no hay error...
    if (err == undefined) {
      // Se obtiene el array parseando el json (data contiene el json tal como está en el archivo)
      listaUsuarios = JSON.parse(data);
      // Función "find" del prototipo de Array, devuelve el primer elemento que coincida con el criterio.
      let usuario = listaUsuarios.find(item => item.id == id);

      // Se llama al callback de retorno con el objeto
      success(usuario);
    }
  });
}

//funcion que me trae todos los posts de todos los usuarios
function getPosts(success) {
  fs.readFile(path.join(__dirname, "posts.json"), function(err, data) {
    if (err == undefined) {
      listaPosts = JSON.parse(data);

      success(listaPosts);
    }
  });
}

//funcion que me trae los posts que tengan el userId que le pase por parametro
function getPost(userId, success) {
  fs.readFile(path.join(__dirname, "posts.json"), function(err, data) {
    if (err == undefined) {
      listaPosts = JSON.parse(data);
      let posts = listaPosts.filter(item => item.id == userId);

      success(posts);
    }
  });
}

//funcion que me trae todos los comentarios
function getComments(success) {
  fs.readFile(path.join(__dirname, "comments.json"), function(err, data) {
    if (err == undefined) {
      listaComentarios = JSON.parse(data);

      success(listaComentarios);
    }
  });
}

//funcion que me trae los comentarios que tengan el postId que le paso por parametro
function getComment(postId, success) {
  fs.readFile(path.join(__dirname, "comments.json"), function(err, data) {
    if (err == undefined) {
      listaComments = JSON.parse(data);
      let comments = listaComments.filter(item => item.id == postId);

      success(comments);
    }
  });
}
