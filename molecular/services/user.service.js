import {ServiceBroker} from "moleculer"

const broker = new ServiceBroker();

const users=[];

function generateId(){

    return Math.ceil(Math.random()*1000 + 1)
}

broker.createService({
    name:'user',
    actions:{
        createUser(ctx){
            const {username,email} = ctx.params;
            const newUser ={uid:generateId(),username,email}
            users.push(newUser)
            return newUser;
        },
        getUsers(){
            return users;
        }
    }
});

export default broker;

