/**
 * Created by tomasz on 22.10.2016.
 */
cmsx.controller('CalendarController', function ($scope, $rootScope, $http, $compile, $timeout, uiCalendarConfig) {

    /**
     * event
     * @type {{date: string, title: string, description: string, calendar_event_category_id: number}}
     */
    $scope.event = {
        date: '',
        title: '',
        description: '',
        calendar_event_category_id: ''
    };

    /**
     * errors
     * @type {{event: {title: string}}}
     */
    $scope.errors = {
        event : {
            title: ''
        }
    };

    /**
     * overlay
     * @type {boolean}
     */
    $scope.overlay = false;

    /**
     * events
     * @type {*[]}
     */
    $scope.events = [];

    /**
     * event_selected
     * @type {{}}
     */
    $scope.event_selected = {};

    /**
     * event_categories
     * @type {Array}
     */
    $scope.event_categories = [];

    /**
     * init method
     */
    $scope.init = function () {
        $scope.getEventsCategories();
    };

    /**
     * showEventModal method
     */
    $scope.showEventModal = function () {
        $('#EventModal').openModal();
    };

    /**
     * removeEvent method
     * @param id
     */
    $scope.removeEvent = function (id) {
        var config = {};
        $scope.overlay = true;
        $http.delete('/admin/calendar-events/' + id, config).then(function (resp) {
            console.log(resp);
            for(var e in $scope.events) {
                if($scope.events[e].id == id) {
                    $scope.events.splice(e, 1);
                }
            }
            $scope.overlay = false;
        });
    };

    /**
     * updateEvent method
     * @param id
     * @param start
     */
    $scope.updateEvent = function (id, start) {
        var config = {};
        var data = {
            id: id,
            event_date: start
        };
        $scope.overlay = true;
        $http.put('/admin/calendar-events/' + id, data, config).then(function (resp) {
            console.log(resp);
            $scope.overlay = false;
        });
    };

    /**
     * saveEvent method
     */
    $scope.saveEvent = function () {
        console.log('SaveEvent');
        var errors = false;
        if($scope.event.title.length == 0) {
            errors = true;
            $scope.errors.event.title = 'Proszę podać tytuł';
        } else {
            $scope.errors.event.title = '';
        }

        $scope.event.calendar_event_category_id = $scope.event.calendar_event_category_id.id;

        if(!errors) {
            $scope.overlay = true;
            var config = {};
            var data = $scope.event;
            $http.post('/admin/calendar-events', data, config).then(function (resp) {
                if(resp.data.success) {
                    $scope.event.event_date = $scope.event.date;
                    if($scope.event.calendar_event_category_id) {
                        var category = undefined;
                        for(var c in $scope.event_categories) {
                            if($scope.event_categories[c].id == $scope.event.calendar_event_category_id) {
                                category = $scope.event_categories[c];
                            }
                        }
                        if(category.color != null) {
                            $scope.event.backgroundColor = category.color;
                            $scope.event.borderColor = category.color;
                        }
                    }
                    $scope.events.push($scope.event);
                    $scope.event = {
                        date: '',
                        title: '',
                        description: '',
                        calendar_event_category_id: ''
                    };
                    $timeout(function () {
                        $scope.overlay = false;
                        Materialize.toast('Zadanie zostało zapisane', 5000);
                        $('#EventModal').closeModal();
                    });
                } else {
                    $scope.overlay = false;
                }
            });
        }
    };

    /**
     * getEvents method
     * @param start
     * @param end
     */
    $scope.getEvents = function (start, end) {
        $scope.overlay = true;
        var config = {
            params: {}
        };
        if(start != undefined && end != undefined) {
            config.params.start = start;
            config.params.end = end;
        }
        console.log(config);
        $http.get('/admin/calendar-events', config).then(function (resp) {
            console.log(resp);
            var events = resp.data.events;

            for(var event in events) {
                events[event].start = events[event].event_date;
                if(events[event].category != null && events[event].category.color != null) {
                    events[event].backgroundColor = events[event].category.color;
                    events[event].borderColor = events[event].category.color;
                }
                $scope.events.push(events[event]);
            }
            $scope.overlay = false;
        });
    };

    /**
     * getEventsCategories method
     */
    $scope.getEventsCategories = function () {
        $http.get('/api/calendar-event-category').then(function (resp) {
            console.log(resp);
            $scope.event_categories = resp.data.event_categories;
            $timeout(function () {
                $('select').material_select();
            }, 1000);
        });
    };

    /**
     * alertDayOnClick method
     * @param date
     * @param allDay
     * @param jsEvent
     * @param view
     */
    $scope.alertDayOnClick = function (date,allDay,jsEvent, view) {
        console.log('DayOnClick');
        $scope.event.date = date.format();
        $scope.showEventModal();
    };

    /**
     * alertOnEventClick method
     * @param date
     * @param jsEvent
     * @param view
     */
    $scope.alertOnEventClick = function( date, jsEvent, view){
        console.log('EventClick');
        console.log(date);
        $scope.event_selected = date;
        $('#EventShowModal').openModal();
    };

    /**
     * alertOnDrop method
     * @param event
     * @param delta
     * @param revertFunc
     * @param jsEvent
     * @param ui
     * @param view
     */
    $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
        var id = event.id;
        var start = event.start._d;
        $scope.updateEvent(id, start);
    };

    /**
     * alertOnResize method
     * @param event
     * @param delta
     * @param revertFunc
     * @param jsEvent
     * @param ui
     * @param view
     */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
        $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };

    /**
     * changeView method
     * @param view
     * @param calendar
     */
    $scope.changeView = function(view,calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };

    /**
     * renderCalender method
     * @param calendar
     */
    $scope.renderCalender = function(calendar) {
        if(uiCalendarConfig.calendars[calendar]){
            uiCalendarConfig.calendars[calendar].fullCalendar('render');
        }
    };

    /**
     * eventRender method
     * @param event
     * @param element
     * @param view
     */
    $scope.eventRender = function( event, element, view ) {
        element.attr({'tooltip': event.title,
            'tooltip-append-to-body': true});
        $compile(element)($scope);
    };

    /**
     * uiConfig
     * @type {}
     */
    $scope.uiConfig = {
        calendar:{
            height: 550,
            editable: true,
            lang: 'pl',
            header:{
                left: 'title',
                center: '',
                right: 'today prev,next'
            },
            eventClick: $scope.alertOnEventClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize,
            eventRender: $scope.eventRender,
            dayClick: $scope.alertDayOnClick,
            viewRender: function(view, element) {
                var start = view.start._d;
                var end = view.end._d
                $scope.overlay = true;
                $scope.getEvents(start, end);
            }
        }
    };

    /**
     * eventSources
     * @type {*[]}
     */
    $scope.eventSources = [$scope.events];

});