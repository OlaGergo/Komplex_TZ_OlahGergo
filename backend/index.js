const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")
 
const app = express()
app.use(express.json())
app.use(cors())
 
const db = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "felveteli"
})
 
db.connect((err) => {
    if(err){
        console.error("Hiba történt a MySQL szerverhez való kapcsolódáskor: ", err)
    }
    else{
        console.log("Sikeresen csatlakozott a MySQL szerverhez!")
    }
})
 
app.get("/diakok",(request,response) => {
    db.query("select nev, agazat, hozott+kpmagy+kpmat as osszpont from diakok " +
    "inner join jelentkezesek on oktazon = jelentkezesek.diak " +
    "inner join tagozatok on akod = jelentkezesek.tag " +
    "order by nev asc", (err,results) => {
        if(err) return response.status(500).json(err)
        response.json(results)
    })
 
})
 
app.listen(5000, () => {
    console.log("A szerver fut az 3000-es porton!")
})
 