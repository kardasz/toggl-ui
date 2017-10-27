
(function () {
    $('input[name="api_token"]').change(function () {
        $.ajax({
            method: "GET",
            url: "/api/workspaces",
            data: {
                api_token: $('input[name="api_token"]').val()
            },
            dataType: "json",
        }).done(function( res ) {
            $('select[name="wid"]').html('');
            if (res.results) {
                for (var i = 0; i < res.results.length; i++) {
                    $('select[name="wid"]').append(
                        $('<option value="' + res.results[i].id + '">' + res.results[i].name + '</option>')
                    );
                }
                $('select[name="wid"]').change();
            }
        });
        return false;
    });

    $('select[name="wid"]').change(function(){
        $.ajax({
            method: "GET",
            url: "/api/projects",
            data: {
                api_token: $('input[name="api_token"]').val(),
                wid: $('select[name="wid"]').val()
            },
            dataType: "json",
        }).done(function( res ) {
            $('select[name="pid"]').html('');
            if (res.results) {
                for (var i = 0; i < res.results.length; i++) {
                    $('select[name="pid"]').append(
                        $('<option value="' + res.results[i].id + '">' + res.results[i].name + '</option>')
                    );
                }
            }
        });
    });

    $('button[type="submit"]').click(function () {
        $.ajax({
            method: "POST",
            url: "/api/add-entry",
            data: JSON.stringify({
                api_token: $('input[name="api_token"]').val(),
                pid: $('select[name="pid"]').val(),
                start: $('input[name="start"]').val(),
                end: $('input[name="end"]').val(),
                duration: $('input[name="duration"]').val(),
                description: $('input[name="description"]').val(),
                timezone: $('input[name="tz"]').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
        }).done(function( res ) {
            if (res && res.id) {
                $('[role="alert"]')
                    .removeClass('alert-success alert-danger')
                    .addClass('alert-success')
                    .text('Added!')
                    .removeClass('hide');
                ;
            } else {
                $('[role="alert"]')
                    .removeClass('alert-success alert-danger')
                    .addClass('alert-danger')
                    .text('Error!' + ((res.message) ? (' ' + res.message) : '' ))
                    .removeClass('hide');
                ;
            }
        });

        return false;
    });

    $('#entryStartDateGroup, #entryEndDateGroup').datetimepicker({
        format: 'YYYY-MM-DD HH:mm',
        showTodayButton: true,
    });
})();