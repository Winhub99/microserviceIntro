/* 
import {ServiceBroker} from 'moleculer'

const broker = new ServiceBroker() ;

broker.createService({
    name:"greeter",
    actions:{
        sayHello(ctx){
            return `Hello ${ctx.params.name}`
        }
    }
})

async function startApp(){
    await broker.start();
    const res = await broker.call("greeter.sayHello",{name:"Nilansh"})
    console.log(res)
    broker.stop()
}

startApp();
*/

import UserService from "./services/user.service.js"
import EmailService from "./services/email.service.js"
import AuthService from "./services/auth.service.js"

async function startApp(){
    await UserService.start();
    await EmailService.start();
    await AuthService.start();

    try{
        //simulate user creation
        const newUser= await UserService.call("user.createUser",{username:"Manny",email:"man@paq.com"})
        console.log("New User created: ",newUser);
        const users = await UserService.call("user.getUsers")
        console.log("All users are: ",users)

        //simulating sending email
        const emailResult = await EmailService.call("email.sendEmail",{recipient:newUser.email,subject:"Welcome to our platform",content:"Thanks for signing up with us!"})
        console.log(emailResult)

        //simulating auth service
        const authResult = await AuthService.call("auth.authUser",{username:"admin",password:"password"})
        console.log(`authorization ${authResult.success?"successfull":"failed "} ${authResult.message}`)
    }catch(error){
        console.log(error)
    }finally{
        await UserService.stop()
        await EmailService.stop()
        await AuthService.stop()
    }
}

startApp()