import { getSession, session, useSession } from "next-auth/client"
import db from "../../firebase";
import Header from "../components/Header"
import Order from "../components/Order";
import moment from "moment";

function orders({orders}) {
    const [session]=useSession();
    return (
        <div>
            <Header />
            <main className="max-w-screen-lg mx-auto p-10">
                <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">Your Orders</h1>
                {session ? (
                    <h2>{orders.length} orders</h2>
                ) : (
                    <h2>Please signin to see your orders</h2>
                )
                }
                <div className="mt-5 space-y-4 ">
                {orders?.map(({id,amount,amount_shipping,items,timestamp,images})=>(
                    <Order 
                    key={id}
                    id={id}
                    amount={amount}
                    amountShipping={amount_shipping}
                    items={items}
                    timestamp={timestamp}
                    images={images}
                     />
                ))}
                </div>
            </main>
        </div>
    )
}

export default orders;
export async function getServerSideProps(context){
    const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)
    // Get user logged in credentials
    const session= await getSession(context);
    if(!session){
        return{
            props:{},
        }
    }
    //firebase db
    const stripeOrders=await db.collection('users').doc(session.user.email).collection('orders').orderBy('timestamp','desc').get();
    // Stripe orders
    const orders= await Promise.all(
        stripeOrders.docs.map(async(order)=>({
            id: order.id,
            amount: order.data().amount,
            amount_shipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            items:(
                await stripe.checkout.sessions.listLineItems(order.id,{
                    limit:100
                })).data,
        

        }))
    );
    return {
        props:{
            orders
        }
    }
}
