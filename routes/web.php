<?php

/*
|--------------------------------------------------------------------------
| General routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
	return view('welcome');
})->name('app.index');

Route::get('/dashboard', function () {
	return view('pages.dashboard');
})->name('app.dashboard');

/*
|--------------------------------------------------------------------------
| Chat routes
|--------------------------------------------------------------------------
|
| Real-time chat with Laravel 5.4 and Vue.js
|
*/

Route::get('/chat', function () {
	return view('chat.index');
})->name('chat.index');
