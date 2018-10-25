
// LOADER <div class="lds-ripple"><div></div><div></div></div>

$(document).ready(function(){

    var myTable;

    var columnsTable = [{
        title: "Name"
        }, {
        title: "Date"
        }, {
        title: "Status"
        }, {
        title: "Competition"
        }
    ];

   $('#select-league').on('change', function(){
        var teamSelectedId = $('#select-league').val();
        callTeams(teamSelectedId);  
   });

    $('#btnSearch').on('click', function(){
         var teamSelectedId = $('#select-team').val();
         var teamName = $('#select-team option:selected').text();
         jsonData = callTeam(teamSelectedId, teamName); 
         console.log(jsonData);
         myTable = $('#myTable').DataTable({
             data: jsonData,
             columns: columnsTable
         });
    });

});

 function callTeams(teamSelectedId){

    $('#select-team').html('');

    $.ajax({
        url: "http://api.football-data.org/v2/competitions/"+teamSelectedId+"/teams",
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('X-Auth-Token', '9273f2c112b641c997a94f444da1f51c');},
        success: function(data) { 
            
            var teams = data.teams;
            $.each(teams, function(index, team){
                $('#select-team').append('<option value="'+team.id+'">'+team.name+'</option>');
            });
            $('#select-team').selectpicker('refresh');

        }
    });
 
 }
 
 function callTeam(teamId, teamName){
    var json = [];
     $.ajax({
         url: "http://api.football-data.org//v2/teams/"+teamId+"/matches/",
         type: "GET",
         beforeSend: function(xhr){xhr.setRequestHeader('X-Auth-Token', '9273f2c112b641c997a94f444da1f51c');},
         success: function(data) { 
            
            var dataAjax = data.matches;
            $('#tbody').html('');
            $.each(dataAjax, function(index, match){

                var date = moment(match.utcDate).format('DD-MM-YYYY, h:mm A');

                if (match.homeTeam.name == teamName) {
                    var item = {};
                    item["name"] = match.awayTeam.name;
                    item["status"] = match.status;
                    item["date"] = date;
                    item["competition"] = match.competition.name;
                }else{
                    var item = {};
                    item["name"]  = match.homeTeam.name;
                    item["status"] = match.status;
                    item["date"] = date;
                    item["competition"] = match.competition.name;
                }

                json.push(item);

            });
            
         }
     });
     
     return json;
 }


 
 
 
 
