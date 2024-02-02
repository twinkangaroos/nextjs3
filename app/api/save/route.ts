// npm install mysql
// npm install @aws-sdk/client-secrets-manager
//const mysql = require('mysql')
import * as mysql from 'mysql';

import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

// ■Routing: Route Handlers | Next.js
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers

export const dynamic = 'force-dynamic' // defaults to auto
import { type NextRequest, NextResponse } from 'next/server'
// import { headers } from 'next/headers'

export async function GET(request: NextRequest) {
    console.log("Get Start..")
    try {
        // MySQL接続情報をSecretManagerから取得
        const secret_name = "devMySQLUserOsaka";
        const client = new SecretsManagerClient({
            region: "ap-northeast-3",
        })
        const secretRes = await client.send(
            new GetSecretValueCommand({
                SecretId: secret_name,
                VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
            })
        )
        const secret = secretRes.SecretString
        const secretJson = secret ? JSON.parse(secret) : {}
        const connection = mysql.createConnection({
            host: secretJson.host,
            user: secretJson.username,
            password: secretJson.password,
            database: 'post1'
        });
        const currentDate = new Date().toISOString()
        console.log("host", secretJson.host)
        console.log("Connect start... currentDate", currentDate)

        connection.connect((err) => {
            if (err) {
                console.log('接続エラー:(' + currentDate + ') ' + err.stack);
                const response = {
                    statusCode: 501,
                    body: {
                        "result": "1",
                        "errorCode": "200"
                    }
                }
                return Response.json(response)
            } else {
                // JSON形式でDBに格納
                const query = 'INSERT INTO ekyc2 (ekyc) values (?)'
                const result = connection.query(query, insertJson);
                console.log('データが挿入されました！');
            }
        })

        const response = {
            statusCode: 200,
            body: {
                "result": "0", 
                "errorCode": ""
            }
        }
        return Response.json(response)
    }
    catch(err){
        console.log("An error has occured!!", err)
        const response = {
            statusCode: 500,
            body: {
                "result": "1",
                "errorCode": "200"
            }
        }
        return Response.json(response)
    }
}

export async function POST(request: NextRequest) {
    console.log("Post Start..")
    // const token = request.cookies.get('token')
    // const headersList = headers()
    // const referer = headersList.get('referer')
    // const requestHeaders = new Headers(request.headers)

    // const searchParams = request.nextUrl.searchParams
    // const query = searchParams.get('query')
    // // query is "hello" for /api/search?query=hello

    // const res = await request.json()
    
    // const formData = await request.formData()
    // const email = formData.get('email')


    try {
        if (!request.body) {
            const response = {
                statusCode: 500,
                body: {
                    "result": "1",
                    "errorCode": "100"
                }
            }
            return Response.json(response)
        }

        // POSTされたJSONをそのままDBに格納する。
        const insertJson = request.body
        console.log("req.body=", request.body)

        // MySQL接続情報をSecretManagerから取得
        const secret_name = "devMySQLUserOsaka";
        const client = new SecretsManagerClient({
            region: "ap-northeast-3",
        })
        const secretRes = await client.send(
            new GetSecretValueCommand({
                SecretId: secret_name,
                VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
            })
        )
        const secret = secretRes.SecretString
        // {"username":"xxx","password":"xxx","engine":"mysql",
        // "host":"database-1.cluster-xxx.ap-northeast-1.rds.amazonaws.com",
        // "port":3306,"dbClusterIdentifier":"database-1"}
        const secretJson = secret ? JSON.parse(secret) : {}
        const connection = mysql.createConnection({
            //host: 'localhost', // DEBUG for Local
            host: secretJson.host,
            user: secretJson.username,
            password: secretJson.password,
            database: 'post1'
        });
        const currentDate = new Date().toISOString()
        console.log("host", secretJson.host)
        console.log("Connect start... currentDate", currentDate)

        connection.connect((err) => {
            if (err) {
                console.log('接続エラー:(' + currentDate + ') ' + err.stack);
                const response = {
                    statusCode: 501,
                    body: {
                        "result": "1",
                        "errorCode": "200"
                    }
                }
                return Response.json(response)
            } else {
                // JSON形式でDBに格納
                const query = 'INSERT INTO ekyc2 (ekyc) values (?)'
                const result = connection.query(query, insertJson);
                console.log('データが挿入されました！');
            }
        })

        const response = {
            statusCode: 200,
            body: {
                "result": "0", 
                "errorCode": ""
            }
        }
        return Response.json(response)
    }
    catch(err){
        console.log("An error has occured!!", err)
        const response = {
            statusCode: 500,
            body: {
                "result": "1",
                "errorCode": "200"
            }
        }
        return Response.json(response)
    }
}

// ■413 Body exceeded 1mb limit · Issue #53087 · vercel/next.js
// https://github.com/vercel/next.js/issues/53087
//export const config = {
//    api: {
//        bodyParser: {
//            sizeLimit: '20mb',
//        },
//    },
//}
