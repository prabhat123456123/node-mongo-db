const {port} = require("./src/config")
const {app} = require("./src/app")
const {database} = require("./src/config/db")
async function bootstrap() {
    try {
        await database.authenticate().then((x) => {
            console.log("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
            app.listen(`${port}`, () => {
                console.log("server is running at this port");
            })
        }).catch((err) => {
            console.log(err)
        })
    } catch (error) {
        console.log(error);
    }
}

bootstrap();