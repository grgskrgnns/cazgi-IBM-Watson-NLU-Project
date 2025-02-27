const express = require('express');
const dotenv = require('dotenv')
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.api_key;
    let api_url = process.env.api_url;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2020-08-01',
    authenticator: new IamAuthenticator({
        apikey: api_key,
    }),
    serviceUrl: api_url,
    });

return naturalLanguageUnderstanding;
}

function analyze(analyzeParams,res) {
    let languageAnalyzer = getNLUInstance();

      
  languageAnalyzer.analyze(analyzeParams)
  .then(analysisResults => {
    res.send(JSON.stringify(analysisResults, null, 2));
  })
  .catch(err => {
    res.send(err.toString());
  });
    
  
}


const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {

       
    const analyzeParams = {
      url: req.query.url,
      features: {
        emotion: {},
        keywords: {},
      },
    }
    
    return analyze(analyzeParams,res);
});

app.get("/url/sentiment", (req,res) => {
    
    const analyzeParams = {
      url: req.query.url,
      features: {
        sentiment: {},
        keywords: {},
      },
    }
    
    return analyze(analyzeParams,res);
});

app.get("/text/emotion", (req,res) => {
    
    const analyzeParams = {
      text: req.query.text,
      features: {
        emotion: {},
        keywords: {},
      },
    }
    

    return analyze(analyzeParams,res);
});

app.get("/text/sentiment", (req,res) => {
         
    const analyzeParams = {
      text: req.query.text,
      features: {
        sentiment: {},
        keywords: {},
      },
    }
    

    return analyze(analyzeParams,res);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

