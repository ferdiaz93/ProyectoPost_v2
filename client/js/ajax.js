function pedirDatos(cbRequest) {
	var request = new XMLHttpRequest();

	request.onload = function() {
		var datosCambiados = JSON.parse(request.responseText);

		cbRequest(datosCambiados);
		//        cbRequest(JSON.parse(request.responseText))
	};

	request.open('GET', 'http://localhost:3000/users');
	request.send();
}

//funcion que pide los datos de los posts
function pedirDatosListaPostUsuarios(idUsuario, callbackConsultarPostOK){
	var requestLista = new XMLHttpRequest();
  
	requestLista.onload = function () {
	  
	  var postUsuario = JSON.parse(requestLista.responseText);

	
	//   var respuesta = [];
    
	//   postUsuario.map(post => {
	// 		if (post.userId === idUsuario) {
	// 		  respuesta.push(post);
	// 		}	
	//   	});
	  callbackConsultarPostOK(postUsuario);
	}
  
	requestLista.open("GET", "http://localhost:3000/users/:id")
	requestLista.send()
  
}
  // funcion que pide los datos de los comentarios

function consultarComentarios(idPost, callback){
	var request = new XMLHttpRequest();

	request.onload = function(){

		var contenidoComentarios = JSON.parse(request.responseText);
		callback(contenidoComentarios);
	}

	request.open("GET", "https://jsonplaceholder.typicode.com/comments?postId=" + idPost);
	request.send();
  }
