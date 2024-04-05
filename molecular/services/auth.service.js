import { ServiceBroker} from 'moleculer'

const broker = new ServiceBroker();

broker.createService({
    name:"auth",
    actions:{
        authUser(ctx){
            const {username,password} = ctx.params;
            if(username==="admin", password ==="password"){
                return{
                    success: true,
                    message:" Auth was successfull"
                }
            }else{
                return{
                    success:false,
                    message:"Auth failed"
                }
            }
        }
    }
})

export default broker;