$(function(){
    $('.button-collapse').sideNav();
    $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            belowOrigin: true
        }
    );
    $('select').material_select();
    $('ul.tabs').tabs();
    $('.modal-trigger').leanModal();

    $('.button-collapse-user').sideNav({
            menuWidth: 300,
            edge: 'right',
            closeOnClick: true,
            draggable: true
        }
    );
});

/**
 *
 * @param type string 'insertAfter' or 'insertBefore'
 * @param entityName
 * @param id
 * @param positionId
 */
var changePosition = function(requestData){
    $.ajax({
        'url': '/sort',
        'type': 'POST',
        'data': requestData,
        'success': function(data) {
            if (data.success) {
                console.log('Saved!');
            } else {
                console.error(data.errors);
            }
        },
        'error': function(){
            console.error('Something wrong!');
        }
    });
};

$(document).ready(function(){
    var $sortableTable = $('.sortable');
    if ($sortableTable.length > 0) {
        $sortableTable.sortable({
            handle: '.sortable-handle',
            axis: 'y',
            update: function(a, b){

                var entityName = $(this).data('entityname');
                var $sorted = b.item;

                var $previous = $sorted.prev();
                var $next = $sorted.next();

                if ($previous.length > 0) {
                    changePosition({
                        parentId: $sorted.data('parentid'),
                        type: 'moveAfter',
                        entityName: entityName,
                        id: $sorted.data('itemid'),
                        positionEntityId: $previous.data('itemid')
                    });
                } else if ($next.length > 0) {
                    changePosition({
                        parentId: $sorted.data('parentid'),
                        type: 'moveBefore',
                        entityName: entityName,
                        id: $sorted.data('itemid'),
                        positionEntityId: $next.data('itemid')
                    });
                } else {
                    console.error('Something wrong!');
                }
            },
            cursor: "move"
        });
    }

    $('#ChangePaginationLimit').change(function () {
        $.ajax({
            'url': '/api/pagination-limit',
            'type': 'POST',
            'data': {
                limit: $(this).val(),
                controller: $(this).data('controller')
            },
            'success': function(data) {
                if (data.success) {
                    console.log('Saved!');
                    window.location = window.location;
                } else {
                    console.error(data.errors);
                }
            },
            'error': function(){
                console.error('Something wrong!');
            }
        });
    });
});
