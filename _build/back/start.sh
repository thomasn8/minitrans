apk add vim 

yarn global add @nestjs/cli

# Create application
if [ "$BUILD_TYPE" = "Setup" ]; 
then 
	yarn install
	yarn add @nestjs/websockets @nestjs/platform-socket.io
fi

# Use tsc: compile ts to js
yarn build

if [ "$BUILD_TYPE" = "Production" ]; 
then 
	# For start in prod
	yarn start

else 
	yarn start:dev
fi
