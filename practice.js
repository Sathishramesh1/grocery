const arr=[1,2,3,4];


// using the division operator
const product=arr.reduce((acc,curr)=>acc*curr,1);

const ans=new Array(arr.length).fill(product);


for(let i=0;i<arr.length;i++){
    ans[i]=ans[i]/arr[i];
}

// console.log(ans);


const output=new Array(arr.length).fill(0);


let prefix=1;

for(let i=0;i<arr.length;i++){
   output[i]=prefix;
   prefix=prefix*arr[i];

}


let  suffix=1;

for (let i=output.length-1;i>=0;i--){
  
    

}