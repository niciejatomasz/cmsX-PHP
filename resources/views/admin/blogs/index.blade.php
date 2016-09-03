@extends('layouts.admin')

@section('content')

{{--<script src="/dashboard/js/controllers/blogs.js"></script>--}}

<div class="col s12">
    <header class="row">
        <div class="col s12">
            <h1>Blog <a href="{{ url('/admin/blogs/create') }}" class="btn btn-primary btn-xs" title="Dodaj nowy wpis"><i class="fa fa-plus"></i></a></h1>
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
                            <th> Tytuł </th>
                            <th> Treść </th>
                            <th class="center"> Aktywny </th>
                            <th> Akcje </th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($blogs as $item)
                            <tr>
                                <td class="center">{{ $loop->iteration }}</td>
                                <td>{{ $item->title }}</td>
                                <td>{{ str_limit($item->content, 64, '...') }}</td>
                                <td class="center">
                                    @if ($item->active === 1)
                                        <span class="new badge blue" data-badge-caption="">Tak</span>
                                    @else
                                        <span class="new badge red" data-badge-caption="">Nie</span>
                                    @endif
                                </td>
                                <td>
                                    <a href="{{ url('/admin/blogs/' . $item->id) }}" class="btn btn-success btn-xs" title="Zobacz"><i class="fa fa-folder-open"></i></a>
                                    <a href="{{ url('/admin/blogs/' . $item->id . '/edit') }}" class="btn btn-primary btn-xs" title="Edycja"><i class="fa fa-edit"></i></a>
                                    {!! Form::open([
                                        'method'=>'DELETE',
                                        'url' => ['/admin/blogs', $item->id],
                                        'style' => 'display:inline'
                                    ]) !!}
                                    {!! Form::button('<i class="fa fa-trash"></i>', array(
                                            'type' => 'submit',
                                            'class' => 'btn btn-danger btn-xs',
                                            'title' => 'Usuń',
                                            'onclick'=>'return confirm("Potwierdź usunięcie?")'
                                    )) !!}
                                    {!! Form::close() !!}
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                    <div class="pagination-wrapper"> {!! $blogs->render() !!} </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection