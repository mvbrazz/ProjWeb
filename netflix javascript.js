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
   var tamanhoLogin = nome.value;
   var tamanhoSenha = senha.value;
   
   if(tamanhoLogin.length < 4 || tamanhoSenha.length < 4){
      alert("Você precisa digitar o login e a senha (4 letras). ");
   }
   else{
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
}

function logado(menu2,menu3) {
   
   var display = document.getElementById(menu2).style.display;
   
   if(display != "none"){
      document.getElementById(menu2).style.display = 'none';
      document.getElementById(menu3).style.display = 'block';
   }
   

}

function personagemRetornado(nomeP){
   return axios.get(`https://rickandmortyapi.com/api/character/?name=${nomeP.value}`)
}

function Pesquisa(menu3,imagem_personagem) {
   //var id = document.querySelector("#busca_personagem");
   //var menuImagem = document.querySelector('#imagem_personagem');
 
   var nomePersonagem = document.querySelector("#busca_personagem");
   let menuImagem = document.querySelector('#imagem_personagem');
   var vetPersonagens;
   vetPersonagens = personagemRetornado(nomePersonagem);

   varVetImagem = [];
   
   if(nomePersonagem.value == ""){
      alert("Você precisa digitar um nome!");
   }
   else{
      
      while(menuImagem.firstChild){
         menuImagem.removeChild(menuImagem.firstChild);
      }

      vetPersonagens.then(function(resposta){
      //console.log(resposta.data.results.length);
         var ajuda = [];
        
         for(i = 0;i<resposta.data.results.length;i++){
            let imagemGeral = document.createElement('img');
            varVetImagem[i] = imagemGeral;
         }
      
         for(i = 0;i<resposta.data.results.length;i++){
         //document.getElementById(imagem_personagem).style.backgroundImage = `url("${resposta.data.image}")`;
         //console.log(resposta.data.results[i].image);
         
         
            ajuda[i] = resposta.data.results[i].image;
            console.log(ajuda[i]);
      
            varVetImagem[i].src = ajuda[i];
            varVetImagem[i].style.width = "120px";
            varVetImagem[i].style.height = "120px";
            menuImagem.appendChild(varVetImagem[i]);
         } 
         
      })
   }
}
