apk add vim

# Create application
if [ "$BUILD_TYPE" = "Setup" ];
then
    yarn add react-router-dom
    yarn add axios
    yarn add class-validator
    yarn add bcryptjs
    yarn add socket.io-client
fi

if [ "$BUILD_TYPE" = "Production" ];
then
    # For start in prod
    yarn global add serve

    yarn build
    serve -s build

else
    yarn start
fi
