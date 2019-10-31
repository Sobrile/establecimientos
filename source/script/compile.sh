#/opt/rh/rh-nodejs8/root/usr/bin/npm i
./node_modules/@angular/cli/bin/ng build $1 $2
mkdir front
VERSION=`cat src/environments/version.ts |grep version|awk '{print $2}'|cut -d '"' -f 2`
cp -frv dist/* front/
DATE=`date +"%d/%m:%H:%M"`
BRANCH=`git status|grep "branch"|cut -d " " -f4`
git add front
git commit -a -m "compilacion fecha $DATE version $VERSION"
#git push origin inspecciones
