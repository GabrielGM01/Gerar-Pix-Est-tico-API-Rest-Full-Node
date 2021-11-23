const express = require('express');
const app = express();
const { PIX } = require('gpix/dist');
const bodyParser = require('body-parser');
app.use(bodyParser.json());




app.get('/', (req,res)=>{
    res.send('😎 funcionando')
});
app.post('/gerarpix', (req, res)  => {
  try {
    const {key, city, client, amount, description} = req.body;
    const code = gerarPixEstatico(client,city,key,amount,description);
    res.json({
        "Status":"Sucess",
        dados:{
            key:key,
            city:city,
            client:client,
            amount:amount,
            description:description
        },
        code:code
    });
  } catch(error){
      res.status(400).json({
          "Status":"Error",
          expect:{
              key:"Ex.07745648786",
              city:"Ex.Brasília",
              client:"Ex.Casas bahia",
              amount:"Ex.40,50",
              description:"Ex.Panela Branca de aço"
          }
      }
  );
  } 
})
app.listen(3000, ()=>{
    console.log('😎 Servidor online');
});



function gerarPixEstatico(name,city,key,amount,description){ 
    let amountFormat = amount.toString().replace(/[.]/g, '');
    let pix = PIX.static()
    .setReceiverName(name)
    .setReceiverCity(city)
    .setKey(key)
    .setAmount(parseFloat(amountFormat.replace(',','.')))
    .setDescription(description);
  return pix.getBRCode();
}
