let teams = [];

const firstSelection = document.getElementById("first-select-object");
const secondSelection = document.getElementById("second-select-object");
const tbody = document.getElementById("tbody");
const submitButton = document.getElementById("button");
const firstTeamScore = document.getElementById("first-team-score");
const secondTeamScore = document.getElementById("second-team-score");


function Team(id, name){
    this.id = id;
    this.name = name;
    this.goalDiff = 0;
    this.matchPlayed = 0;
    this.points = 0;
    this.goalsFor = 0;
    this.goalsAgains = 0;
}

function createTeam(id, name){
    teams.push(new Team(id, name));
}

function updateStorage(){
    localStorage.setItem("teams", JSON.stringify(teams));
}


function createSelection(){
    teams.forEach((team) => {
        option = document.createElement("option");
        option.textContent = team.name;
        option.value = team.id;
        option2 = document.createElement("option");
        option2.textContent = team.name;
        option2.value = team.id;
        firstSelection.appendChild(option2)
        secondSelection.appendChild(option);
    });
}

function createTables(){
    tbody.innerHTML = "";
    teams.forEach((team, index) => {
        tr = document.createElement("tr");
        td1 = document.createElement("td");
        td1.textContent = index + 1;
        td2 = document.createElement("td");
        td2.textContent = team.name;
        td3 = document.createElement("td");
        td3.textContent = team.matchPlayed;
        td4 = document.createElement("td");
        td4.textContent = team.goalsFor + " : " + team.goalsAgains;
        td5 = document.createElement("td");
        td5.textContent = team.goalDiff;
        td6 = document.createElement("td");
        td6.textContent = team.points;
        tbody.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
    });
}

function sortByPoints(){
    teams.sort((b, a) => {
        if(b.points !== a.points) {
            return a.points - b.points;
        } else {
            if(a.goalDiff !== b.goalDiff) {
                return a.goalDiff - b.goalDiff;
            } else {
                if(b.goalsFor > a.goalsFor) {
                    return a.goalsFor - b.goalsFor;
                } else {
                   return a.name - b.name; 
                }
            }
        }
    });
}


submitButton.addEventListener("click", function () {
    let currentTeam1 = teams.find(team => team.id === +firstSelection.value);
    let currentTeam2 = teams.find(team => team.id === +secondSelection.value);
    
    if(firstSelection.value !== secondSelection.value && +firstSelection.value !== 0 && +secondSelection.value !== 0){
        if(+firstTeamScore.value > +secondTeamScore.value){
            currentTeam1.points += 3;
            currentTeam1.goalDiff += (+firstTeamScore.value - +secondTeamScore.value);
            currentTeam1.goalsFor += +firstTeamScore.value;
            currentTeam1.goalsAgains += +secondTeamScore.value;
            currentTeam1.matchPlayed++;
            currentTeam2.goalDiff += (+secondTeamScore.value - +firstTeamScore.value);
            currentTeam2.goalsFor += +secondTeamScore.value;
            currentTeam2.goalsAgains += +firstTeamScore.value;
            currentTeam2.matchPlayed++;
            updateStorage()
            sortByPoints()
        } else {
            if(+firstTeamScore.value === +secondTeamScore.value){
            currentTeam1.points += 1;
            currentTeam1.goalDiff += (+firstTeamScore.value - +secondTeamScore.value);
            currentTeam1.goalsFor += +firstTeamScore.value;
            currentTeam1.goalsAgains += +secondTeamScore.value;
            currentTeam1.matchPlayed++;
            currentTeam2.points += 1;
            currentTeam2.goalDiff += (+secondTeamScore.value - +firstTeamScore.value);
            currentTeam2.goalsFor += +secondTeamScore.value;
            currentTeam2.goalsAgains += +firstTeamScore.value;
            currentTeam2.matchPlayed++;
            updateStorage()
            sortByPoints()
            } else {
            currentTeam1.points += 0;
            currentTeam1.goalDiff += (+firstTeamScore.value - +secondTeamScore.value);
            currentTeam1.goalsFor += +firstTeamScore.value;
            currentTeam1.goalsAgains += +secondTeamScore.value;
            currentTeam1.matchPlayed++;
            currentTeam2.points += 3;
            currentTeam2.goalDiff += (+secondTeamScore.value - +firstTeamScore.value);
            currentTeam2.goalsFor += +secondTeamScore.value;
            currentTeam2.goalsAgains += +firstTeamScore.value;
            currentTeam2.matchPlayed++;
            updateStorage()
            sortByPoints()
            }
        }
        createTables(); 
    } else {

    }
})




createTeam(1, "Chelsea FC");
createTeam(2, "AC Milan");
createTeam(3, "Real Madrid FC");
createTeam(4, "Barcelona FC");
createTeam(5, "Bayern Munich FC");
createSelection();
createTables();








