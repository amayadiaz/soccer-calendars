$(document).ready(function(){

    $('#btnSearch').on('click', function(){
         var teamSelectedId = $('#select-teams').val();
         callTeams(teamSelectedId);  
    });

    $('#teams-list').on('click', '.btn-team', function(){
        var teamId = $(this).attr('id');
        var teamName = $(this).text();
        callTeam(teamId, teamName);  
    });

});

 function callTeams(teamSelectedId){
    $('#teams-list').html('');
     $.ajax({
         url: "http://api.football-data.org/v2/competitions/"+teamSelectedId+"/teams",
         type: "GET",
         beforeSend: function(xhr){xhr.setRequestHeader('X-Auth-Token', '9273f2c112b641c997a94f444da1f51c');},
         success: function(data) { 
             
             var teams = data.teams;
             $.each(teams, function(index, team){
                 $('#teams-list').append('<div class="col-md-3"><button id='+team.id+' type="button" class="btn btn-primary btn-team" data-toggle="modal" data-target="#exampleModal">'+team.name+'</button></div>');
             });
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
            $('#tbody').html('');
            $('.modal-title').html('');
            $('.modal-title').append(teamName + ' Calendar');
            $.each(matches, function(index, match){
                if (match.homeTeam.name == teamName) {
                    $('#tbody').append('<tr><th>'+index+'</th><td>'+match.awayTeam.name+'</td><td>'+match.utcDate+'</td><td>'+match.status+'</td></tr>');
                }else{
                    $('#tbody').append('<tr><th>'+index+'</th><td>'+match.homeTeam.name+'</td><td>'+match.utcDate+'</td><td>'+match.status+'</td></tr>');
                }
            });
             
         }
     });
 }
 
 
 
 
