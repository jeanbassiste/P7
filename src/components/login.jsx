import '../styles/Form.scss';
import { NavLink } from "react-router-dom";
import axios from 'axios';

function Login() {
    return (
        <div className='main col-lg-8 mx-auto'>
        <h1>Bienvenue sur GroupoConnect !</h1>
        <h2>Le réseau social des employés de Groupomania</h2>
        <p>Connectez-vous en utilisant votre adresse @groupomania.fr</p>

        <form id="loginForm" className="loginForm" noValidate>
            <input type="email" className="form-control" id="email" autocomplete="off" name="email" placeholder="jane.doe@groupomania.fr" />
            <p id="emailError">Utilisez une adresse @groupomania.com valide.</p>
            <div className='d-flex flex-row position-relative'><input type="password" className="form-control" id="password" autocomplete="off" name="password" placeholder="Mot de passe" /> <i className="bi bi-eye position-absolute end-0 top-0 me-2 mt-1" id="seePassword"></i></div>
            <p id="passwordError">Le mot de passe doit contenir : au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.</p>
            <button id="logInButton" className="btn btn-success col-12 col-md-6 rounded-pill my-3" type="button" data-bs-toggle="" data-bs-target="">Connectez-vous</button>
        </form>

        <p>Première connexion ? <NavLink to="/signup">Créez votre compte !</NavLink></p>
        </div>
          );

}

window.addEventListener('DOMContentLoaded', (event) => {

let seePassword = document.getElementById('seePassword');
let logIn = document.getElementById('logInButton');
let emailData = document.getElementById('email') ;
let passwordData = document.getElementById('password');
let validEmail = new RegExp(/[A-Za-z.]+@groupomania+\.com/);
let validPassword = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);

function displayPassword() {

    let hideOrDisplay = seePassword.getAttribute('class');

    if(hideOrDisplay === "bi bi-eye position-absolute end-0 top-0 me-2 mt-1") {
    passwordData.setAttribute('type', 'text');
    seePassword.removeAttribute('class')
    seePassword.setAttribute('class', 'bi bi-eye-slash position-absolute end-0 top-0 me-2 mt-1')
    }
    if(hideOrDisplay === "bi bi-eye-slash position-absolute end-0 top-0 me-2 mt-1") {
        passwordData.setAttribute('type', 'password');
        seePassword.removeAttribute('class')
        seePassword.setAttribute('class', 'bi bi-eye position-absolute end-0 top-0 me-2 mt-1')        
    }
}

seePassword.addEventListener('click', displayPassword);

function isValid(data) {
    let dataToTest = data.value;
    let inputID = data.id;

    console.log(dataToTest);
    console.log(inputID);

    if (inputID === 'email') {
        if (validEmail.test(dataToTest) === true) {
            emailData.setAttribute('class', 'form-control is-valid');
            document.getElementById('emailError').style.display = 'none';
            return true;
        }
        else {
            emailData.setAttribute('class', 'form-control is-invalid');
            document.getElementById('emailError').style.display = 'initial';
            return false;
        }
    }

    if (inputID === 'password') {
        if (validPassword.test(dataToTest) === true) {
            passwordData.setAttribute('class', 'form-control');
            document.getElementById('passwordError').style.display = 'none';
            return true;
        }
        else {
            passwordData.setAttribute('class', 'form-control is-invalid');
            document.getElementById('passwordError').style.display = 'initial';
            return false;
        }
    }

}

emailData.addEventListener('change', () => isValid(emailData));

function logingIn(ev) {
         ev.preventDefault();
 
         console.log('its alive!!!!');
         let emailValidation = isValid(emailData);
         let passwordValidation = isValid(passwordData);
         

         if (emailValidation === true && passwordValidation === true) {
            
            let dataToSend = {
                emailAddress : emailData.value,
                password : passwordData.value
            };
    
            console.log(dataToSend);

            //const dataJson = JSON.stringify(dataToSend);
            let headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }

            axios.post(`http://localhost:8080/api/users/login`, { 
                emailAddress : emailData.value,
                password : passwordData.value }, 
                headers )
            .then(res => {
                console.log(res);
                console.log(res.data);
                return res.data;               
            })
            .then(response => {//fusionner les 2 then
                console.log(response.token);
                if (response.token) {
                    console.log('ça marche')
                    const test= response;
                    console.log(test);
                    //return response.json();
                    window.location.href = '/posts'
                }
                else {
                    console.error('Code Erreur', response.status);
                }
            })
            
            
            /*let fetchUrl = 'http://localhost:8080/api/users/login';
            fetch(fetchUrl, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(dataToSend)})
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    return res.json();
            })
            .then(response => {
                console.log(response.token);
                if (response.token) {
                    console.log('ça marche')
                    const test= response;
                    console.log(test);
                    //return response.json();
                    window.location.href = '/posts'
                }
                else {
                    console.error('Code Erreur', response.status);
                }
            })*/}

         else {
             console.log('something went horribly wrong');
         }
     }
 
logIn.addEventListener('click', logingIn);;
 });


export default Login ;

/*Utiliser soit un component.state pour qu'il ne s'affiche qu'après que le composant soit affiché soit cf solution DOMContentLoaded soit hook(didMount)
https://developer.mozilla.org/fr/docs/Web/API/Window/DOMContentLoaded_event*/

//https://www.digitalocean.com/community/tutorials/react-axios-react-fr

//https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/async_function

//https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Using_promises

//https://sequelize.org/v3/docs/associations/

//https://v5.reactrouter.com/web/guides/quick-start


