
// LOADER <div class="lds-ripple"><div></div><div></div></div>

$(document).ready(function(){

   $('#myTable').DataTable({
       "ordering" : false,
   });

   $('#select-league').on('change', function(){
        var teamSelectedId = $('#select-league').val();
        callTeams(teamSelectedId);  
   });

    $('#btnSearch').on('click', function(){
         var teamSelectedId = $('#select-team').val();
         var teamName = $('#select-team option:selected').text();
         callTeam(teamSelectedId, teamName); 
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
            

            $('#myTable').DataTable().clear().draw();

            var matches = data.matches;


            $.each(matches, function(index, match){


                var date = moment(match.utcDate).format('DD-MM-YYYY, h:mm A');

                if (match.homeTeam.name == teamName) {
                    
                    $('#myTable').dataTable().fnAddData( [match.awayTeam.name, date, match.status, match.competition.name] );
                   
                }else{

                    $('#myTable').dataTable().fnAddData( [match.homeTeam.name, date, match.status, match.competition.name] );
                }

            });
            
         }
     });
     
 }


 
 
 
 
