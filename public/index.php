<?php

/**
 * Laravel - A PHP Framework For Web Artisans
 *
 * @package  Laravel
 * @author   Taylor Otwell <taylor@laravel.com>
 */
// 定义了laravel一个请求的开始时间
define('LARAVEL_START', microtime(true));

/*
|--------------------------------------------------------------------------
| Register The Auto Loader
|--------------------------------------------------------------------------
|
| Composer provides a convenient, automatically generated class loader for
| our application. We just need to utilize it! We'll simply require it
| into the script here so that we don't have to worry about manual
| loading any of our classes later on. It feels great to relax.
|
*/
// composer自动加载机制
require __DIR__.'/../vendor/autoload.php';

/*
|--------------------------------------------------------------------------
| Turn On The Lights
|--------------------------------------------------------------------------
|
| We need to illuminate PHP development, so let us turn on the lights.
| This bootstraps the framework and gets it ready for use, then it
| will load up this application so that we can run it and send
| the responses back to the browser and delight our users.
|
*/
//初始化服务容器（可以查看一下关于‘服务容器’的相关文档）
// 这句话你就可以理解laravel,在最开始引入了一个ioc容器。
$app = require_once __DIR__.'/../bootstrap/app.php';

// 打开__DIR__.'/../bootstrap/app.php';你会发现这段代码，绑定了Illuminate\Contracts\Http\Kernel::class，
// 这个你可以理解成之前我们所说的$ioc->bind();方法。
// $app->singleton(
//  Illuminate\Contracts\Http\Kernel::class,
//  App\Http\Kernel::class
// );


/*
|--------------------------------------------------------------------------
| Run The Application
|--------------------------------------------------------------------------
|
| Once we have the application, we can handle the incoming request
| through the kernel, and send the associated response back to
| the client's browser allowing them to enjoy the creative
| and wonderful application we have prepared for them.
| 一旦我们有了应用程序，我们就可以处理传入的请求
| 通过内核，并将相关的响应发送回去
| 客户端的浏览器允许他们享受创意
| 我们为他们准备的精彩应用。
|
*/
//通过服务容器生成一个kernel类的实例（Illuminate\Contracts\Http\Kernel实际上只是一个接口，真正生成的实例是App\Http\Kernel类，至于怎么把接口和类关联起来，查看Contracts相关文档）
// 这个相当于我们创建了Kernel::class的服务提供者
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

//运行Kernel类的handle方法，主要动作是运行middleware和启动URL相关的Contrller
// 获取一个 Request ，返回一个 Response。以把该内核想象作一个代表整个应用的大黑盒子，输入 HTTP 请求，返回 HTTP 响应。
$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

// 就是把我们服务器的结果返回给浏览器。
$response->send();

// 这个就是执行我们比较耗时的请求，
$kernel->terminate($request, $response);
