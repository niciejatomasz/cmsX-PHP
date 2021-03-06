@extends('layouts.admin')

@section('content')
    <div class="col s12">
        <header class="row navigation-row">
            <div class="col s6">
                <h1>Zdjęcia w tle</h1>
            </div>
            <div class="col s6">
{{--                <a href="{{ url('/admin/paralax/create') }}" class="waves-effect waves-light btn right" title="Dodaj nowy wpis"><i class="fa fa-plus"></i></a>--}}
            </div>
        </header>
        <div class="row">
            <div class="col s12 m12">
                <div class="card">
                    <div class="card__header">
                        <span>Lista wpisów</span>
                    </div>
                    <div class="card-content">
                        <table class="responsive-table bordered striped highlight">
                            <thead>
                            <tr>
                                <th class="center"> # </th>
                                <th> Nazwa </th>
                                <th> Plik </th>
                                <th> Nazwa kodowa </th>
                                <th>Akcje</th>
                            </tr>
                            </thead>
                            <tbody>
                            @foreach($paralax as $item)
                                <tr>
                                    <td>{{ $loop->iteration }}</td>
                                    <td>{{ $item->title }}</td>
                                    <td>
                                        <img class="paralax-image-small" src="/files/thumb/paralax/100x100_{{ $item->file }}" />
                                    </td>
                                    <td>{{ $item->codename }}</td>
                                    <td>
                                        <a href="{{ url('/admin/paralax/' . $item->id) }}" class="waves-effect waves-light btn"
                                           title="Zobacz"><i class="fa fa-folder-open"></i></a>
                                        <a href="{{ url('/admin/paralax/' . $item->id . '/edit') }}" class="waves-effect waves-light btn"
                                           title="Edycja"><i class="fa fa-edit"></i></a>
                                        {{--{!! Form::open([--}}
                                            {{--'method'=>'DELETE',--}}
                                            {{--'url' => ['/admin/paralax', $item->id],--}}
                                            {{--'style' => 'display:inline'--}}
                                        {{--]) !!}--}}
                                        {{--{!! Form::button('<i class="fa fa-trash"></i>', array(--}}
                                                {{--'type' => 'submit',--}}
                                                {{--'class' => 'waves-effect waves-light btn',--}}
                                                {{--'title' => 'Usuń wpis',--}}
                                                {{--'onclick'=>'return confirm("Czy na pewno usunąć?")'--}}
                                        {{--)) !!}--}}
                                        {{--{!! Form::close() !!}--}}
                                    </td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>

                        @include('admin.partials.form.pagination', ['items' => $paralax])

                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection