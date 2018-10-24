
// LOADER <div class="lds-ripple"><div></div><div></div></div>

$(document).ready(function(){

    $('#select-league').on('change', function(){
        var teamSelectedId = $('#select-league').val();
        callTeams(teamSelectedId);  
   });

    $('#btnSearch').on('click', function(){
         var teamSelectedId = $('#select-team').val();
         var teamName = $('#select-team option:selected').text();
         callTeam(teamSelectedId, teamName);  
    });

    $('#myTable').DataTable({
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "pagingType": "full_numbers",
        "order": [[ 3, "desc" ]]
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
     $.ajax({
         url: "http://api.football-data.org//v2/teams/"+teamId+"/matches/",
         type: "GET",
         beforeSend: function(xhr){xhr.setRequestHeader('X-Auth-Token', '9273f2c112b641c997a94f444da1f51c');},
         success: function(data) { 
            var matches = data.matches;
            console.log(matches);
            $('#tbody').html('');
            $.each(matches, function(index, match){
                var date = moment(match.utcDate).format('DD-MM-YYYY, h:mm A');
                if (match.homeTeam.name == teamName) {
                    $('#tbody').append('<tr><td>'+index+'</td><td>'+match.awayTeam.name+'</td><td>'+date+'</td><td>'+match.status+'</td><td>'+match.competition.name+'</td></tr>');
                }else{
                    $('#tbody').append('<tr><td>'+index+'</td><td>'+match.homeTeam.name+'</td><td>'+date+'</td><td>'+match.status+'</td><td>'+match.competition.name+'</td></tr>');
                }
            });
             
         }
     });
 }
 
 
 
 
