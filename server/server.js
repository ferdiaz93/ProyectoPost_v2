const express = require("express");
const app = express();

const path = require("path");
const fs = require("fs");

let port = 3000;

app.use(express.static(path.join(__dirname, "../client")));


app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"))
});

app.get("/users", (req,res) => {
    getUsuarios(listaUsuarios => {
        res.send(listaUsuarios);
    })
});

app.get("/users/:id", (req,res) => {
    getUsuario(req.params.id, usuario => {
        res.send(usuario);
    })
});


app.get("/comments", (req, res) => {
  getComments(comentarios => {
    res.send(comentarios);
  })
});

app.get("/comments?postId", (req,res) => {
  getComment(req.query.postId , comentario => {
    res.send(comentario);
  })
})

app.listen(port, function(){
    console.log(`Escuchando el puerto ${port} con Express`);
});


function getUsuarios(success) {
    // Lee el archivo usuarios.json y devuelve un objeto con todo el contenido
    fs.readFile(path.join(__dirname, 'usuarios.json'), function(err, data) {
      // si no hay error...
      if (err == undefined) {
        // Se obtiene el array parseando el json (data contiene el json tal como está en el archivo)
        let listaUsuarios = JSON.parse(data);
  
        // Se llama al callback de retorno con el array
        success(listaUsuarios);
      }
    });
  }

  function getUsuario(id, success) {
    // Lee el archivo usuarios.json y devuelve un objeto con todo el contenido
    fs.readFile(path.join(__dirname, 'usuarios.json'), function(err, data) {
      
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

function getComments(success){
  fs.readFile(path.join(__dirname, "comments.json"), function(err, data){
    if(err == undefined){
      listaComentarios = JSON.parse(data);
     
      success(listaComentarios);
    }
  })
};

function getComment(postId, success){
  fs.readFile(path.join(__dirname, 'comments.json'), function(err, data) {
    if(err == undefined){
      listaComments = JSON.parse(data);
      let comment = listaComments.find(item => item.id == postId)

      success(comment);
    }
  })

}