<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function __construct()
    {
//        $this->middleware('auth');
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function index(Request $request)
    {
        return view('login/index', ['title' => '用户登录']);

    }

    /**
     * 极验验证
     */
    public function gt()
    {
        $rnd1 = md5(rand(0, 100));
        $rnd2 = md5(rand(0, 100));
        $challenge = $rnd1 . substr($rnd2, 0, 2);
        $result = array(
            'success' => 0,
            'gt' => 'YourID',
            'challenge' => $challenge,
            'new_captcha' => 1
        );
        header('Content-Type:application/json; charset=utf-8');
        exit(json_encode($result));
    }

    public function postLogin(UserLoginRequest $req){
        //这里对传递过来得字段进行了处理 这个函数为我自己定义的函数 仅仅是为了演示用
        $identity = $this->generateLoginIdentity($req->input());
        $identity['password'] = $req->input('password');
        //验证用户账号密码
        if($this->auth->attempt($indentity)){
            //登录成功 记录用户登录时间和登录ip
            $user = User::where('id','=',$this->auth->user()->id)->first();
            // 触发一个事件
            event(new \App\Events\UserLogin($user,$req->ip()));
            //重定向到想要访问的页面
            return redirect()->intended('/');
        }
    }
}
