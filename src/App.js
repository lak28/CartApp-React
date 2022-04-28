import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
// import * as firebase from "firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";





class App extends React.Component {

  constructor () {
    super();
    this.state = {
      products: [],
      loading:true,
    }
    this.db= firebase
               .firestore();
  }

  componentDidMount(){
  this.db
    .collection("products")
    .onSnapshot(snapshot => {
      const products = snapshot.docs.map((doc) => {
        const data = doc.data();
        data["id"] = doc.id;
        return data;
    
      });

      this.setState({ 
        products: products,
        loading:false
       });
    });

  }

/*function to add product from react to firebase
 addProduct=() =>{
   this.db
   .collection('products')
   .add({
     img:'',
     qty:2,
     price:100000,
     title:'Washing matchine'
   })
   .then((docRef) =>{
       console.log('product added as',docRef);
   })
   .catch((error)=>{
     console.log('Error',error);
   })
 }*/



  handleIncreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    // products[index].qty += 1;

    // this.setState({
    //   products
    // })
    const docRef=this.db.collection('products').doc(products[index].id);

    docRef
       .update({
         qty:products[index].qty + 1
       })
       .then(() =>{
         console.log('Product Updated');
       })
       .catch((error)=>{
         console.log('Error:',error);
       })

  }
  handleDecreaseQuantity = (product) => {
    console.log('Heyy please inc the qty of ', product);
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    // products[index].qty -= 1;

    // this.setState({
    //   products
    // })

    const docRef=this.db.collection('products').doc(products[index].id);

    docRef
        .update({
          qty:products[index].qty -1,
        })
        .then(()=>{
          console.log("quantity Updated");
        })
        .catch((error)=>{
          console.log('Error:',error);
        })
  }

  handleDeleteProduct = (id) => {
    const { products } = this.state;

    // const items = products.filter((item) => item.id !== id); // [{}]

    // this.setState({
    //   products: items
    // })

    const docRef=this.db.collection('products').doc(id);

    docRef
       .delete()
       .then(()=>{
         console.log("Deleted");
       })
       .catch((error)=>{
         console.log("Error:",error);
       })
  }

  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    })

    return count;
  }

  getCartTotal =() =>{
    const {products} =this.state;
    let total=0;
    products.forEach((product) =>{
      total=total+(product.qty*product.price);
    })
    return total;
  }

  addProduct(){

  }

  render () {
    const { products , loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        {/* <button style={{padding:'10px',fontSize:'20px',backgroundColor:'blue',color:'white'}} onClick={this.addProduct}>Add Product +</button> */}
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h1> Loading Products... </h1>}
        <div style={{fontWeight:'bolder',padding:'10px',fontSize:'20px',marginLeft:'40px'}} >TOTAL : Rs {this.getCartTotal()}</div>
      </div>
    );
  }
}

export default App;
