<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Authentication(认证) Defaults
    |--------------------------------------------------------------------------
    |
    | This option controls the default authentication "guard" and password
    | reset options for your application. You may change these defaults
    | as required, but they're a perfect start for most applications.
    |此选项控制默认身份验证“guard”和密码
    |重置您的应用程序的选项。您可以更改这些默认值
    |根据需要，但它们是大多数应用程序的完美开端。
    |
    */

    'defaults' => [
        'guard' => 'web',
        'passwords' => 'users',
    ],

    /*
    |--------------------------------------------------------------------------
    | Authentication Guards
    |--------------------------------------------------------------------------
    |
    | Next, you may define every authentication guard for your application.
    | 接下来，您可以为应用程序定义每个身份验证保护。
    | Of course, a great default configuration has been defined for you here which uses session storage and the Eloquent user provider.
    | 当然，这里为您定义了一个很好的默认配置，它使用会话存储和Eloquent用户提供程序。
    |
    | All authentication drivers have a user provider（提供商）.
    | This defines how the users are actually retrieved out of your database or other storage mechanisms used by this application to persist your user's data.
    | 这定义了如何从数据库或此应用程序使用的其他存储机制中实际检索用户以保留用户数据。
    | Supported(支持): "session", "token"
    |
    */

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        'api' => [
            'driver' => 'token',
            'provider' => 'users',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | User Providers
    |--------------------------------------------------------------------------
    |
    | All authentication drivers have a user provider. This defines how the
    | users are actually retrieved out of your database or other storage（存储）
    | mechanisms（机制） used by this application to persist your user's data.
    |
    | If you have multiple user tables or models you may configure multiple
    | sources which represent（代表） each model / table. These sources may then
    | be assigned（分配） to any extra（额外） authentication guards you have defined.
    |
    | Supported: "database", "eloquent"
    |
    */

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\User::class,
        ],

        // 'users' => [
        //     'driver' => 'database',
        //     'table' => 'users',
        // ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Resetting Passwords
    |--------------------------------------------------------------------------
    |
    | You may specify multiple password reset configurations if you have more
    | than one user table or model in the application and you want to have
    | separate password reset settings based on the specific user types.
    |
    | The expire time is the number of minutes that the reset token should be
    | considered valid. This security feature keeps tokens short-lived so
    | they have less time to be guessed. You may change this as needed.
    |
    */

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_resets',
            'expire' => 60,
        ],
    ],

];
