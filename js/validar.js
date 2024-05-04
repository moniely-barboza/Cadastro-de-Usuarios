// Objetos dos elementos de texto do formulário

let nome = document.querySelector("#inputName");
let nomeHelp = document.querySelector("#inputNameHelp");

let ano = document.querySelector("#inputYear");
let anoHelp = document.querySelector("#inputYearHelp");

let email = document.querySelector("#inputEmail");
let emailHelp = document.querySelector("#inputEmailHelp");

let senha = document.querySelector("#inputPassword");
let senhaHelp = document.querySelector("#inputPasswordHelp");

let meter = document.querySelector("#passStrengthMeter")
let result = document.querySelector("#inputResult");

// Regex
const regexNome = /^[A-Z][a-z]+(?: [A-Z][a-z]+)+$/;
const regexAno = /^[0-9]{4}$/;
const regexEmail = /^[a-zA-Z0-9\.]+@[a-zA-Z0-9]+\.(com|br|net|org)$/; // Assumiremos que também é válido conter "." antes do @
const regexSenha = /^(?=.*[@#%&!+])(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9@#%&!+]{6,20}$/;

// Constantes
const anoMin = "1900"; // Ano de Nascimento Mínimo
const anoMax = "2022"; // Ano de Nascimento Máximo

nome.addEventListener('focusout', validarNome);
ano.addEventListener('focusout', validarAno);
email.addEventListener('focusout', validarEmail);
senha.addEventListener('focusout', validarSenha);

function validarNome(e){ 
    /* Restrição 1: O nome do usuário somente deve conter letras e deve ser de cumprimento maior a 6 */

    const nomeTrimado = e.target.value.trim();
    console.log(e.target.value);  

    if(nomeTrimado.match(regexNome) == null){
        nomeHelp.textContent = "Formato de nome inválido"; 
        nomeHelp.style.color="red";
    }
    else if(nCaracteres(nomeTrimado) <= 6){
        nomeHelp.textContent = "O nome deve ter mais de 6 caracteres"; 
        nomeHelp.style.color="red";
    }
    else{
        nomeHelp.textContent = "";
    }       
}

function validarAno(e){
    /* Restrição 2: O ano de nascimento deve considerar pessoas nascidas no intervalo de tempo de 1900 a 2022 */

    const anoTrimado = e.target.value.trim();
    console.log(ano.value);

    if(anoTrimado.match(regexAno) == null){
        anoHelp.textContent = "Formato de ano inválido";
        anoHelp.style.color="red";
    }
    else{    
        if( parseInt(anoTrimado) > parseInt(anoMax) ){
            anoHelp.textContent = `Ano inválido. O ano não pode ser maior que ${anoMax}.`;
            anoHelp.style.color="red";
        }
        else if( parseInt(anoTrimado) < parseInt(anoMin) ){
            anoHelp.textContent = `Ano inválido. O ano não pode ser menor que ${anoMin}.`;
            anoHelp.style.color="red";
        }
        else{
            anoHelp.textContent="";
        }        
        
    }
}

function validarEmail(e){ 
    /* Restrição 3: O email deverá conter letras e números seguido do @ seguido de caracteres e/ou números seguido de . e finalizando em br, com, net, org */
    
    const emailTrimado = e.target.value.trim();
    console.log(e.target.value); 

    if(emailTrimado.match(regexEmail) == null){
        emailHelp.textContent = "Formato de email inválido"; 
        emailHelp.style.color="red";
    }
    else{
        emailHelp.textContent = "";
    }
}

function validarSenha(e){
    /* Restrição 4: Para que uma senha seja considerada válida, deve:
        - ter entre 6 e 20 caracteres,
        - ter pelo menos uma ocorrência de:
            - caractere especial, por exemplo: [@, #, %, &, !,+]
            - número
            - letra [a-z,A-Z]
            - Não conter o nome ou o ano de nascimento do usuário
    */
    
    let senhaValida = false;
    const senhaTrimado = e.target.value.trim();
    console.log(e.target.value); 

    if(senhaTrimado.match(regexSenha) == null){
        senhaHelp.textContent = "Senha inválida"; 
        senhaHelp.style.color = "red";
    }
    /*
    else if(nome.value.trim() !== "" && senhaTrimado.toLowerCase().includes(nome.value.trim().toLowerCase())){
        senhaHelp.textContent = "Senha não pode conter o nome do usuário";
        senhaHelp.style.color = "red";
    }
    else if(ano.value.trim() !== "" && senhaTrimado.includes(ano.value.trim())){
        senhaHelp.textContent = "Senha não pode conter o ano de nascimento do usuário";
        senhaHelp.style.color = "red";
    }
    */
    else{
        senhaHelp.textContent = "";
        senhaValida = true;
    }

    if(senhaValida){
        // Senha Forte
        if (e.target.value.trim().length > 12
                && nEspeciais(e.target.value) > 1
                && nNumeros(e.target.value) > 1
                && nMaiusculas(e.target.value) > 1) {
            meter.value = 30;
            meter.style.color="green";
            result.textContent = "Senha Forte"; 
            result.style.color="green";
        }
        // Senha Moderada
        else if (e.target.value.trim().length > 8
                && nEspeciais(e.target.value) >= 1
                && nNumeros(e.target.value) >= 1
                && nMaiusculas(e.target.value) >= 1) {
            meter.value = 20;
            meter.style.color="orange";
            result.textContent = "Senha Moderada"; 
            result.style.color="orange";
        }
        // Senha Fraca
        else if (e.target.value.trim().length <= 8
                && nEspeciais(e.target.value) >= 1
                && nNumeros(e.target.value) >= 1) {
            meter.value = 11;
            meter.style.color="orange";
            result.textContent = "Senha Fraca"; 
            result.style.color="orange";
        }
    }
}

function nCaracteres(string) {
    return string.length;
}

function nEspeciais(senha) {
    const regexEspeciais = /[@#%&!+]/g;
    const especiais = senha.match(regexEspeciais);
    return especiais ? especiais.length : 0;
}

function nNumeros(senha) {
    const regexNumeros = /[0-9]/g;
    const numeros = senha.match(regexNumeros);
    return numeros ? numeros.length : 0;
}

function nMaiusculas(senha) {
    const regexMaiusculas = /[A-Z]/g;
    const maiusculas = senha.match(regexMaiusculas);
    return maiusculas ? maiusculas.length : 0;
}