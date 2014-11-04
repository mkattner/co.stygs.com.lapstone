#!/bin/bash
if [ -n "$1" ]
    then

        echo "---- cordova-app location: $1"

        sudo chmod -R 7777 $1
        mkdir $1www/js/

# 1 Plugin operations

        # create plugin folder in app project
        echo "---- plugin folder:"
        mkdir $1www/js/plugin/
        ls $1www/js/plugin/

        # remove all js files in app plugin folder
        echo "----remove *.js files"
        rm $1www/js/plugin/*.js

        echo "---- plain plugin folder:"
        ls $1www/js/plugin/

        # copy js files from lapstone to app project
        echo "---- copy plugin *.js files"
        cp -a ./www/js/plugin/*.js $1/www/js/plugin/

        echo "---- plugin folder after copying new files"
        ls $1www/js/plugin/


# 2 page operations

        # create page folder in app project
        echo "---- page folder:"
        mkdir $1www/js/page/
        ls $1www/js/page/

        echo "---- copy page *.js files"
        cp -an ./www/js/page/*.js $1/www/js/page/
        cp ./www/js/page/pages.js $1/www/js/page/

        echo "---- page folder after copying new files"
        ls $1www/js/page/


        mkdir $1www/page/
        cp -an ./www/page/* $1/www/page/

# 3 ext folder

        echo "---- copy ext"
        mkdir $1www/ext/
        cp -an ./www/ext/* $1/www/ext/

# 4 files folder

        echo "---- copy files"
        mkdir $1www/files/
        cp -an ./www/files/* $1/www/files/


# 5 template folder

        mkdir $1www/template/
        cp -an ./www/template/* $1/www/template/

# x css folder

        mkdir $1www/css/
        cp -an ./www/css/* $1/www/css/

# x files folder

        mkdir $1www/files/
        cp -an ./www/files/* $1/www/files/

# 6 root page

        cp ./www/index.html $1/www/index.html

# ????

        cp -an ./www/js/plugin/*.json $1/www/js/plugin/
        cp -an ./www/js/page/*.json $1/www/js/page/

# x framework operations

        echo "---- copy lapstone.js"
        cp ./www/js/lapstone.js $1/www/js/
        cp -n ./www/js/lapstone.json $1/www/js/

# x copy minifyer

        echo "---- copy minifyer"
        ls ./
        cp ./_minifyer.sh $1/www/js/

# x minify page
        cd $1/www/js/page
        ../_minifyer.sh page.min
# x minify plugin
        cd $1/www/js/plugin
        ../_minifyer.sh plugin.min




        sudo chmod -R 7777 $1

        echo "---- build the cordova project for  platforms"
       cd $1
       cordova build $2
    else
        echo "Parameter error: script needs the location of your cordova app as a parameter"
fi

#rm ./www/js/plugin/*.js