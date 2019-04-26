<?php
namespace Illuminate\Support\Facades;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'LoginController@index');

Route::get('/admin', 'AdminController@index');

Route::get('/Login/gt','LoginController@gt')->name('login2');

//Auth::routes();
//
//Route::get('/home', 'HomeController@index')->name('home');
//
//Auth::routes();
//
//Route::get('/home', 'HomeController@index')->name('home');
//
//Auth::routes();
//
//Route::get('/home', 'HomeController@index')->name('home');
//
//Auth::routes();
//
//Route::get('/home', 'HomeController@index')->name('home');
//
//
//Route::pattern('version_id', '[0-9]+');
//Route::group(['prefix'=>'v{version_id}'],function ($router){
//    $router->any('/{module}/{controller?}/{action?}/{id?}',function() use ($router){
//        $version='V'.Route::input('version_id');
//        $module=Route::input('module');
//        $controller=Route::input('controller');
//        $action=Route::input('action');
//        $id=Route::input('id');
//        if(Route::has($controller)){
//            return redirect($controller);
//        }else{
//            $realcontroller="App\\Http\\ApiControllers\\".$version.'\\'.ucwords($module)."\\".ucwords($controller)."Controller";
//            if (!class_exists($realcontroller)){
//                return view('error.404');
//            }else{
//                $ctrl = \App::make($realcontroller);
//                if(method_exists($ctrl,$action)){
//                    return \App::call([$ctrl, $action],['id'=>$id]);
//                }elseif(method_exists($ctrl,$id)){
//                    return \App::call([$ctrl, $id],['action'=>$action]);
//                }else{
//                    $data=$_REQUEST;
//                    $data['id']=$id;
//                    $data['action']=$action;
//                    return \App::call([$ctrl, 'undefined'],['data'=>$data]);
//                }
//            }
//        }
//    });
//});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
