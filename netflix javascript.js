var chave;
function entrar(menu,menu2,menu3) {
   
   var display = document.getElementById(menu).style.display;
   let myItem = localStorage.getItem('chave');
   if(myItem == null && display != "none"){ 
      document.getElementById(menu).style.display = 'none';
      document.getElementById(menu2).style.display = 'block';
   }
   else{
      document.getElementById(menu).style.display = 'none';
      document.getElementById(menu3).style.display = 'block';
   }
   

}

function Login(conteudo_login,menu2,menu3,erro_login) {
   
   var nome = document.querySelector("#nome");
   var senha = document.querySelector("#senha");
   

   axios.post('https://reqres.in/api/login',{
      email: nome.value,
      password: senha.value
    })
    .then(function (response) {
      console.log(response.data.token);
      localStorage.setItem('chave',`${response.data.token}`);
      logado(menu2,menu3);
    })
    .catch(function (error) {
      console.log(error);
      document.getElementById(erro_login).style.display = 'block';
    });
   
}

function logado(menu2,menu3) {
   
   var display = document.getElementById(menu2).style.display;
   
   if(display != "none"){
      document.getElementById(menu2).style.display = 'none';
      document.getElementById(menu3).style.display = 'block';
   }
   

}

function personagemRetornado(id){
   return axios.get(`https://rickandmortyapi.com/api/character/${id.value}`)
}

function Pesquisa(menu3,imagem_personagem) {
   var id = document.querySelector("#busca_personagem");
   var im= document.querySelector("#imagem_personagem");
   var dados;

   dados = personagemRetornado(id);

   dados.then(function(resposta){
      console.log(resposta.data.image);
      document.getElementById(imagem_personagem).style.backgroundImage = `url("${resposta.data.image}")`;
           
   }) 

   document.getElementById(imagem_personagem).style.display = 'block';
     
   
}
