<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
<head>
	{{-- Viewport settings --}}
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>

	{{-- Security: CSFR Protection token --}}
	<meta name="_token" content="IRGckjNCP4PwojYq6vsEGJhDZfxsgqsN2bw70scH "/>

	{{-- Mobile application icons for iOS, Android and WindowsPhone --}}
	@if(FALSE) {{-- Temporarily disable --}}
	<link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
	<link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="manifest" href="/manifest.json">
	<meta name="msapplication-TileColor" content="#4EC8ED">
	<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
	<meta name="theme-color" content="#4EC8ED">
	@endif

	<title>@yield('title') | {{ config('app.name') }}</title>

	{{-- OpenGraph protocol's meta --}}
	<meta property="og:title" content=""/>
	<meta property="og:description" content=""/>
	<meta property="og:url" content="{{ url('/') }}"/>
	<meta property="og:image" content=""/>

	{{-- Stylesheets --}}
	<link href="{{ asset('assets/css/vendor.css') }}" rel="stylesheet" type="text/css" media="all"/>
	<link href="{{ asset('assets/css/template.css') }}" rel="stylesheet" type="text/css" media="all"/>

	{{-- Scripts --}}
	@yield('jshead')
</head>
<body>

<div class="container">

	<div class="masthead">
		<h3 class="text-muted">{{ config('app.name') }}</h3>
		<nav>
			<ul class="nav nav-justified">
				<li><a href="{{ route('app.index') }}">Intro</a></li>
				<li class="active"><a href="{{ route('chat.index') }}">Dashboard</a></li>
				<li><a href="{{ route('chat.index') }}">Real-time chat</a></li>
				@if (Route::has('login'))
					@if (Auth::check())
						<li><a href="{{ url('/home') }}">Home</a></li>
					@else
						<li><a href="{{ url('/login') }}">Login</a></li>
						<li><a href="{{ url('/register') }}">Register</a></li>
					@endif
				@endif
			</ul>
		</nav>
	</div>

	@include('templates._alert')

	<!-- Jumbotron -->
	<div class="jumbotron">
		<h1>@yield('title')</h1>
	</div>

	@yield('content')

	<footer class="footer">
		<p>&copy; 2016 {{ config('app.name') }}</p>
	</footer>

</div>

{{-- Scripts --}}
<script src="{{ asset('assets/js/vendor.js') }}"></script>
@yield('js')
</body>
</html>
