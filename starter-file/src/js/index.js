




// ********************** fonctions necessaires pour initialiser nos variables ***************

function getColonne(i) { // prend le nombre de colonne qu'on doit reserver a chaque question 
    switch (i) {

        case 1: return 8;  // fievre
        case 2: return 3;  // toux
        case 3: return 3;  // douleurs musculaires
        case 4: return 3;  // gorge
        case 5: return 3;  // diarrhés 
        case 6: return 5;  // fatigue 
        case 7: return 3;  // difficulté alimentaire
        case 8: return 3;  // gêne respiratoire
        case 9: return 5;  // sensation
        case 10: return 1; // autres
        case 11: return 1; // age
        case 12: return 1; // poids 
        case 13: return 1; // taille 
        case 14: return 3; // hypertension arterielle
        case 15: return 2; // diabetique
        case 16: return 2; // cancer
        case 17: return 2; // pneumologie
        case 18: return 2; // insuffisance rénale
        case 19: return 2; // cronique foie
        case 20: return 3; // enceinte
        case 21: return 3; // défenses immunitaire
        case 22: return 3; // immunosurpresseur
        default: return 0;
    }

}


// ************************* initialisation de nos variables globales de control ************

const questions = 22;   // nombres total de questions 
var counter = 0;        // compteur de questions : question actuelle
var answer = 0;         // colonne actuelle 
var stay = false;       // boolean question suivante ou sous question suivante 
var stop = false;       // boolean pour arreter le questionnaire 

// ********************************************************************************************


//   ************************ initialisation de tabData ****************************************
var tabData = new Array(questions + 1);                  // on initialise un tableau de longueur ( nombre de questions)
for (let index = 0; index < tabData.length; index++) {  // dans chaque ligne on reserves les colonnes souhaitées pour stocker nos réponses 
    tabData[index] = new Array(getColonne(index));
}
// ********************************************************************************************









//<----------------------------------- BLOCK REFRESH : MODIFICATION DU CONTENU HTML --------------------------------------->


// ***************************** affichage des divs **********************************************

function getDisplayDivs(i) { // fonction necessaire pour l'affichege de nos divs ( si elles doivent etres affichées ou pas) */

    // on recupere un tableau qui nous permettra de decider quel div afficher par la suite 
    switch (i) {
        case 0: return [0, 0, 0, 0];
        case 1: if (answer == 0) return [0, 0, 1, 0]; else return [0, 1, 0, 0];
        case 2: return [1, 0, 0, 0];
        case 3: return [1, 0, 0, 0];
        case 4: return [1, 0, 0, 0];
        case 5: return [1, 0, 0, 0];
        case 6: return [1, 0, 0, 0];
        case 7: return [1, 0, 0, 0];
        case 8: return [1, 0, 0, 0];
        case 9: return [0, 1, 0, 0];
        case 10: return [0, 0, 0, 1];
        case 11: return [0, 0, 0, 1];
        case 12: return [0, 0, 0, 1];  // poids 
        case 13: return [0, 0, 0, 1]; // taille 
        case 14: return [0, 0, 1, 0];
        case 15: return [1, 0, 0, 0]; // diabetique
        case 16: return [1, 0, 0, 0];
        case 17: return [1, 0, 0, 0]; // pneumologie
        case 18: return [1, 0, 0, 0];
        case 19: return [1, 0, 0, 0]; // foie
        case 20: return [0, 0, 1, 0];
        case 21: return [0, 0, 1, 0]; // immunitaire
        case 22: return [0, 0, 1, 0];  // immunosurpresseur

        default: return 0;
    }

}



function displayNoneDivs(i) { // applique un display : "none" s'il le faut 

    let divList = document.querySelectorAll('.data');  // recupere le noeud des divs Data 

    let displayList = getDisplayDivs(i);  // recupere le tableau d'affichage  ex :[0,0,1,0]

    for (let index = 0; index < displayList.length; index++) { // on parcour le tableau 

        divList.item(index).style.display = (displayList[index] == 0) ? "none" : "block";  // on applique un display : "none" si il y'a un "0" dans la case correspondante a la div data
        // on a utilisé l'operateur ternaire "?" qui prend en entré une condition et donne deux resultat selon si la condition est réalisée ou pas 
    }


    // voici plusieurs syntaxe pour la ligne 102 

    // methode 1 : basique 
    /*
        function getNone(n){
            if (n==0) {
                return "none" ; 
            }else{
                return "block" ; 
            }
        }
        
        divList.item(index).style.display = getNone(displayList[index])


    */

    // methode 2 : lambda expression

    /**
     *  divList.item(index).style.display = () =>  if (displayList[index]==0) {
                return "none" ; 
            }else{
                return "block" ; 
            } ; 
     * 
     */


    /** methode 3 : 
     * 
     *  document.querySelectorAll('data').item(index).style.display = (displayList[index]==0)? "none" : "block" ; 
     * 
     * 
     * 
     */



}

// ******************************************************************

// ************************************

function changeLabel(text) {
    document.getElementById('champText1').textContent = text;
}

function changeOptionsInRadioX4(list) {
    let labels = document.getElementById('radioX4').querySelectorAll('label');
    for (let index = 0; index < list.length; index++) {
        labels.item(index).textContent = list[index];

    }
}

function changeThirdOptionInRadiox3(text) {
    document.getElementById('champ3_3').textContent = text;
}

function setDivs(i) {
    var text = document.getElementById("inputText");
    var error = document.getElementById("errorMessage");
    text.value = "";
    if (i != 10) document.getElementById("errorMessage").textContent = "veuillez saisir les infos";
    error.style.display = "block";
    error.style.color = "black";

    if (i == 1) changeThirdOptionInRadiox3("Ne sait pas");
    if (i == 1 && answer !== 0)
        changeOptionsInRadioX4(['entre 35,5 et 37,7°C', 'entre 37,8 et 38,9°C', 'supérieur 39°C', 'inférieur à 35,4°C']);
    if (i == 9)
        changeOptionsInRadioX4(['très bien', 'bien', 'mal', 'très mal']);
    if (i == 10)
        changeLabel(null);
    if (i == 11)
        changeLabel("ans");
    if (i == 12) {
        //document.getElementById('inputText').setAttribute("required","")  ; 
        changeLabel("Kg");
        // console.log(document.getElementById('inputText').required + "zejkfzejfkzekjfzekjfzkejf");
    }//else {document.getElementById('inputText').removeAttribute("required");console.log(document.getElementById('inputText').required + "zejkfzejfkzekjfzekjfzkejf"); }
    if (i == 13)
        changeLabel("Cm");
    if (i == 14 || i == 21 || i == 22)
        changeThirdOptionInRadiox3("Ne sait pas");
    if (i == 20)
        changeThirdOptionInRadiox3("non applicable");

}
function setH1(text) {
    document.getElementById('questionDuFormulaire').textContent = text;
}
function setQuestions(i) {
    switch (i) {
        case 0: setH1("Demmarrer le test --- preambule"); break;
        case 1: if (answer == 0) {
            setH1('Pensez-vous avoir eu de la fièvre ces derniers jours (frissons, sueurs) ? ');
            break;
        } else {
            setH1('quelle est votre température ?');
            break;
        }
        case 2: setH1("Avez-vous une toux ou une augmentation de votre toux habituelle ces derniers jours ?");
            break;
        case 3: setH1("Avez-vous des douleurs musculaires ou des courbatures inhabituelles ces derniers jours ?");
            break;
        case 4: setH1("Avez-vous un mal de gorge apparu ces derniers jours ?");
            break;
        case 5: setH1("Avez-vous de la diarrhée ces dernières 24 heures(au moins 3 selles molles) ?");
            break;
        case 6: if (answer == 0) {
            setH1(" Avez-vous une fatigue inhabituelle ces derniers jours ?");
            break;
        } else {
            setH1("cette fatigue vous oblige-t-elle à vous reposer plus de la moitié de la journée ?");
            break;
        }
        case 7: setH1("Avez-vous des difficultés importantes pour vous alimenter ou boire depuis plus de 24h ?");
            break;
        case 8: setH1("Avez-vous vu apparaître une gêne respiratoire ou une augmentation de votre gêne respiratoire habituelle ?");
            break;
        case 9: setH1(" Comment vous sentez-vous ?");
            break;
        case 10: setH1("Avez vous d'autres symptomes ?");
            break;
        case 11: setH1("Quel est votre âge ?");
            break;
        case 12: setH1("Quel est votre poids ?");
            break;
        case 13: setH1("Quelle est votre taille ?");
            break;
        case 14: setH1("Avez-vous de l’hypertension artérielle ? Ou avez-vous une maladie cardiaque ouvasculaire ? Ou prenez-vous un traitement à visée cardiologique ?");
            break;
        case 15: setH1("Êtes-vous diabétique ?");
            break;
        case 16: setH1("Avez-vous ou avez-vous eu un cancer ?");
            break;
        case 17: setH1("Avez-vous une maladie respiratoire ? ");
            break;
        case 18: setH1("Avez-vous une insuffisance rénale chronique dialysée ? ");
            break;
        case 19: setH1("Avez-vous une maladie chronique du foie ?");
            break;
        case 20: setH1("Êtes-vous enceinte ?");
            break;
        case 21: setH1("Avez-vous une maladie connue pour diminuer vos défenses immunitaires ");
            break;
        case 22: setH1("Prenez-vous un traitement immunosuppresseur ? C’est un traitement qui diminue vosdéfenses contre les infections. Voici quelques exemples : corticoïdes, méthotrexate,ciclosporine, tacrolimus, azathioprine, cyclophosphamide (liste non exhaustive). ");
            break;
    }

}




function refresh(i) {
    setQuestions(i);
    setDivs(i);
    displayNoneDivs(i);
    // if (counter == 0) {
    //     document.getElementById('avancement').style.display="none"; 
    //     document.getElementById('nextB').value = "démarrer le test ";
    // }else{
    document.getElementById('avancement').style.display = "block";
    document.getElementById('nextB').value = "next ";

    //   }
    if (!(i > 1 && i < questions + 2)) { document.getElementById('previousB').style.display = "none"; }
    else { document.getElementById('previousB').style.display = "inline-block"; }
    if (counter == questions + 1) { document.getElementById('nextB').style.display = "none"; }

}








//  < ---------------------------------BLOCK REFRESH---------------------------------- />

// ******************************* refresh Counter ******************
function refreshCounter(x) {
    if (!x) {
        counter += 1;
        answer = 0
    }
}
//*********************************************************** */

// < ----------------------------------BLOCK DECIDE------------------------------------/>


function decide(i) {
    if (i == 1 && answer == 3 && tabData[1][0] == true) { stay = true; return; }
    if (i == 1 && answer == 7) {
        if (tabData[1][5]) tabData[1][7] = "fgm";
        if (tabData[1][6]) tabData[1][7] = "fgM";
        if (!(tabData[1][3] || tabData[1][4] || tabData[1][5] || tabData[1][6])) tabData[1][7] = "fievre";

        stay = false;

    }
    if (i == 6 && answer == 2 && tabData[6][0] == true) { stay = true; return }
    if (i == 6 && answer == 4 && tabData[6][2] == true) {
        tabData[6][4] = "fgm";
        stay = false;
        return;
    } if (tabData[6][2] != true) { stay = false; return; }
    if ((i == 7 || i == 8) && tabData[i][0] == true) tabData[i][2] = "fgM";
    if (i == 9 && tabData[9][3] == true) tabData[9][4] = "fgm";




}


function stock(i) {
    let divList = document.querySelectorAll('.data');
    divList.forEach(element => {
        if (element.style.display !== "none") element.querySelectorAll('input').forEach(x => {
            let name = x.className;
            if (name == "finalData radio") {
                tabData[i][answer] = x.checked;
                x.checked = false;
                answer += 1;
            }
            if (name == "finalData text") {
                tabData[i][answer] = x.value;
                x.value = null;
                answer += 1;
            }


        });
    });
}

function barre(i) {
    var ONon = Math.trunc((i / questions) * 89).toString();
    var OFof = Math.trunc(89 - i / questions * 89).toString();
    document.getElementById('donePerc').style.width = ONon + "%";
    document.getElementById('notDonePerc').style.width = OFof + "%";
    console.log(ONon + " khraaaa");

    //document.querySelector('#donePerc').style.width = ONon+"%" ; 
}


//*******************************Controll Section ******************** */

function controlSection(i) {
    let a = [0, 0, 0]
    if (counter < 1) a = [1, 0, 0];
    if (counter <= questions && counter >= 1) a = [0, 1, 0];
    if (counter > questions) a = [0, 0, 1];
    let listSections = document.querySelectorAll('section');
    for (let index = 0; index < a.length; index++) {
        listSections.item(index).style.display = (a[index] == 0) ? "none" : "block";
    }

}

function checkProgress() {
    // var b = 0 ; 
    // let a = document.querySelectorAll('input') ; 
    // a.forEach(element => { if (element.checked) b= 1 ;
    // });
    // if (counter ==0) b = 1 ;
    // if (b==0 ) document.getElementById('nextB').setAttribute("disabled","") ;
    // console.log(b) ; 

    document.getElementById('nextB').removeAttribute("disabled");
}


function start() {
    counter = 1;
    controlSection(counter);
    refresh(counter);
    barre(counter);
    //checkProgress() ; 
    document.getElementById('nextB').setAttribute("disabled", "");
    console.log(counter);
}
// ***********************************************************
function getTextText(i) {
    switch (counter) {
        case 11: return "l'age";
        case 12: return "le poids";
        case 13: return "la taille";
        default: break;
    }
}
function error1() {
    var regex = /^[a-zA-Z]+$/;
    var text = document.getElementById("inputText");

    var value = parseInt(text.value.toString());
    var z = /^[0-9]/;
    if (text.value.match(z)) console.log("ah");
    // console.log(value) ; 
    console.log("--------------------------");
    // console.log(value.className) ; 
    var error = document.getElementById("errorMessage");

    if (counter != 10 && text.value != "") {
        document.getElementById('nextB').removeAttribute("disabled");
        error.style.display = "none";
    }

    if (counter != 10 && text.value == "") {

        document.getElementById('nextB').setAttribute("disabled", "");
        error.textContent = "veuillez saisir les infos";
        error.style.display = "block";

        error.style.color = "red";

    }

    if ((counter == 11 || counter == 12 || counter == 13) && text.value.match(regex)) {

        document.getElementById('nextB').setAttribute("disabled", "");
        var x = getTextText(counter);

        error.textContent = x + " doit etre un chiffre";
        error.style.display = "block";
        error.style.color = "red";
    }
    if (counter == 11 && (parseInt(text.value) > 155 || parseInt(text.value) < 7)) {
        document.getElementById('nextB').setAttribute("disabled", "");
        var x = getTextText(counter);

        error.textContent = "veuillez saisir votre vrai age";
        error.style.display = "block";
        error.style.color = "red";
    }
    if (counter == 12 && parseInt(text.value) > 597) {
        document.getElementById('nextB').setAttribute("disabled", "");
        var x = getTextText(counter);

        error.textContent = "Bravo vous avez battu le records de guiness en terme de poids !! ";
        error.style.display = "block";
        error.style.color = "red";
    }
    if (counter == 12 && parseInt(text.value) < 20) {
        document.getElementById('nextB').setAttribute("disabled", "");
        var x = getTextText(counter);

        error.textContent = "on devrait vous mesurer en grammes plutot ... ";
        error.style.display = "block";
        error.style.color = "red";
    }
    if (counter == 13 && parseInt(text.value) > 247) {
        document.getElementById('nextB').setAttribute("disabled", "");
        var x = getTextText(counter);

        error.textContent = "Bravo vous avez battu le records de guiness en terme de taille !! , quelle est votre largeur ? bach nchoufo wach mouka3ab wla ach tkoune !  ";
        error.style.display = "block";
        error.style.color = "red";
    }
    if (counter == 13 && parseInt(text.value) < 20) {
        document.getElementById('nextB').setAttribute("disabled", "");
        var x = getTextText(counter);

        error.textContent = "mistara nta !!! wakha tselefni rassek ndowez bik l watani ?  ";
        error.style.display = "block";
        error.style.color = "red";
    }

    // if(counter == 11) poid
    // if(counter == 11) taille

}
function myNextFunction() {
    //if(!(counter==10 && document.getElementById("inputText").value ==null)){

    console.log(counter);
    stock(counter);
    console.log("9hab" + answer);
    decide(counter);
    console.log('*******************' + counter + "*****" + answer + "*******" + stay + "****" + tabData[1][0])
    refreshCounter(stay);
    refresh(counter);

    barre(counter);
    controlSection(counter);
    document.getElementById('nextB').setAttribute("disabled", "");

    //}
    if (counter == 10) document.getElementById('nextB').removeAttribute("disabled");

    console.log(counter);
    console.log(tabData);
    console.log("***");

    //} else{document.getElementById('nextB').removeAttribute("disabled") ; }

    //checkProgress(); 




}

// ******************************* PREVIOUS **********************


function myPreviousFunction() {


    if (answer == 0) {
        counter -= 1;
    } else { answer = 0; }

    refresh(counter);
    document.querySelectorAll('.data').forEach(element => {
        element.querySelectorAll('input').forEach(x => {
            x.checked = false;
        });
    });

    barre(counter);
    controlSection(counter);

    if (counter == 10) document.getElementById('nextB').removeAttribute("disabled");
    document.getElementById('errorMessage').textContent = ""

    console.log(counter);
}

//******************************************** */



//**************************** getResults************ */
// algo decisionnel 
function setResult2HTML(text) {
    document.getElementById("resultatsFinaux2").innerHTML = text;
}
function setResult3HTML(text) {
    document.getElementById("resultatsFinaux3").innerHTML = text;
}
function setResultHTML(text) {

    document.getElementById("resultatsFinaux").innerHTML = text;

}

function getResults() {
    // for (let index = 11; index < tabData.length; index++) {
    //     var c = 0 ; 
    //     if(tabData[index][0]) c ++ ; 
    // }


    // let fievre = (tabData[1][0] || tabData[1][2]); 
    // let noFievre = tabData[1][1] ; 
    // let basseFievre = (tabData[1][6]) ;   
    // let hauteFievre = (tabData[1][5]) ; 
    // let toux = tabData[2][0];
    // let noToux = tabData[2][1];
    // let courbatures = tabData[3][0] ; 
    // let noCourbatures = tabData[3][1] ; 
    // let malGorge = tabData[4][0] ; 
    // let noMalGorge = tabData[4][1] ; 
    // let fatigue = tabData[6][0] ; 
    // let noFatigue = tabData[6][1] ; 
    // let malaise = tabData[9][0]; 
    // let noMalaise = tabData[9][1] ; 
    // let gene = tabData[8][0] ; 
    // let noGene = tabData[8][1] ; 
    // let diffAlim = tabData[7][0] ; 
    // let noDiffAlim = tabData[7][1] ; 
    // let age = parseInt(tabData[11][0].toString()) ; 
    // let diarrhee = tabData[5][0] ; 
    // let noDiarrhee = tabData[5][1] ;



    // var decision ="" ; 
    // facPro = (c > 0 ) ;
    // if (tabData[1][0] || (tabData[2][0] && tabData[4][0]) || (tabData[2][0] && tabData[3][0])) {
    //     if (basseFievre || tabData[8][0] || tabData[7][0]) {
    //         decision = 'veuillez appeler le numéro 141';
    //     } else if (
    //         ( c > 0 &&
    //             tabData[8][1] &&
    //             tabData[7][1] &&
    //             !basseFievre &&
    //             ((hauteFievre && fatigue && malaise) ||
    //                 (hauteFievre && fatigue) ||
    //                 (fatigue && malaise) ||
    //                 (hauteFievre && malaise))) ||
    //         (facPro && !gene && !diffAlim && !basseFievre && hauteFievre && !fatigue && !malaise) ||
    //         (facPro && !gene && !diffAlim && !basseFievre && fatigue && !hauteFievre && !malaise) ||
    //         (facPro && !gene && !diffAlim && !basseFievre && malaise && !hauteFievre && !fatigue)
    //     ) {
    //         decision= 'veuillez appeler le numéro 141';
    //     } else if (facPro && !hauteFievre && !fatigue && !malaise && !gene && !diffAlim && !basseFievre) {
    //         decision =
    //             'téléconsultation ou médecin généraliste ou visite à domicile ';
    //         decision +=
    //             'appelez le 141 si une gêne respiratoire ou des difficultés importantes pour s’alimenter ou boire pendant plus de 24h apparaissent';
    //     } else if (
    //         (age > 50 &&
    //             age <= 69 &&
    //             (!facPro && !hautFievre && !fatigue && !malaise && !gene && !diffAlim && !basseFievre)) ||
    //         (!facPro && !basseFievre && !gene && !diffAlim && (hauteFievre || fatigue || malaise))
    //     ) {
    //         decision =
    //             'téléconsultation ou médecin généraliste ou visite à domicile ';
    //         decision +=
    //             'appelez le 141 si une gêne respiratoire ou des difficultés importantes pour s’alimenter ou boire pendant plus de 24h apparaissent';
    //     } else if (
    //         age < 50 &&
    //        !facPro &&
    //         !hauteFievre &&
    //         !fatigue &&
    //         !malaise &&
    //         !gene &&
    //         !diffAlim &&
    //         !basseFievre
    //     ) {
    //         decision=
    //             'nous vous conseillons de rester à votre domicile et de contacter votre médecin en cas d’apparition de nouveaux symptômes. Vous pourrez aussi utiliser à nouveau l’application pour réévaluer vos symptômes';
    //     } else {
    //         decision=
    //             'Votre situation ne relève probablement pas du Covid-19. N’hésitez pas à contacter votre médecin en cas de doute. Vous pouvez refaire le test en cas de nouveau symptôme pour réévaluer la   situation.   Pour   toute information concernant   le   Covid-19 allez vers la page d’accueil.';
    //     }
    // } else if (
    //     (fievre && !toux && noDiarrhee) ||
    //     (noFievre && toux && noMalGorge && noCourbatures) ||
    //     (noFievre && noToux && malGorge) ||
    //     (noToux && courbatures) ||
    //     (noFievre && diarrhee)
    // ) {
    //     if (noHauteFievre && noFatigue && noMalaise && noGene && noDiffAlim && noBasseFievre) {
    //         decision =
    //             'Votre situation ne relève probablement pas du Covid-19. Consultez votre médecin au moindre doute.';
    //     } else if (
    //         (noFacPro && noGene && noDiffAlim && !basseFievre && hauteFievre && noFatigue && noMalaise) ||
    //         (noFacPro && noGene && noDiffAlim && !basseFievre && fatigue &&!hauteFievre && noMalaise) ||
    //         (noFacPro && noGene && noDiffAlim && !basseFievre && malaise && !hauteFievre && noFatigue) ||
    //         (facPro && noGene && noDiffAlim && !basseFievre && noMalaise && !hauteFievre && noFatigue)
    //     ) {
    //         decision =
    //             'Votre situation ne relève probablement pas du Covid-19. Un avis médical est recommandé. Au moindre doute, appelez le 141. ';
    //     } else {
    //         decision =
    //             'Votre situation ne relève probablement pas du Covid-19. N’hésitez pas à contacter votre médecin en cas de doute. Vous pouvez refaire le test en cas de nouveau symptôme pour réévaluer la   situation.   Pour   toute information concernant   le   Covid-19 allez vers la page d’accueil.';
    //     }
    // }

    // ********************************************************
    let fievre = (tabData[1][0] || tabData[1][2]);
    // let noFievre = tabData[1][1] ; 
    // let basseFievre = (tabData[1][6]) ;   
    // let hauteFievre = (tabData[1][5]) ; 
    let toux = tabData[2][0];
    // let noToux = tabData[2][1];
    let courbatures = tabData[3][0];
    // let noCourbatures = tabData[3][1] ; 
    let malGorge = tabData[4][0];
    // let noMalGorge = tabData[4][1] ; 
    // let fatigue = tabData[6][0] ; 
    // let noFatigue = tabData[6][1] ; 
    // let malaise = tabData[9][0]; 
    // let noMalaise = tabData[9][1] ; 
    // let gene = tabData[8][0] ; 
    // let noGene = tabData[8][1] ; 
    // let diffAlim = tabData[7][0] ; 
    // let noDiffAlim = tabData[7][1] ; 
    let age = parseInt(tabData[11][0]);
    let diarrhee = tabData[5][0];
    // let noDiarrhee = tabData[5][1] ;
    //
    var decision2 = "";
    var decision = "";
    var add = false;
    var facPro = 0;
    for (let index = 11; index < tabData.length; index++) {

        if (tabData[index][0]) facPro++;
    }
    var fg = 0;
    var fgm = 0;
    var fgM = 0;
    for (let index = 0; index < 10; index++) {
        var lastCel = getColonne(index);
        if (tabData[index][lastCel] == "fgm") {
            fg++;
            fgm++;
        }
        if (tabData[index][lastCel] == "fgM") {
            fg++;
            fgM++;
        }
    }
    //facteurs pronostiques 
    // ************* branche 1 

    if (fievre || (toux && malGorge) || (toux && courbatures) || (fievre && diarrhee)) {
        if (facPro == 0) {
            if (fg == 0 && age < 50) {
                decision += " nous vous conseillons de rester à votre domicile et de contacter votre médecin en cas d’apparition de nouveaux symptômes. Vous pourrez aussi utiliser à nouveau l’application pour réévaluer vos symptômes."
            }
            if ((fg == 0 & (age > 49 && age < 70)) || fgm > 0) {
                decision += "téléconsultation ou médecin généraliste ou visite à domicile";
                add = true;
            }
        }


        if (facPro > 0) {
            if (fg == 0) {
                decision += " téléconsultation ou médecin généraliste ou visite à domicile";
                add = true;
            }
            if (fgm == 1) {
                decision += " téléconsultation ou médecin généraliste ou visite à domicile";
                add = true;
            }
            if (fgm > 1) {
                decision += "appelez le 141";
            }
        }
        if (fgM > 0) decision += "appelez le 141";
    }


    // 2nd branche 
    if (fievre && toux) {
        if (facPro == 0) {
            if (fg == 0 || (fgm > 1 && fgM == 0)) {
                decision += "téléconsultation ou médecin généraliste ou visite à domicile";
                add = true;
            }
        } else {
            if (fg == 0) {
                decision += " téléconsultation ou médecin généraliste ou visite à domicile";
                add = true;
            }
            if (fgm == 1) {
                decision += " téléconsultation ou médecin généraliste ou visite à domicile";
                add = true;
            }
            if (fgm > 1) decision += "appelez le 141";
        }
        if (fgM != 0) decision += "appelez le 141";

    }

    var table = [fievre, toux, malGorge, courbatures];
    var c = 0;
    for (let index = 0; index < table.length; index++) {
        if (table[index]) c++;

    }
    if (c == 1) {
        if (fg == 0) {
            decision += "Votre situation ne relève probablement pas du Covid-19. Consultez votre médecin au moindre doute";
        }
        if (fg > 0 || facPro > 0) {
            decision += "Votre situation ne relève probablement pas du Covid-19. Un avis médical est recommandé. Au moindre doute, appelez le 141.";
        }
    }

    var symp = 0;
    for (let index = 0; index < 11; index++) {
        if (tabData[index][0]) symp++;

    }

    if (symp == 0) {
        decision += "Votre situation ne relève probablement pas du Covid-19. N’hésitez pas à contacter votre médecin en cas de doute. Vous pouvez refaire le test en cas de nouveau symptôme pour réévaluer la situation. Pour toute information concernant le Covid-19 allez vers la page d’accueil.";
    }

    if (add) decision2 += "appelez le 141 si une gêne respiratoire ou des difficultésimportantes pours’alimenter ou boire pendant plus de 24h apparaissent.";

    //
    //
    //

    setResultHTML(decision);
    setResult2HTML(decision);
    setResult3HTML("Restez chez vous au maximum en attendant que les symptômes disparaissent.Prenez votre température deux fois par jour. Rappel des mesures d’hygiène.");
}