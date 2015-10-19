
#podyum ![travis](https://magnum.travis-ci.com/mateuszsikora/podyum.svg?token=ox35BYywF9zFqq7Kan8i&branch=develop)

![podyum](http://s4.postimg.org/oqvzbbd59/podyum.png)

##Instalation guide

To run The Podium in development environment you need to have following services in your system:git
 - node 0.12.x
 - mongodb 3.0.x
 - redis 2.8.x
 - npm
 - bower
 - grunt-cli
 - yeoman with angular-fullstack generator

Moreover npm need to build-essential to compile packages.

###1. Install packages:

 ```
  curl -sL https://deb.nodesource.com/setup | sudo bash -
  sudo apt-get install build-essential git mongodb-org redis-server nodejs
  sudo npm install -g yo grunt-cli bower generator-angular-fullstack
```

###2. Clone the repository:

```
  git clone git@github.com:mateuszsikora/podyum.git
```

###3. Install dependency:
When all packages are installed you should go into root directory and run following commands:

```
  npm install
  bower install
```

###4. Run project:

```
  grunt serve
```

Congratulations - you should see main page in your browser!
If you want to create some components like endpoint, route, directive, service, etc You should use yo with angular-fullstack generator. For example:

```
  yo angular-fullstack:directive my-directive 
```

More examples:
[angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack)
