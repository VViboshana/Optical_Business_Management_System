// const CartItems = require ("../ ");

// const getCartItems = async (req, res, next) => {

//     let cartItems;

//     try{
//         cartItems =  await CartItems.find();
//     }catch (err){
//         console.log(err);
//     }

//     if(!cartItems){
//         return res.status(404).json({message:"Items not found"});
//     }

//     return res.status(200).json({cartItems});
// };

// const addCartItems = async (req, res, next) => {
//     const{name,price,quantity}=req.body;

//     let cartItems;

//     try{
//         cartItems = new CartItems({name,price,quantity});
//         await cartItems.save();
//     }catch(err){
//         console.log(err);
//     }
//     if(!CartItems){
//         return res.status(404).json({message:"unable to add item"});
//     }
//     return res.status(200).json({cartItems});
// }

// const getById = async (req, res, next) => {
//     const id = req.params.id;

//     let item;

//     try{
//         item = await CartItems.findById(id);
//     }catch(err){
//         console.log(err);
//     }
//     if(!CartItems){
//         return res.status(404).json({message: "item not foound"});
//     }
//     return res.status(200).json({item});
// }

// exports.getCartItems = getCartItems;
// exports.addCartItems = addCartItems;
// exports.getById = getById;