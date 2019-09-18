import * as express from 'express';
import { database } from '../server';
import { Epidemia } from '../models/web/Epidemia';
import { Medico } from '../models/web/Medico';
import { Coord } from '../models/web/Coord';
import { TipoEpidemia } from '../models/web/TipoEpidemia';

export const webRoutes = express.Router();

webRoutes.get('/epidemias', (req, res, next) => {
    let ponto_doencas: Array<{
        idDoenca: number,
        quantidade: number
    }> = []

    const radius = 0.5;

    const myLat: number = Number(req.params.lat);
    const myLng: number = Number(req.params.lng);
    database.query(`select p.idDoenca,d.numeroEpidemia, count(*) as num from hackatona.ponto_doenca p, hackatona.Doenca d where (p.idDoenca = d.idDoenca) group by idDoenca;`,
    (error, results, fields ) => {
        console.log(results);
        const idResults = results.filter((r: any) => r.num >= r.numeroEpidemia);
        console.log(idResults);

        let listaCoords: any[] = []
        idResults.forEach((r: any, index: number) => {
            database.query(`select lat,lng from hackatona.ponto_doenca where idDoenca = ${r.idDoenca}`, (error, results2, fields ) => {
                listaCoords.push({
                    id: r.idDoenca,
                    lat: results2[0].lat,
                    lng: results2[0].lng
                });

                if(index == idResults.length-1) {
                    console.log(listaCoords);
                    res.json(listaCoords);
                }
            });
        });
        if(idResults.length === 0) {
            res.status(400).json([]);
        }
    });
});

webRoutes.post('/registra-medico', (req, res) => {
    const medico: Medico = req.body.medico;
    const query = `insert into Medico (nome, cremers, senha) values('${medico.nome}',${medico.cremers},'${medico.senha}')`;
    database.query(query, (error, results, fields ) => {
        console.log(results);
        console.log(error);
        console.log(fields);
        if(error !== null) {
            return res.status(500).json({});
        }
        return res.status(200).json({});
    });
});

webRoutes.post('/inclui', (req, res) => {
    const cremers: number = parseInt(req.body.cremers);
    const id_org: number = parseInt(req.body.id_org);
    const numeroEpidemia: number = req.body.numeroEpidemia;
    const senha: string = req.body.senha;
    const idDoenca = req.body.idDoenca;

    const coord: Coord  = {
        lat: req.body.lat,
        lng: req.body.lng 
     };

    if(!cremers && !id_org) {
        return res.status(400).json({msg: "makakio o fio"});
    } else if(cremers && !id_org) {
        return database.query(`select nome,senha from Medico where cremers = ${cremers} and senha = '${senha}'`, (error, results, fields ) => {
            
            if(results.length === 0) {
                return res.status(400).json({msg: 'cremers ou senha invalidos'});
            }
            
            if(coord.lat && coord.lng && idDoenca) {
                database.query('insert into ponto_doenca (idDoenca, lat, lng) values (' + idDoenca + ',' + coord.lat + ',' + coord.lng + ')', () => {
                    res.status(200).json({});
                });
            }


        });
    } else if(!cremers && id_org) {
        return database.query(`select id_org,senha from Organizacao where id_org = ${id_org} and senha = '${senha}'`, (error, results, fields ) => {
            if(results.length === 0) {
                return res.status(400).json({msg: 'id_org ou senha invalidos'});
            }

            if(idDoenca && numeroEpidemia) {
                return database.query('update hackatona.Doenca set numeroEpidemia = '+ numeroEpidemia+ ' where idDoenca = ' + idDoenca, () => {
                    res.status(200).json({});
                });
            }
        });
    }    
});


webRoutes.get('/doencas-coord/:lat/:lng', (req, res, next) => {

    let ponto_doencas: Array<{
        idDoenca: number,
        quantidade: number
    }> = []

    const radius = 0.5;

    const myLat: number = Number(req.params.lat);
    const myLng: number = Number(req.params.lng);
    database.query(`select idDoenca from ponto_doenca where (lat <= ${myLat + radius} and lat >= ${myLat - radius} and lng <= ${myLng + radius} and lng >= ${myLng - radius})`,
    (error, results, fields ) => {
        const idResults = results
        .map((r: any) => r.idDoenca)
        .sort((a:number,b :number) => a - b);

        if(idResults.length > 0) {
            let lastId = idResults[0] 
            let lastIdIndex = 0
            ponto_doencas.push({
                idDoenca: lastId,
                quantidade: 0
            })
            for(let i = 0; i < idResults.length; i++) {
                if(idResults[i] === lastId) {
                    ponto_doencas[lastIdIndex].quantidade = ponto_doencas[lastIdIndex].quantidade + 1;
                } else {
                    lastId = idResults[i];
                    lastIdIndex = lastIdIndex + 1;
                    ponto_doencas.push({
                        idDoenca: lastId,
                        quantidade: 0
                    });
                    i = i-1;
                }
            }
            let query: string = `select d.nome, d.numeroEpidemia from Doenca d where (`;
            ponto_doencas.forEach((d: any) => {
               query = query.concat(`idDoenca = ${d.idDoenca} OR `)
            })
            query = query.substring(0,query.length -4);
            query = query.concat(')');
            database.query(query, (error, results2, fields ) => {
                console.log(results2);
                const response = [];
                for(let i = 0; i < ponto_doencas.length; i++) {
                    response.push({
                        nome: results2[i].nome,
                        isEpidemia: (ponto_doencas[i].quantidade > results2[i].numeroEpidemia),
                        quantidade: ponto_doencas[i].quantidade
                    });
                }
                return res.status(200).json(response);
            });
        } else {
            return res.status(400).json([]);
        }
    });
});

webRoutes.get('/doencas', (req, res, next) => {
    //const doenca = req.query.doenca;
    //console.log('doenca: ' + doenca);
    const a = database.query('select idDoenca,nome from Doenca', (error, results, fields ) => {
        // const lista =results.filter((n: any) => {
        //     const nome: string = n.nome;
        //     return nome.toLowerCase().search(doenca.toLowerCase()) != -1;
        // });
        // if(lista.length === 0) {
        //     return res.status(400).json({msg: "erro mano, seila"});
        // }
        return res.json(results);
    });
    return;
});

