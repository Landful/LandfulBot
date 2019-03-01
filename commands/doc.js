var docs = require('./docs.json')
function a(message,args){
let doc = docs.classes.find(a => a.name.toLowerCase() == args[0].toLowerCase())
if (args.join(' ').split('.').length>1){
  let retorno = (()=>{ 
    let a =  docs.classes.find(a => a.name.toLowerCase() == args.join(' ').split('.')[0].toLowerCase())
    let b = args.join(' ').split('.')[1].toLowerCase()
    if (!a | !b) return null;
    if (a.props){
        if (a.props.find(c => c.name.toLowerCase() == b)) return a.props.find(c => c.name.toLowerCase() == b)
    }
    if (a.methods){
        if (a.methods.find(c => c.name.toLowerCase() == b)) return a.methods.find(c => c.name.toLowerCase() == b)
    }
    if (a.events){
        if (a.events.find(c => c.name.toLowerCase() == b)) return a.events.find(c => c.name.toLowerCase() == b)
    }
})()
if (retorno){
    let obj ={
        embed:{
            title:retorno.name,
            description: retorno.description,
            color:65535,
            thumbnail:{
                url:'https://discord.js.org/static/logo-square.png'
            },
            fields:[]
        }
    }
    if (retorno.params){
        retorno.params.forEach(function(c,d){
            obj.embed.fields.push({
                name: `Parametro ${c.name}:`,
                value:`${c.description}\nType: **${c.type.join(' | ')}**\nRequired: **${c.optional ? "No" : "Yes"}** `,
                inline:true
            })
        })
    }
      if (retorno.examples){
          retorno.examples.forEach(function(c,d){
              obj.embed.fields.push({
                  name:`Exemplo ${d+1}:`,
                  value:"```js\n" +c +"```",
                  inline:false
              })
          })
      }
    message.reply(obj)
    return;
}
else return message.reply("Não achei nada")
}
let obj ={
    
        embed:{
            title:doc.name,
            description:doc.description,
            color:65535,
            thumbnail:{
                url:'https://discord.js.org/static/logo-square.png'
            },
            fields:[
                {
                    name:"Properties",
                    value:doc.props.map(a => `${a.name} `).slice(0,30).join('\n'),
                    inline:true
                },{
                    name:"Methods",
                    value:doc.methods.map(a => `${a.name} `).slice(0,30).join('\n'),
                    inline:true
                },
            ]
        }
    }

if (doc.events){
    obj.embed.fields.push({name:"Events",value:doc.events.map(a => `${a.name} `).slice(0,30).join('\n') })
}
message.reply(obj)
}
module.exports = a
