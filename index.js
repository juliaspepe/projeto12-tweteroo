import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json())


let usuarios = [
    {
        username: "bobesponja",
        avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
    }
];

let tweets = [
    {
        username: "bobesponja",
        tweet: "eu amo o hub"
    }
];

app.post("/sign-up", (req, res) => {
    let { username, avatar } = req.body;
    if (!username || !avatar) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }
    usuarios.push({ username, avatar });
    return res.status(201).send("OK");
});


app.post("/tweets", (req, res) => {
    let { username } = req.body;
    let { tweet } = req.body;
    if (!username || !tweet) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }
    const tweetobject = { tweet, username };
    tweets.push(tweetobject);
    return res.status(201).send("OK");
});

app.get('/tweets', (req, res) => {
    let mensagem = tweets.map(t => {
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].username === t.username) {
                return { ...t, avatar: usuarios[i].avatar }
            }
        }
    })
    let MensagemDoUsuario = mensagem.slice(-10);
    return res.send(MensagemDoUsuario);
});

app.listen(5000, () => {
    console.log('server running in port: 5000')
});
