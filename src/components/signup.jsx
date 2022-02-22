import '../styles/Form.scss';
import { NavLink } from "react-router-dom";
import axios from 'axios';

function Signup() {
    return (
        <div className='main col-lg-8 mx-auto'>
        <h1>Bienvenue sur GroupoConnect !</h1>
        <h2>Le réseau social des employés de Groupomania</h2>
        <p>Créez votre compte et rencontrez vos collaborateurs !</p>


        <form id="signUpForm" className="signupForm" noValidate>
            <input type="email" className="form-control" id="SUemail" autocomplete="off" name="email" placeholder="jane.doe@groupomania.fr" />
            <p id="emailError">Utilisez une adresse @groupomania.com valide.</p>
            <div className='d-flex flex-row position-relative'><input type="password" className="form-control" id="SUpassword" autocomplete="off" name="password" placeholder="Mot de passe" /> <i className="bi bi-eye position-absolute end-0 top-0 me-2 mt-1" id="seePassword"></i></div>
            <p id="passwordError">Le mot de passe doit contenir : au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.</p>
            <input type="password" className="form-control" id="SUVerifyPassword" autocomplete="off" name="password" placeholder="Répétez votre mot de passe" />
            <p id="verifyError">Les deux mots de passe ne sont pas identiques.</p>
            <button id="SignUpButton" className="btn btn-success col-12 col-md-6 rounded-pill my-3" type="button" data-bs-toggle="" data-bs-target="">Inscrivez-vous</button>
        </form>

        <p>Déjà membre ? <NavLink to="/login">Connectez-vous !</NavLink></p>
        </div>
          );
}

window.addEventListener('DOMContentLoaded', (event) => {
    let signup = document.getElementById('SignUpButton');
    let SUemailData = document.getElementById('SUemail') ;
    let SUpasswordData = document.getElementById('SUpassword');
    let SUVerifyPasswordData = document.getElementById('SUVerifyPassword');
    let seePassword = document.getElementById('seePassword');

    function displayPassword() {

        let hideOrDisplay = seePassword.getAttribute('class');
        if(hideOrDisplay === "bi bi-eye position-absolute end-0 top-0 me-2 mt-1") {
        SUpasswordData.setAttribute('type', 'text');
        seePassword.removeAttribute('class')
        seePassword.setAttribute('class', 'bi bi-eye-slash position-absolute end-0 top-0 me-2 mt-1')
        }
        if(hideOrDisplay === "bi bi-eye-slash position-absolute end-0 top-0 me-2 mt-1") {
            SUpasswordData.setAttribute('type', 'password');
            seePassword.removeAttribute('class')
            seePassword.setAttribute('class', 'bi bi-eye position-absolute end-0 top-0 me-2 mt-1')        
        }
    }

    seePassword.addEventListener('click', displayPassword);

    let validSUEmail = new RegExp(/[A-Za-z.]+@groupomania+\.com/);
    let validSUPassword = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);

    
    
    function SUisValid(data) {
        let dataToTest = data.value;
        let inputID = data.id;
        
        if (inputID === 'SUemail') {
            if (validSUEmail.test(dataToTest) === true) {
                SUemailData.setAttribute('class', 'form-control is-valid');
                document.getElementById('emailError').style.display = 'none';
                return true;
            }
            else {
                SUemailData.setAttribute('class', 'form-control is-invalid');
                document.getElementById('emailError').style.display = 'initial';
                return false;
            }
        }
    
        if (inputID === 'SUpassword') {
            if (validSUPassword.test(dataToTest) === true) {
                SUpasswordData.setAttribute('class', 'form-control is-valid');
                document.getElementById('passwordError').style.display = 'none';
                return true;
            }
            else {
                SUpasswordData.setAttribute('class', 'form-control is-invalid');
                document.getElementById('passwordError').style.display = 'initial';
                return false;
            }
        }

        if (inputID === 'SUVerifyPassword') {
            if (SUpasswordData.value === SUVerifyPasswordData.value) {
                SUVerifyPasswordData.setAttribute('class', 'form-control is-valid');
                document.getElementById('verifyError').style.display = 'none';
                return true;
            }
            else {
                SUVerifyPasswordData.setAttribute('class', 'form-control is-invalid');
                document.getElementById('verifyError').style.display = 'initial';
                return false;
            }
        }
    
    }

    SUemailData.addEventListener('change', () => SUisValid(SUemailData));
    SUpasswordData.addEventListener('change', () => SUisValid(SUpasswordData));
    SUVerifyPasswordData.addEventListener('change', () => SUisValid(SUVerifyPasswordData));

 function SigningUp(ev) {
         ev.preventDefault();

         let SUemailValidation = SUisValid(SUemailData);
         let SUpasswordValidation = SUisValid(SUpasswordData);
         let SUverifyValidation = SUisValid(SUVerifyPasswordData);

         if (SUemailValidation === true && SUpasswordValidation === true && SUverifyValidation === true) {
            
            let dataToSend = {
                emailAddress : SUemailData.value,
                password : SUpasswordData.value
            };

            //let dataJson = JSON.stringify(dataToSend); // No Need to stringify

            let headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };

            axios.post(`http://localhost:8080/api/users/signup`, {                 
                emailAddress : SUemailData.value,
                password : SUpasswordData.value }, 
                headers )
            .then(res => {
                console.log(res);
                console.log(res.data);
                return res.data;               //RES.DATA
            })
            .then(response => {
                if (response.token) {
                    console.log('ça marche')
                    //return response.json();
                    window.location.href = '/profile'
                }
                else {
                    console.error('Code Erreur', response.status);
                }
            })        
            /*let fetchUrl = 'http://localhost:8080/api/users/signup';
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
            })
            .then(response => {
                if (response.token) {
                    console.log('ça marche')
                    //return response.json();
                    window.location.href = '/profile'
                }
                else {
                    console.error('Code Erreur', response.status);
                }
            })*/}

            
            //window.location.href = './SignedUp.html'         }
         else {
             console.log('something went horribly wrong');
         } 
    
     }
 
     signup.addEventListener('click', SigningUp);;
 });

export default Signup ;

//https://www.digitalocean.com/community/tutorials/react-axios-react-frje