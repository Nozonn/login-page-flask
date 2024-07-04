const getId = (id) => document.getElementById(id);
const item = (selec) => document.querySelector(selec)


// --------------- HEADER - - -------------- 

const btnConn = getId("methodConn").children;

// --------------- LOGIN ----------------------
const login = getId("login");
const user = getId("usernameLogin");
const pwd = getId("passwordLogin");
const data = [user, pwd];
const errorLogin = [
    item(".loginError"),
    item(".usernameMissing"),
    item(".passwordMissing"),
];

// ------------ - SIGNIN - ---------------------------
const signin = getId("signin");
const userSign = getId("usernameSignin");
const pwdSign = getId("passwordSignin");
const age = getId("ageSignin"), email = getId("emailSignin");
const dataSign = [userSign, email, age, pwdSign];
const errorSignin = [
    item(".usernameAlreadyUsed"),
    item(".usernameSignMissing"),
    item(".emailMissing"),
    item(".ageMissing"),
    item(".passwordSignMissing")
];


btnConn[0].addEventListener("click", (ev) => {
    btnConn[0].setAttribute("class", "select");
    btnConn[1].setAttribute("class", "");
    
    data.forEach( (it) => {it.value =""; it.style.border="none"} )

    errorLogin.forEach( (err) => {
        err.style.display = "none";
    })

    getId("signinSection").style.display = "none";
    getId("loginSection").style.display = "flex";

    // signin.classList.add("leave");

    // signin.addEventListener("transitionend", () => {
    //     getId("signinSection").style.display = "none";
    //     getId("loginSection").style.display = "flex";
    //     signin.setAttribute("class", "");

    //     user.value = "", pwd.value = "";
    //     document.querySelector(".loginError").style.display = "none";
    // })    
})

btnConn[1].addEventListener("click", (ev) => {
    btnConn[1].setAttribute("class", "select");
    btnConn[0].setAttribute("class", "");

    dataSign.forEach( (it) => {it.value=""; it.style.border="none"} );

    errorSignin.forEach( err => err.style.display="none");
    
    getId("loginSection").style.display = "none";
    getId("signinSection").style.display = "flex";

    // login.classList.add("leave");

    // login.addEventListener("transitionend", () => {
    //     getId("loginSection").style.display = "none";
    //     getId("signinSection").style.display = "flex";
    //     login.setAttribute("class", "");

    // })
    
})

login.addEventListener("submit", (ev) => {
    document.querySelector(".loginError").style.display = "none";
    document.querySelector(".usernameMissing").style.display = "none";
    document.querySelector(".passwordMissing").style.display = "none";

    data.forEach( (d) => d.style.border = "none" );
    
    if (!user.value && !pwd.value) {
        ev.preventDefault();
        document.querySelector(".usernameMissing").style.display = "block";
        document.querySelector(".passwordMissing").style.display = "block";

        user.style.border = "1px solid red";
        pwd.style.border = "1px solid red";
    }

    if (!user.value) {
        ev.preventDefault();
        document.querySelector(".usernameMissing").style.display = "block";

        user.style.border = "1px solid red";
    }

    if (!pwd.value) {
        ev.preventDefault()
        document.querySelector(".passwordMissing").style.display = "block";

        pwd.style.border = "1px solid red";
    }
})


signin.addEventListener("submit", (ev) =>{
    dataSign.forEach( it => it.style.border = "none" )
    errorSignin.forEach( err => err.style.display = "none" )

    let infoMissing = false
    let count = 1;
    dataSign.forEach( it => {
        if ( it.value == "" ) {
            it.style.border = "1px solid red"
            errorSignin[count].style.display = "block";
            infoMissing = true;
        }

        count++;
    } )

    if (infoMissing) {ev.preventDefault()}
})