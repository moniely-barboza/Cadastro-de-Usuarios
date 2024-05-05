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
const regexNome = /^[A-Z][a-z]+(?: [A-Z][a-z]+)+$/; // [Nome] + espaço + [Sobrenome]
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

/** Restrição 1: O nome do usuário somente deve conter letras e deve ser de cumprimento maior a 6 */
function validarNome(e){ 

    const nomeTrimado = e.target.value.trim();
    const nomeSemEspacos = nomeTrimado.replace(/\s+/g, '');
    console.log(nomeTrimado);  

    if(nomeTrimado.match(regexNome) == null){
        nomeHelp.textContent = "Formato de nome inválido"; 
        nomeHelp.style.color="red";
    }
    else if(nCaracteres(nomeSemEspacos) < 6){
        nomeHelp.textContent = "O nome deve ter ao menos 6 caracteres"; 
        nomeHelp.style.color="red";
    }
    else{
        nomeHelp.textContent = "";
    }       
}

/** Restrição 2: O ano de nascimento deve considerar pessoas nascidas no intervalo de tempo de 1900 a 2022 */
function validarAno(e){

    const anoTrimado = e.target.value.trim();
    console.log(ano.value);

    if(anoTrimado.match(regexAno) == null){
        anoHelp.textContent = "Formato de ano inválido";
        anoHelp.style.color="red";
    }
    else if(parseInt(anoTrimado) > parseInt(anoMax)){
        anoHelp.textContent = `Ano inválido. O ano não pode ser maior que ${anoMax}.`;
        anoHelp.style.color="red";
    }
    else if(parseInt(anoTrimado) < parseInt(anoMin)){
        anoHelp.textContent = `Ano inválido. O ano não pode ser menor que ${anoMin}.`;
        anoHelp.style.color="red";
    }
    else{
        anoHelp.textContent="";
    }    
}

/** Restrição 3: O email deverá conter letras e números seguido do @ seguido de caracteres e/ou números seguido de . e finalizando em br, com, net, org */
function validarEmail(e){ 
    
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

/** Restrição 4: Para que uma senha seja considerada válida, deve:
    - ter entre 6 e 20 caracteres,
    - ter pelo menos uma ocorrência de:
        - caractere especial, por exemplo: [@, #, %, &, !,+]
        - número
        - letra [a-z,A-Z]
        - Não conter o nome ou o ano de nascimento do usuário
*/    
function validarSenha(e){
    
    let senhaValida = true;
    const nomeSemEspacos = nome.value.trim().replace(/\s+/g, '');
    const senhaTrimado = e.target.value.trim();
    
    if(senhaTrimado.match(regexSenha) == null){
        senhaHelp.textContent = "Senha inválida"; 
        senhaHelp.style.color = "red";
        senhaValida = false;
    }
    else if(nome.value.trim() !== "" && senhaTrimado.includes(nomeSemEspacos)){
        senhaHelp.textContent = "Senha inválida. Senha não pode conter o nome do usuário";
        senhaHelp.style.color = "red";
        senhaValida = false;
    }
    else if(ano.value.trim() != "" && senhaTrimado.includes(ano.value.trim())){
        senhaHelp.textContent = "Senha inválida. Senha não pode conter o ano de nascimento do usuário";
        senhaHelp.style.color = "red";
        senhaValida = false;
    }
    else{
        senhaHelp.textContent = "";
    }

    if(senhaValida){
        nivelSegurança(e);
    }
    else{
        meter.value = 0;
        result.textContent = "";
    }
}

/** No caso da senha ser válida, a função deve retornar o nível de segurança da senha: ‘fraca’, ‘moderada’, ou ‘forte’
*/
function nivelSegurança(e){
    let senhaValida = e.target.value;

    if (senhaForte(senhaValida)) {
        meter.value = 30;
        result.textContent = "Senha Forte";
        result.style.color = "green"; 
    }
    else if (senhaModerada(senhaValida)) {
        meter.value = 20;
        result.textContent = "Senha Moderada"; 
        result.style.color = "orange";
    }
    else if (senhaFraca(senhaValida)) {
        meter.value = 10;
        result.textContent = "Senha Fraca"; 
        result.style.color = "red";
    }
}

/** - Uma senha fraca tem comprimento menor que 8 caracteres, contendo pelo menos um caractere especial e um número;
 */
function senhaFraca(senhaValida) {
    return nCaracteres(senhaValida.trim()) <= 8
        && nEspeciais(senhaValida) >= 1
        && nNumeros(senhaValida) >= 1;
}

/** - Uma senha moderada tem mais de 8 caracteres, contendo pelo menos um caractere especial, um número e uma letra maiúscula;
 */
function senhaModerada(senhaValida) {
    return nCaracteres(senhaValida.trim()) > 8
        && nEspeciais(senhaValida) >= 1
        && nNumeros(senhaValida) >= 1
        && nMaiusculas(senhaValida) >= 1;
}

/** - Uma senha forte tem mais de 12 caracteres, contendo mais de um caracter especial, mais de um número e mais de uma letra maiúscula.
 */
function senhaForte(senhaValida) {
    return nCaracteres(senhaValida.trim()) > 12
        && nEspeciais(senhaValida) > 1
        && nNumeros(senhaValida) > 1
        && nMaiusculas(senhaValida) > 1;
}

function nCaracteres(string) {
    return string.length;
}

function nEspeciais(string) {
    const regexEspeciais = /[@#%&!+]/g;
    const especiais = string.match(regexEspeciais);
    return especiais ? especiais.length : 0;
}

function nNumeros(string) {
    const regexNumeros = /[0-9]/g;
    const numeros = string.match(regexNumeros);
    return numeros ? numeros.length : 0;
}

function nMaiusculas(string) {
    const regexMaiusculas = /[A-Z]/g;
    const maiusculas = string.match(regexMaiusculas);
    return maiusculas ? maiusculas.length : 0;
}