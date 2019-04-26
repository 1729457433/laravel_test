<?php
interface ContainerInterface{
    function bind(string $abstract,$concrete);
    function make(string $abstract, $parameters = []);
}

class Container implements ContainerInterface{
    /**
     * 匿名构造器合集
     * @var
     */
    protected $binds;

    /**
     * 构造器实例集合
     * @var
     */
    protected $instances;

    /**
     * 绑定构造器到容器指定位置
     * @param string $abstract 构造器名称
     * @param string|Closure  $concrete 构造器
     */
    public function bind(string $abstract,$concrete){
        if($concrete instanceof Closure){
            $this->binds[$abstract] = $concrete;
        }else{
            $this->instances[$abstract] = $concrete;
        }
    }

    /**
     * @param string $abstract
     * @param array $parameters
     * @return object
     */
    public function make(string $abstract, $parameters = []){
        if(isset($this->instances[$abstract])){
            return $this->instances[$abstract];
        }

        array_unshift($parameters, $this);

        return call_user_func_array($this->binds[$abstract],$parameters);
    }

}

interface AbleUse{
    /**
     * @return TreasureMapInterface
     */
    public function use();
}

interface TreasureMapInterface{

    /**
     * @return string
     */
    public function getAddress();

    /**
     * @return string
     */
    public function getSomething();
}

class TreasureMaps implements AbleUse {
    public $res;
    public function __construct(TreasureMapInterface $res){
        $this->res = $res;

    }

    /**
     * @return TreasureMapInterface
     */
    public function use(){
        return $this->res;
    }
}

class TreasureMapRes implements TreasureMapInterface{
    protected $address;
    protected $something;

    public function __construct($info){
        $this->address = $info['address'];
        $this->something = $info['something'];
    }

    public function getAddress(){
        return $this->address;
    }

    public function getSomething(){
        return $this->something;
    }
}

class player{
    public $article;

    public function __construct(AbleUse $article){
        $this->article = $article;
    }

    public function getAddress(){
        $res = $this->article->use();
        echo $res->getAddress();
    }
    public function getSomething(){
        $res = $this->article->use();
        echo $res->getSomething();
    }

}

$concrete = new Container();

$concrete->bind('player',function(ContainerInterface $concrete,$AbleUse,$TreasureMaps){
    return new player($concrete->make($AbleUse,$TreasureMaps));
});

$concrete->bind('AbleUse','TreasureMaps');

$concrete->bind('TreasureMaps',function(ContainerInterface $container,$TreasureMaps,$TreasureMapRes){
    return new TreasureMaps($container->make($TreasureMaps,$TreasureMapRes));
});

$concrete->bind('TreasureMapRes',function(ContainerInterface $container,$info){
    return new TreasureMapRes($info);
});

function getData($address,$something){
    $TreasureMapRes=[
        [
            'address'=>'藏宝图地址位于 '.$address,
            'something'=>$something
        ]
    ];
    $TreasureMaps = [
        'TreasureMapRes',
        $TreasureMapRes
    ];
    $data=[
        'TreasureMaps',
        $TreasureMaps
    ];
    return $data;
}
//
//$x=$concrete->make('AbleUse');
//var_dump($x);
//$x=$concrete->make('player',getData('傲来国 31.62','恭喜，你好像得到了点什么。'));
//$x->getAddress();
//echo <<<str
//
//
//str;
//$x->getSomething();


//
//$a='a';
//$b='b';
//$c=compact('a','b');
//var_dump($c)



class Ioc
{
    public $binding = [];
    public function bind($abstract, $concrete)
    {
        if (!$concrete instanceof Closure) {
            $concrete = function ($ioc) use ($concrete) {
                return $ioc->build($concrete);
            };
        }
        $this->binding[$abstract]['concrete'] = $concrete;
    }
    public function make($abstract)
    {
        $concrete = $this->binding[$abstract]['concrete'];
        return $concrete($this);
    }
    public function build($concrete) {
        try{
            $reflector = new ReflectionClass($concrete);
        }catch (\Exception $e){
            return false;
        }

        $constructor = $reflector->getConstructor();
        if(is_null($constructor)) {
            return $reflector->newInstance();
        }else {
            $dependencies = $constructor->getParameters();
            $instances = $this->getDependencies($dependencies);
            return $reflector->newInstanceArgs($instances);
        }
    }
    protected function getDependencies($paramters) {
        $dependencies = [];
        foreach ($paramters as $paramter) {
            $dependencies[] = $this->make($paramter->getClass()->name);
        }
        return $dependencies;
    }
}
interface log
{
    public function write();
}
// 文件记录日志
class FileLog implements Log
{
    public function write(){
        echo 'file log write...';
    }
}
// 数据库记录日志
class DatabaseLog implements Log
{
    public function write(){
        echo 'database log write...';
    }
}
class User
{
    protected $log;
    public function __construct(Log $log)
    {
        $this->log = $log;
    }
    public function login()
    {
        // 登录成功，记录登录日志
        echo 'login success...';
        $this->log->write();
    }
}
//实例化IoC容器
$ioc = new Ioc();
$ioc->bind('log','FileLog');
$ioc->bind('user','User');
$user = $ioc->make('user');
$user->login();
exit;