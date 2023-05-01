apk add vim 

yarn global add @nestjs/cli

# Create application
if [ "$BUILD_TYPE" = "Setup" ]; 
then 
	yarn install
	yarn add @nestjs/typeorm typeorm mysql
	yarn add bcrypt @types/bcrypt
	# yarn add @nestjs/jwt passport-jwt @types/passport-jwt
	yarn add  @nestjs/schedule @types/cron
	yarn add @nestjs/websockets @nestjs/platform-socket.io
	yarn add nodemailer @types/nodemailer googleapis
	yarn add unique-username-generator
	yarn add randomstring @types/randomstring
fi

# Use tsc: compile ts to js
# yarn build
# yarn typeorm migration:run

if [ "$BUILD_TYPE" = "Production" ]; 
then 
	# For start in prod
	yarn start

else 
	yarn start:dev
fi
