$('form').submit(function(e){
  e.preventDefault();
    $.ajax({
      url:'do.njs',
      data:{'number':$('#num').val()},
      success:(data)=>{
        $('#failed').html(data);
        }
      });
    });

