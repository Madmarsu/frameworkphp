<!doctype html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Real-time | {{ config('app.name') }}</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

        <!-- Styles -->
        <link href="{{ mix('css/app.css', 'assets') }}" rel="stylesheet" type="text/css" media="all" />
    </head>
    <body id="app">
        <div class="flex-center position-ref full-height">
            @if (Route::has('login'))
                <div class="top-right links">
                    @if (Auth::check())
                        <a href="{{ url('/home') }}">Home</a>
                    @else
                        <a href="{{ url('/login') }}">Login</a>
                        <a href="{{ url('/register') }}">Register</a>
                    @endif
                </div>
            @endif

            <div class="content">
                <div class="title m-b-md">
                    Real-time
                </div>

                <div class="links">
                    <a href="{{ route('app.index') }}">Front-page</a>
                </div>
            </div>
        </div>
        <section id="sectionBody">
            <h1>Real-time communication</h1>

            <example></example>

        </section>
        <script src="{{ asset('assets/js/app.js') }}"></script>
    </body>
</html>
