function pedirDatos(cbRequest) {
	fetch('http://localhost:3000/users')
	.then(response =>response.json())
	.then(response => {cbRequest(response)})
	.catch("Error", Error);

}

//funcion que pide los datos de los posts
function pedirDatosListaPostUsuarios(idUsuario, callbackConsultarPostOK){

	fetch(`http://localhost:3000/posts?userId=${idUsuario}`)
	.then(response => response.json())
	.then(response => {callbackConsultarPostOK(response)})
	.catch("Error", Error)


}
  // funcion que pide los datos de los comentarios

function consultarComentarios(idPost, callback){
	
	fetch(`https://localhost:3000/comments?postId=${idPost}`)
	.then(response => response.json())
	.then(response => {callback(response)})
	.catch("Error",Error)

}
