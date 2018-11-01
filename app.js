
// LOADER <div class="lds-ripple"><div></div><div></div></div>

$(document).ready(function(){

   $('#myTable').DataTable({
       "ordering" : false,
       "columns": [
        { "width": "20%" },
        { "width": "20%" },
        null,
        null,
        { "width": "5%" },
        { "width": "5%" },
      ],
      "responsive": true,
   });

   $('#select-league').on('change', function(){
        var teamSelectedId = $('#select-league').val();
        callTeams(teamSelectedId);  
   });

    $('#btn-search').on('click', function(){
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

            console.log(matches);
            


            $.each(matches, function(index, match){


                var date = moment(match.utcDate).format('DD-MM-YYYY, h:mm A');
                if(match.score.fullTime.homeTeam==null && match.score.fullTime.awayTeam==null){
                    match.score.fullTime.homeTeam = 0;
                    match.score.fullTime.awayTeam = 0;
                }
                var score = match.score.fullTime.homeTeam + " - " + match.score.fullTime.awayTeam;

                if (match.homeTeam.name == teamName) {
                    
                    $('#myTable').dataTable().fnAddData( [match.awayTeam.name, date, match.status, match.competition.name, 'L', score] );
                   
                }else{

                    $('#myTable').dataTable().fnAddData( [match.homeTeam.name, date, match.status, match.competition.name, 'V', score] );
                    
                }

            });
            
         }
     });
     
 }


 
 
 
 
