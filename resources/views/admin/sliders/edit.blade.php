@extends('layouts.admin')

@section('content')

    <div class="col s12">
        <header class="row">
            <div class="col s12">
                <h1>Baner</h1>
            </div>
        </header>

        {!! Form::model($slider, ['method' => 'PATCH', 'url' => ['/admin/sliders', $slider->id], 'class' => 'col s12', 'files' => true]) !!}
        <div class="row">
            <div class="col s12">
                <ul class="tabs">
                    <li class="tab col s3"><a class="active" href="#contentTab">Treść</a></li>
                </ul>
            </div>
            <div id="contentTab" class="col s12">
                <div class="card">
                    <div class="card__header">
                        <span>Treść</span>
                    </div>
                    <div class="card-content">
                        <div class="row">
                            <div class="input-field col s12 m6 {{ $errors->has('title') ? 'has-error' : ''}}">
                                {!! $errors->first('title', '<p class="help-block">:message</p>') !!}
                                {!! Form::text('title', null, []) !!}
                                {!! Form::label('title', 'Tytuł', ['data-error' => 'wrong', 'data-success' => 'right']) !!}
                            </div>

                            <div class="input-field col s12 m6 {{ $errors->has('subtitle') ? 'has-error' : ''}}">
                                {!! $errors->first('subtitle', '<p class="help-block">:message</p>') !!}
                                {!! Form::text('subtitle', null, []) !!}
                                {!! Form::label('subtitle', 'Podtytuł', ['data-error' => 'wrong', 'data-success' => 'right']) !!}
                            </div>

                            <div class="input-field col s12 m6 {{ $errors->has('link') ? 'has-error' : ''}}">
                                {!! $errors->first('link', '<p class="help-block">:message</p>') !!}
                                {!! Form::text('link', null, []) !!}
                                {!! Form::label('link', 'Link', ['data-error' => 'wrong', 'data-success' => 'right']) !!}
                            </div>

                            @include('admin.partials.form.active')
                            @include('admin.partials.form.file')

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col s12 m12">
            <div class="pt20">
                {!! Form::submit('Edytuj', ['class' => 'waves-effect waves-light btn']) !!}
            </div>
        </div>
        @if ($errors->any())
            <ul class="col s12 alert alert-danger">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        @endif

        {!! Form::close() !!}
    </div>
@endsection