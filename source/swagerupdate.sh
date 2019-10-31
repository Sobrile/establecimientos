SERVER="10.9.10.22"
node_modules/.bin/ng-swagger-gen -i http://$SERVER/v2/api-docs
cp -f src/app/api/services/* src/services
cp -f src/app/api/models/* src/models
rm -frv src/app/api
